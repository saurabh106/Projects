const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// AI routes
app.use('/ai', aiRoutes);

// Error handling middleware (catching errors)
app.use((err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err.stack);

    // Send a generic error response
    res.status(500).json({
        message: 'Something went wrong! Please try again later.',
        error: err.message || 'Internal Server Error'
    });
});

module.exports = app;
