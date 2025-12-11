# Restaurant Dish Search - Full Stack Application

A complete full-stack application for searching restaurants by dish name with price filtering. Features a modern web frontend and robust Node.js + Express + MySQL backend.

## 🎯 Features

**Backend API:**
- 🔍 Search restaurants by dish name (case-insensitive, partial matching)
- 💰 Filter results by price range (minPrice and maxPrice)
- ⭐ Returns top 10 restaurants sorted by popularity
- 📊 Includes order counts, dish prices, and restaurant details
- 🗄️ MySQL database with proper schema and relationships
- 🌱 Seed data included (8 restaurants, 28 dishes)

**Frontend Web UI:**
- 🎨 Beautiful, modern gradient design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Real-time search with loading states
- 🎯 Instant feedback and error handling
- 🌐 CORS-enabled for seamless API communication

## 🛠️ Technology Stack

**Backend:**
- Node.js v14+
- Express.js 4.18.2
- MySQL 5.7+
- mysql2/promise 3.6.5
- cors 2.8.5
- dotenv 16.3.1

**Frontend:**
- HTML5 + CSS3 + Vanilla JavaScript
- No dependencies needed!
- Responsive Grid Layout
- Fetch API for backend communication

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn
- Web browser (Chrome, Firefox, Safari, Edge)

## 📁 Project Structure

```
Restaurants Dish Search/
├── Backend Files
│   ├── server.js           # Main Express server (Port 3000)
│   ├── db.js              # Database connection pool
│   ├── dbSetup.js         # Database initialization
│   ├── routes/
│   │   └── search.js      # Search API endpoint
│   ├── scripts/
│   │   ├── setup.js       # Database setup script
│   │   └── seed.js        # Seed data script
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
│
├── Frontend Files
│   ├── frontend.html      # Main UI (all-in-one HTML file)
│   ├── frontend-server.js # Simple HTTP server (Port 8080)
│   └── frontend/          # React project (optional)
│
└── Documentation
    ├── README.md          # This file
    ├── FULLSTACK_SETUP.md # Complete setup guide
    ├── API_DOCS.md        # API documentation
    └── [other docs]
```

## 🚀 Quick Start (All-in-One)

### Step 1: Install Backend Dependencies

```bash
npm install
```

### Step 2: Setup Database

```bash
node setup-db.js
npm run seed
```

### Step 3: Start Backend Server

```bash
# Terminal 1
npm start
```

Expected output:
```
🚀 Restaurant Dish Search API running on http://localhost:3000
Health check: http://localhost:3000/health
Search endpoint: http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

### Step 4: Open Frontend in Browser

**Option A: Open HTML file directly**
```bash
# Simply open frontend.html in your browser
# File → Open File → frontend.html
```

**Option B: Use Frontend Server (Terminal 2)**
```bash
node frontend-server.js
# Then open http://localhost:8080
```

That's it! The frontend will communicate with the backend on port 3000.

## 📖 Installation & Setup (Detailed)

### 1. Clone or Download Project

```bash
cd "c:\Users\Jayesh Phale\Downloads\Restaurants Dish Search"
```

### 2. Install Backend Dependencies

```bash
npm install
```

This installs:
- express (web framework)
- mysql2 (database driver)
- cors (cross-origin requests)
- dotenv (environment variables)
- nodemon (development auto-reload)

### 3. Configure Database

Create `.env` file (already included):
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=restaurant_db
```

### 4. Initialize Database

```bash
# Create tables and database
node setup-db.js

# Seed with sample data (8 restaurants, 28 dishes)
npm run seed
```

### 5. Start Backend

```bash
npm start
```

### 6. Access Frontend

**Option A: Direct HTML (Easiest)**
- Right-click `frontend.html` → Open with Browser
- Or drag `frontend.html` into browser

**Option B: Via Server**
```bash
# Terminal 2
node frontend-server.js
# Visit http://localhost:8080
```

## 🌐 API Endpoints

