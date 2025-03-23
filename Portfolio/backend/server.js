const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const flash = require('connect-flash');  // <-- Add this line
const cloudinary = require('cloudinary').v2;



dotenv.config()

// Create an instance of Express
const app = express();

// Update the CORS middleware configuration to handle multiple origins
app.use(cors({
  origin: (origin, callback) => {
    // Allow both ports in development
    if (process.env.NODE_ENV === 'production') {
      callback(null, true);  // Allow production frontend URL (from .env)
    } else {
      // Allow both development frontend URLs
      if (origin === 'http://localhost:5173' || origin === 'http://localhost:5174' || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true  // Ensure credentials (cookies, etc.) are allowed
}));
app.use(bodyParser.json()); // Parse JSON data

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', // Prevents cross-site request forgery (CSRF) attacks
  },
}));

app.use(flash()); 


//Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,  // Replace with your Cloudinary Cloud Name
  api_key: process.env.API_KEY,       // Replace with your API Key
  api_secret: process.env.API_SECRET, // Replace with your API Secret
});

const PORT = process.env.PORT || 8081; // or any other port not in use


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define the Schema and Model
const formSubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  created_at: { type: Date, default: Date.now }
});

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

// API Endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newSubmission = new FormSubmission({
      name,
      email,
      message,
    });

    await newSubmission.save();
    req.flash('success', 'Form submitted successfully!');
    res.status(200).json({ message: 'Form submission successful!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({
      message: 'Error saving form data',
      error: error.message, // Include the error message for better debugging
    });
  }
});


app.get('/images', async (req, res) => {
  try {
    // Fetch all image resources from Cloudinary (You can filter by folder or resource_type)
    const result = await cloudinary.api.resources({
      type: 'upload', // Fetch images uploaded by you
      prefix: 'portfolio_images', // Optional: Filter by folder name (if you use folders in Cloudinary)
      resource_type: 'image', // Only fetch images (not videos)
      max_results: 20, // Limit number of results returned (for pagination)
    });

    // Map through the response and extract image URLs
    const imageUrls = result.resources.map((resource) => resource.secure_url); // Get secure URL

    // Return the image URLs
    res.status(200).json(imageUrls);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Error fetching images from Cloudinary' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
