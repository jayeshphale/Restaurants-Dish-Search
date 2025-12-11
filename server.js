const express = require('express');
const cors = require('cors');
const searchRoutes = require('./routes/search');
require('dotenv').config();

const app = express();

// Railway-compatible PORT
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Restaurant Dish Search API is running',
    healthCheck: '/health',
    searchSample: '/search/dishes?name=biryani&minPrice=150&maxPrice=300'
  });
});

// Routes
app.use('/search', searchRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Restaurant Dish Search API is running'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Restaurant Dish Search API running on PORT: ${PORT}`);
  console.log(`Health check: /health`);
  console.log(`Search endpoint: /search/dishes?name=biryani&minPrice=150&maxPrice=300`);
});

module.exports = app;
