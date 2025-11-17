# Vehicle Showroom Backend API

A Node.js and Express.js backend API for the Vehicle Showroom application that handles test drive requests and car booking submissions.

## Features

- **Test Drive Management**: Handle test drive requests with date/time scheduling
- **Car Booking System**: Process car booking requests with customer details
- **MongoDB Integration**: Store data in MongoDB Atlas
- **Input Validation**: Comprehensive validation for all form inputs
- **Error Handling**: Robust error handling and user-friendly messages
- **Rate Limiting**: Protection against spam and abuse
- **CORS Support**: Cross-origin resource sharing for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Validator.js
- **Logging**: Morgan

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env` file and update with your MongoDB Atlas URI
   - Replace the placeholder connection string with your actual MongoDB Atlas credentials

4. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

## Environment Variables

Create a `.env` file in the backend directory:

```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/vehicleshowroom?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Test Drive Routes

- `POST /api/test-drive` - Submit test drive request
- `GET /api/test-drive` - Get all test drive requests (admin)
- `GET /api/test-drive/:id` - Get specific test drive request
- `PUT /api/test-drive/:id/status` - Update test drive status

### Booking Routes

- `POST /api/booking` - Submit car booking request
- `GET /api/booking` - Get all bookings (admin)
- `GET /api/booking/:id` - Get specific booking
- `GET /api/booking/search/:bookingId` - Search booking by booking ID
- `PUT /api/booking/:id/status` - Update booking status
- `GET /api/booking/stats/overview` - Get booking statistics

### Health Check

- `GET /api/health` - Server health check

## Request Examples

### Test Drive Submission
```json
POST /api/test-drive
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "preferredDate": "2024-12-01",
  "preferredTime": "10:00",
  "vehicleModel": "Tata Nexon",
  "message": "Looking forward to the test drive"
}
```

### Car Booking Submission
```json
POST /api/booking
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "address": "123 Main Street, Mumbai, Maharashtra",
  "model": "Tata Harrier",
  "color": "Orange",
  "variant": "top",
  "additionalRequirements": "Sunroof and premium sound system"
}
```

## Data Models

### Test Drive Schema
- Personal information (name, email, phone)
- Preferred date and time
- Vehicle model
- Optional message
- Status tracking

### Booking Schema
- Personal information (name, email, phone, address)
- Vehicle details (model, color, variant)
- Additional requirements
- Booking ID generation
- Status tracking
- Sales team notes

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation for all inputs
- **Data Sanitization**: Clean and validate all user inputs
- **Error Handling**: Secure error messages without sensitive data exposure
- **CORS Protection**: Configured for specific frontend origins

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Update `MONGODB_URI` with production database
3. Configure `FRONTEND_URL` for production frontend
4. Use process manager like PM2 for production deployment

## API Response Format

All API responses follow a consistent format:

```json
{
  "status": "success|error",
  "message": "Human readable message",
  "data": {}, // Response data (success only)
  "errors": [] // Validation errors (error only)
}
```

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Update documentation for new endpoints
5. Test all endpoints before committing
