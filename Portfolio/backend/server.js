const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const bodyParser = require('body-parser');
const flash = require('connect-flash');  // <-- Add this line


// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  }));
  app.use(flash()); 


// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0/form-portfolio',)
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
    res.status(500).json({ message: 'Error saving form data' });
  }
});

// Start server
app.listen(8080, () => {
  console.log('Server running on port 8080');
});