All endpoints on backend (default: http://localhost:3000)

### Search Dishes
```
GET /search/dishes?name=biryani&minPrice=150&maxPrice=300

Parameters (all required):
  - name (string): Dish name to search
  - minPrice (number): Minimum price in ₹
  - maxPrice (number): Maximum price in ₹

Response (JSON array of up to 10 results):
[
  {
    "restaurant_id": 1,
    "restaurant_name": "Hyderabadi Spice House",
    "city": "Hyderabad",
    "dish_name": "Chicken Biryani",
    "price": 195,
    "order_count": 85
  },
  ...
]
```

### Health Check
```
GET /health

Response:
{
  "status": "OK",
  "message": "Restaurant Dish Search API is running"
}
```

## 🧪 Testing

### Frontend Testing (Browser)

1. Search for "biryani" with prices 150-300
2. Expected: 10+ results sorted by order count
3. Try different searches: "chicken", "paneer", "mutton"

### API Testing (Direct)

```bash
# Browser
http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300

# PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300" -UseBasicParsing | Select-Object -ExpandProperty Content

# Node.js
node test-api.js

# Python
python test-api.py
```

## 📊 Sample Data Included

**Restaurants (8):**
- Hyderabadi Spice House, Mumbai Masala Kitchen, Delhi Delights
- Kolkata Biryani Palace, Chennai Flavors, Bangalore Spice Corner
- Lucknow Kebab House, Jaipur Royal Cuisine

**Dishes (28):**
- Chicken, Vegetable, Mutton, Fish, Egg, Paneer, Prawn Biryani variants
- Prices: ₹140 - ₹295
- Order counts: 38 - 96 (realistic popularity data)

## 🛠️ Troubleshooting

### Backend Issues

**"Port 3000 already in use"**
```powershell
# Find and kill process
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
Stop-Process -Id <PID> -Force
```

**"Cannot connect to database"**
```bash
# Check MySQL is running
# Verify .env credentials
# Reseed database
npm run seed
```

**"CORS error in browser"**
- Backend has CORS enabled (check server.js)
- Frontend is on different port (expected)
- Restart backend server

### Frontend Issues

**"Failed to fetch from backend"**
- Verify backend is running on http://localhost:3000
- Check browser console (F12) for errors
- Ensure database is seeded

**"No results showing"**
- Try simpler search: "biryani"
- Adjust price range (try 100-500)
- Check backend logs for errors

**"White blank page"**
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Open browser developer console (F12)

## 📱 Responsive Design

The frontend works perfectly on:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

Try opening on your phone!

## 🚢 Deployment

### Deploy Backend

**Option 1: Railway.app (Recommended)**
```bash
npm install -g railway
railway login
railway link
railway up
```

**Option 2: Heroku**
```bash
heroku create your-app-name
git push heroku main
```

**Option 3: AWS/DigitalOcean**
- Set up server, install Node.js
- Clone repo and run: npm install && npm start

### Deploy Frontend

**Option 1: Vercel (Easiest)**
```bash
npm install -g vercel
vercel
```

**Option 2: Netlify**
- Drag and drop `frontend.html` to netlify.com

**Option 3: GitHub Pages**
- Push to GitHub, enable Pages

## 📚 Additional Documentation

- `FULLSTACK_SETUP.md` - Complete setup guide with architecture
- `API_DOCS.md` - Detailed API documentation
- `CONFIG.md` - Configuration and environment variables
- `IMPLEMENTATION_NOTES.md` - Design decisions and technical details
- `TESTING.md` - Testing approaches and examples

## 🎓 Interview Preparation

This is a complete, production-ready full-stack application perfect for demonstrating:

**Backend Skills:**
- RESTful API design
- Database design and optimization
- Query optimization with JOINs and aggregation
- Connection pooling and resource management
- Error handling and validation
- CORS and security considerations

**Frontend Skills:**
- Responsive design
- CSS Grid and Flexbox
- JavaScript async/await and Fetch API
- State management
- User experience and loading states

**Full-Stack Skills:**
- Frontend-backend integration
- API communication
- Data flow and component architecture
- Testing and debugging
- Deployment and DevOps basics

## 📝 License

MIT - Feel free to use for learning and interviews

## ❓ Support

For issues or questions:
1. Check troubleshooting section above
2. Review browser console (F12)
3. Check backend server logs
4. Open issue on GitHub

---

**🍽️ Ready to search for dishes! Start with Step 1 above. Good luck! 🚀**

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
