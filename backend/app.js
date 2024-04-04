// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

// Initialize express app
const app = express();

// Enable CORS and JSON parsing middleware with increased limit
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Set limit for JSON bodies
app.use(bodyParser.json({ limit: '10mb' })); // Adjusted for bodyParser as well
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Set limit for URL-encoded bodies

// Connect to MongoDB without deprecated options
const mongoDB_URI = process.env.MONGODB_URI;
mongoose.connect(mongoDB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// Import routes
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
