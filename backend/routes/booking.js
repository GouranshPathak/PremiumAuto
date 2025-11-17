const express = require('express');
const Booking = require('../models/Booking');
const {
  sendEmail,
  generateBookingEmailTemplate
} = require('../services/emailService');
const router = express.Router();

// @route   POST /api/booking
// @desc    Submit a car booking request
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      address, 
      model, 
      color, 
      variant, 
      additionalRequirements 
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !address || !model || !color) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields: name, email, phone, address, model, color'
      });
    }

    // Check for duplicate bookings (same email and model)
    const existingBooking = await Booking.findOne({
      email: email.toLowerCase(),
      model: model.trim(),
      status: { $in: ['pending', 'confirmed', 'processing'] }
    });

    if (existingBooking) {
      return res.status(409).json({
        status: 'error',
        message: `You already have an active booking for ${model}. Please contact us to modify your existing booking or choose a different model.`,
        existingBookingId: existingBooking.bookingId
      });
    }

    // Create new booking
    const booking = new Booking({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      address: address.trim(),
      model: model.trim(),
      color: color.trim(),
      variant: variant ? variant.trim() : '',
      additionalRequirements: additionalRequirements ? additionalRequirements.trim() : '',
      ipAddress: req.ip || req.connection.remoteAddress
    });

    const savedBooking = await booking.save();

    // Send booking confirmation email (non-blocking)
    sendEmail({
      to: savedBooking.email,
      subject: `Booking Confirmation - ${savedBooking.model}`,
      html: generateBookingEmailTemplate({
        name: savedBooking.name,
        bookingId: savedBooking.bookingId,
        model: savedBooking.model,
        color: savedBooking.color,
        variant: savedBooking.variant
      }),
      text: `Hi ${savedBooking.name},\n\nThank you for booking the ${savedBooking.model} (${savedBooking.color}). Your booking ID is ${savedBooking.bookingId}. Our sales representative will contact you soon to discuss the next steps.\n\nVehicle Showroom Team`
    }).catch((error) => console.error('Booking email failed:', error));

    res.status(201).json({
      status: 'success',
      message: 'Booking request submitted successfully! We will contact you within 24 hours to discuss further details.',
      data: {
        bookingId: savedBooking.bookingId,
        name: savedBooking.name,
        email: savedBooking.email,
        model: savedBooking.model,
        color: savedBooking.color,
        variant: savedBooking.variant,
        status: savedBooking.status,
        submittedAt: savedBooking.formattedSubmissionDate
      }
    });

  } catch (error) {
    console.error('Booking submission error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({
        status: 'error',
        message: 'A booking with this information already exists'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.'
    });
  }
});

// @route   GET /api/booking
// @desc    Get all bookings (for admin)
// @access  Public (should be protected in production)
router.get('/', async (req, res) => {
  try {
    const { status, model, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }
    if (model) {
      query.model = { $regex: model, $options: 'i' };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const bookings = await Booking.find(query)
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .select('-ipAddress -salesNotes'); // Exclude sensitive data

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        bookings,
        pagination: {
          currentPage: options.page,
          totalPages: Math.ceil(total / options.limit),
          totalItems: total,
          itemsPerPage: options.limit
        }
      }
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/booking/:id
// @desc    Get a specific booking
// @access  Public (should be protected in production)
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).select('-ipAddress');
    
    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: booking
    });

  } catch (error) {
    console.error('Get booking error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid booking ID'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/booking/search/:bookingId
// @desc    Get booking by booking ID
// @access  Public
router.get('/search/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      bookingId: req.params.bookingId.toUpperCase() 
    }).select('-ipAddress -salesNotes');
    
    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found with this booking ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: booking
    });

  } catch (error) {
    console.error('Search booking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/booking/:id/status
// @desc    Update booking status
// @access  Public (should be protected in production)
router.put('/:id/status', async (req, res) => {
  try {
    const { status, salesNotes, assignedTo } = req.body;
    
    if (!status || !['pending', 'confirmed', 'processing', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status. Must be one of: pending, confirmed, processing, delivered, cancelled'
      });
    }

    const updateData = { status };
    if (salesNotes) updateData.salesNotes = salesNotes;
    if (assignedTo) updateData.assignedTo = assignedTo;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-ipAddress');

    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Booking updated successfully',
      data: booking
    });

  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/booking/stats/overview
// @desc    Get booking statistics
// @access  Public (should be protected in production)
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Booking.getStats();
    
    const totalBookings = await Booking.countDocuments();
    const recentBookings = await Booking.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    const popularModels = await Booking.aggregate([
      {
        $group: {
          _id: '$model',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        statusStats: stats,
        totalBookings,
        recentBookings,
        popularModels
      }
    });

  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;
