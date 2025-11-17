const mongoose = require('mongoose');
const validator = require('validator');

const testDriveSchema = new mongoose.Schema({
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
        return /^[\+]?\d{7,16}$/.test(v);
      },
      message: 'Please provide a valid phone number (digits only)'
    }
  },
  
  // Test Drive Details
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required'],
    validate: {
      validator: function(v) {
        return v > new Date();
      },
      message: 'Preferred date must be in the future'
    }
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required'],
    enum: {
      values: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
      message: 'Please select a valid time slot'
    }
  },
  vehicleModel: {
    type: String,
    required: [true, 'Vehicle model is required'],
    trim: true
  },
  
  // Additional Information
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  
  // Status and Metadata
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
testDriveSchema.index({ email: 1 });
testDriveSchema.index({ phone: 1 });
testDriveSchema.index({ preferredDate: 1 });
testDriveSchema.index({ status: 1 });
testDriveSchema.index({ createdAt: -1 });

// Virtual for formatted date
testDriveSchema.virtual('formattedDate').get(function() {
  return this.preferredDate.toLocaleDateString('en-IN');
});

// Pre-save middleware
testDriveSchema.pre('save', function(next) {
  // Convert phone to standard format
  if (this.phone) {
    this.phone = this.phone.replace(/\D/g, ''); // Remove non-digits
  }
  next();
});

module.exports = mongoose.model('TestDrive', testDriveSchema);
