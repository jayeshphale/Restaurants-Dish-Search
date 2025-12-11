# Restaurant Dish Search - Backend API

A simple Node.js + Express + MySQL backend service that allows users to search for restaurants based on dish name with mandatory price range filtering.

## Features

- 🔍 Search restaurants by dish name
- 💰 Filter results by price range (minPrice and maxPrice)
- ⭐ Returns top 10 restaurants where the dish has been ordered the most
- 📊 Includes order counts, dish prices, and restaurant details
- 🗄️ MySQL database with proper schema
- 🌱 Seed data included for easy testing

## Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL2/Promise** - MySQL driver with promise support
- **dotenv** - Environment variable management

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn

## Project Structure

```
.
├── server.js           # Main server file
├── db.js              # Database connection pool
├── dbSetup.js         # Database initialization
├── routes/
│   └── search.js      # Search API endpoint
├── scripts/
│   ├── setup.js       # Database setup script
│   └── seed.js        # Seed data script
├── package.json       # Dependencies
├── .env               # Environment variables
└── README.md          # This file
```

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Edit the `.env` file with your MySQL credentials:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=restaurant_db
NODE_ENV=development
```

### 3. Initialize Database

Run the setup script to create tables:

```bash
node scripts/setup.js
```

### 4. Seed Sample Data

Run the seed script to populate the database with sample restaurants and orders:

```bash
npm run seed
```

Or manually:

```bash
node scripts/seed.js
```

### 5. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Health Check

```
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Restaurant Dish Search API is running"
}
```

### Search Restaurants by Dish

```
GET /search/dishes?name=<dishName>&minPrice=<minPrice>&maxPrice=<maxPrice>
```

**Query Parameters:**
- `name` (required) - Dish name to search for
- `minPrice` (required) - Minimum price filter
- `maxPrice` (required) - Maximum price filter

**Example Request:**

```bash
curl "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300"
```

**Example Response:**

```json
{
  "restaurants": [
    {
      "restaurantId": 5,
      "restaurantName": "Hyderabadi Spice House",
      "city": "Hyderabad",
      "dishName": "Chicken Biryani",
      "dishPrice": 220,
      "orderCount": 96
    },
    {
      "restaurantId": 1,
      "restaurantName": "Kolkata Biryani Palace",
      "city": "Kolkata",
      "dishName": "Chicken Biryani",
      "dishPrice": 195,
      "orderCount": 89
    },
    {
      "restaurantId": 8,
      "restaurantName": "Jaipur Royal Cuisine",
      "city": "Jaipur",
      "dishName": "Chicken Biryani",
      "dishPrice": 240,
      "orderCount": 88
    }
  ]
}
```

**Error Response (Missing Parameters):**

```json
{
  "error": "Dish name (name) is required"
}
```

```json
{
  "error": "Both minPrice and maxPrice are required"
}
```

## Database Schema

### restaurants table
```sql
CREATE TABLE restaurants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### menu_items table
```sql
CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);
```

### orders table
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  menu_item_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  order_count INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);
```

## Sample Data

The seed script includes:
- **8 Restaurants** across different Indian cities
- **30+ Menu Items** featuring various Biryani dishes at different price points
- **30+ Order Records** showing order counts for popularity ranking

All sample dishes are "Biryani" variants at prices ranging from ₹140 to ₹350, making them easy to test with the example query.

## Testing the API

### Test 1: Search for Biryani (150-300 price range)
```bash
curl "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300"
```

### Test 2: Search for Chicken (200-250 price range)
```bash
curl "http://localhost:3000/search/dishes?name=chicken&minPrice=200&maxPrice=250"
```

### Test 3: Search for Vegetable (100-200 price range)
```bash
curl "http://localhost:3000/search/dishes?name=vegetable&minPrice=100&maxPrice=200"
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Invalid parameters or missing required fields
- **404 Not Found** - Invalid endpoint
- **500 Internal Server Error** - Server-side errors with detailed messages

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000                          # Port to run the server on
DB_HOST=localhost                  # MySQL host
DB_PORT=3306                       # MySQL port
DB_USER=root                       # MySQL username
DB_PASSWORD=your_password          # MySQL password
DB_NAME=restaurant_db              # Database name
NODE_ENV=development               # Environment (development/production)
```

## Deployment

This project can be deployed to free platforms like:

- **Railway.app** - Node.js + MySQL deployment
- **Render.com** - Node.js hosting
- **Heroku** - (Paid now, but alternative platforms available)
- **PlanetScale** - MySQL database hosting
- **AWS Free Tier** - EC2 + RDS

### Example: Deploying to Railway

1. Push code to GitHub
2. Connect Railway to GitHub repo
3. Add MySQL service
4. Configure environment variables in Railway dashboard
5. Deploy

## Troubleshooting

### MySQL Connection Error
- Ensure MySQL server is running
- Verify credentials in `.env` file
- Check if database name matches

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill process: `lsof -i :3000` then `kill -9 <PID>`

### Seed Data Issues
- Make sure database is created and tables exist
- Run `node scripts/setup.js` before seeding

## Future Enhancements

- Add authentication and authorization
- Implement pagination for results
- Add more filter options (ratings, cuisine type, etc.)
- Add caching for frequently searched dishes
- Implement full-text search for better search quality
- Add API rate limiting
- Add comprehensive logging
- Create admin endpoints for managing restaurants/items

## License

ISC

## Author

Created as a backend service for restaurant dish search functionality.

---

**For any issues or questions, please check the API endpoint examples or database schema documentation.**
