const express = require('express');
const TestDrive = require('../models/TestDrive');
const {
  sendEmail,
  generateTestDriveEmailTemplate
} = require('../services/emailService');
const router = express.Router();

// @route   POST /api/test-drive
// @desc    Submit a test drive request
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, preferredDate, preferredTime, vehicleModel, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !preferredDate || !preferredTime || !vehicleModel) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields: name, email, phone, preferredDate, preferredTime, vehicleModel'
      });
    }

    // Check if the preferred date is in the future
    const selectedDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        status: 'error',
        message: 'Preferred date must be today or in the future'
      });
    }

    // Check for duplicate requests (same email and date)
    const existingRequest = await TestDrive.findOne({
      email: email.toLowerCase(),
      preferredDate: selectedDate,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingRequest) {
      return res.status(409).json({
        status: 'error',
        message: 'You already have a test drive request for this date. Please choose a different date or contact us to modify your existing request.'
      });
    }

    // Create new test drive request
    const testDriveRequest = new TestDrive({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      preferredDate: selectedDate,
      preferredTime,
      vehicleModel: vehicleModel.trim(),
      message: message ? message.trim() : '',
      ipAddress: req.ip || req.connection.remoteAddress
    });

    const savedRequest = await testDriveRequest.save();

    // Send confirmation email (non-blocking)
    sendEmail({
      to: savedRequest.email,
      subject: `Test Drive Confirmation - ${savedRequest.vehicleModel}`,
      html: generateTestDriveEmailTemplate({
        name: savedRequest.name,
        vehicleModel: savedRequest.vehicleModel,
        preferredDate: savedRequest.formattedDate,
        preferredTime: savedRequest.preferredTime
      }),
      text: `Hi ${savedRequest.name},\n\nThank you for scheduling a test drive for ${savedRequest.vehicleModel} on ${savedRequest.formattedDate} at ${savedRequest.preferredTime}. Our team will reach out to you shortly to confirm the appointment.\n\nVehicle Showroom Team`
    }).catch((error) => console.error('Test drive email failed:', error));

    res.status(201).json({
      status: 'success',
      message: 'Test drive request submitted successfully! We will contact you within 24 hours to confirm your appointment.',
      data: {
        id: savedRequest._id,
        name: savedRequest.name,
        email: savedRequest.email,
        preferredDate: savedRequest.formattedDate,
        preferredTime: savedRequest.preferredTime,
        vehicleModel: savedRequest.vehicleModel,
        status: savedRequest.status
      }
    });

  } catch (error) {
    console.error('Test drive submission error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.'
    });
  }
});

// @route   GET /api/test-drive
// @desc    Get all test drive requests (for admin)
// @access  Public (should be protected in production)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const testDrives = await TestDrive.find(query)
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .select('-ipAddress'); // Exclude sensitive data

    const total = await TestDrive.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        testDrives,
        pagination: {
          currentPage: options.page,
          totalPages: Math.ceil(total / options.limit),
          totalItems: total,
          itemsPerPage: options.limit
        }
      }
    });

  } catch (error) {
    console.error('Get test drives error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/test-drive/:id
// @desc    Get a specific test drive request
// @access  Public (should be protected in production)
router.get('/:id', async (req, res) => {
  try {
    const testDrive = await TestDrive.findById(req.params.id).select('-ipAddress');
    
    if (!testDrive) {
      return res.status(404).json({
        status: 'error',
        message: 'Test drive request not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: testDrive
    });

  } catch (error) {
    console.error('Get test drive error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid test drive ID'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/test-drive/:id/status
// @desc    Update test drive request status
// @access  Public (should be protected in production)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status. Must be one of: pending, confirmed, completed, cancelled'
      });
    }

    const testDrive = await TestDrive.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select('-ipAddress');

    if (!testDrive) {
      return res.status(404).json({
        status: 'error',
        message: 'Test drive request not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Test drive status updated successfully',
      data: testDrive
    });

  } catch (error) {
    console.error('Update test drive status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

module.exports = router;
