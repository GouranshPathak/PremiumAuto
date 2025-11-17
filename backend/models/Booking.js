const mongoose = require('mongoose');
const validator = require('validator');

const bookingSchema = new mongoose.Schema({
  // Personal Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(v);
      },
      message: 'Please provide a valid phone number'
    }
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  
  // Vehicle Details
  model: {
    type: String,
    required: [true, 'Vehicle model is required'],
    trim: true
  },
  color: {
    type: String,
    required: [true, 'Vehicle color is required'],
    trim: true
  },
  variant: {
    type: String,
    trim: true,
    enum: {
      values: ['base', 'mid', 'top', 'custom', ''],
      message: 'Please select a valid variant'
    }
  },
  
  // Additional Requirements
  additionalRequirements: {
    type: String,
    trim: true,
    maxlength: [1000, 'Additional requirements cannot exceed 1000 characters']
  },
  
  // Booking Status and Metadata
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'delivered', 'cancelled'],
    default: 'pending'
  },
  bookingId: {
    type: String,
    unique: true,
    sparse: true
  },
  estimatedPrice: {
    type: Number,
    min: [0, 'Price cannot be negative']
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    trim: true
  },
  
  // Sales Team Notes
  salesNotes: {
    type: String,
    trim: true,
    maxlength: [2000, 'Sales notes cannot exceed 2000 characters']
  },
  assignedTo: {
    type: String,
    trim: true
  },
  followUpDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ email: 1 });
bookingSchema.index({ phone: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ model: 1 });
bookingSchema.index({ createdAt: -1 });

// Generate booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingId && this.isNew) {
    // Generate booking ID: BK + timestamp + random 4 digits
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    this.bookingId = `BK${timestamp}${random}`;
  }
  
  // Clean phone number
  if (this.phone) {
    this.phone = this.phone.replace(/\D/g, ''); // Remove non-digits
  }
  
  next();
});

// Virtual for formatted submission date
bookingSchema.virtual('formattedSubmissionDate').get(function() {
  return this.submittedAt.toLocaleDateString('en-IN');
});

// Static method to get booking statistics
bookingSchema.statics.getStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

module.exports = mongoose.model('Booking', bookingSchema);
