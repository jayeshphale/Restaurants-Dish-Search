const express = require("express");
const cors = require("cors");
const searchRoutes = require("./routes/search");
require("dotenv").config();

const app = express();

// Use correct Railway port
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Root route (shows API info)
app.get("/", (req, res) => {
  res.json({
    message: "Restaurant Dish Search API is running",
    healthCheck: "/health",
    searchSample: "/search/dishes?name=biryani&minPrice=150&maxPrice=300",
  });
});

// Mount search routes
app.use("/search", searchRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", message: "The requested resource does not exist" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
  console.log(`Routes: /health, /search/dishes`);
});

module.exports = app;
