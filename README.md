# Restaurant Dish Search - Full Stack Application

A production-ready Node.js + Express + MySQL backend service with a beautiful responsive HTML frontend for searching restaurants by dish name with price filtering.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Backend API](#backend-api)
- [Database Schema](#database-schema)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Backend
- 🔍 RESTful API for searching restaurants by dish name
- 💰 Price range filtering (minPrice and maxPrice)
- ⭐ Results sorted by popularity (order count)
- 🗄️ MySQL database with optimized queries
- 🔐 SQL injection prevention using parameterized queries
- 🔌 Connection pooling (10 concurrent connections)
- ✅ Input validation and error handling
- 🌐 CORS support for frontend communication
- 📊 Database-level aggregation for efficient popularity ranking

### Frontend
- 🎨 Beautiful gradient UI design
- 📱 Fully responsive layout (desktop, tablet, mobile)
- ⚡ Real-time search with validation
- 🔄 Loading states and error handling
- 🎯 No external dependencies (pure HTML/CSS/JavaScript)
- ⚙️ Proper API integration

## 🛠️ Technology Stack

**Backend:**
- Node.js v14+ (JavaScript runtime)
- Express.js 4.18.2 (Web framework)
- MySQL 5.7+ (Database)
- mysql2/promise 3.6.5 (Async MySQL driver)
- cors 2.8.5 (Cross-origin requests)
- dotenv 16.3.1 (Environment variables)
- nodemon 3.0.2 (Development tool)

**Frontend:**
- HTML5 (Semantic markup)
- CSS3 (Responsive design with Grid and Flexbox)
- Vanilla JavaScript (No dependencies)
- Fetch API (HTTP communication)

## 🚀 Quick Start

### Prerequisites
- Node.js v14 or higher
- MySQL Server v5.7 or higher
- npm or yarn

### 1. Install Backend Dependencies
```bash
cd "c:\Users\Jayesh Phale\Downloads\Restaurants Dish Search"
npm install
```

### 2. Setup Database
```bash
# Create database and tables
node setup-db.js

# Seed with sample data
npm run seed
```

### 3. Start Backend Server
```bash
npm start
```
Expected output: `🚀 Restaurant Dish Search API running on http://localhost:3000`

### 4. Start Frontend Server (Optional)
```bash
node frontend-server.js
```
Expected output: `🌐 Frontend available at http://localhost:8080`

### 5. Access the Application
- **Frontend UI**: http://localhost:8080
- **Or open directly**: `frontend.html` in your browser
- **API Health Check**: http://localhost:3000/health
- **Test Search**: http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300

## 📁 Project Structure

```
Restaurants Dish Search/
├── Backend Core
│   ├── server.js              # Express application setup
│   ├── db.js                  # MySQL connection pool
│   ├── dbSetup.js             # Database schema initialization
│   ├── package.json           # Dependencies configuration
│   └── .env                   # Environment variables
│
├── Routes & Logic
│   └── routes/
│       └── search.js          # Search API endpoint
│
├── Database
│   ├── scripts/
│   │   ├── setup.js           # Database setup entry point
│   │   └── seed.js            # Sample data seeding
│   └── setup-db.js            # Standalone database setup
│
├── Frontend
│   ├── frontend.html          # All-in-one HTML UI
│   └── frontend-server.js     # HTTP server for frontend
│
└── README.md                  # This file
```

## 🔌 Backend API

### Endpoints

#### 1. Search Dishes
Search for restaurants serving a specific dish within a price range.

**Request:**
```
GET /search/dishes?name=<dishName>&minPrice=<minPrice>&maxPrice=<maxPrice>
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | ✅ | Dish name to search (supports partial matching) |
| minPrice | number | ✅ | Minimum price in ₹ (non-negative) |
| maxPrice | number | ✅ | Maximum price in ₹ (non-negative, >= minPrice) |

**Example Request:**
```
http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

**Success Response (200 OK):**
```json
{
  "restaurants": [
    {
      "restaurantId": 1,
      "restaurantName": "Hyderabadi Spice House",
      "city": "Hyderabad",
      "dishName": "Chicken Biryani",
      "dishPrice": 220,
      "orderCount": 96
    },
    {
      "restaurantId": 4,
      "restaurantName": "Kolkata Biryani Palace",
      "city": "Kolkata",
      "dishName": "Chicken Biryani",
      "dishPrice": 195,
      "orderCount": 89
    }
  ]
}
```

**Error Responses:**

Missing required parameters (400 Bad Request):
```json
{
  "error": "Dish name (name) is required"
}
```

Invalid price range (400 Bad Request):
```json
{
  "error": "minPrice must be less than or equal to maxPrice"
}
```

Server error (500 Internal Server Error):
```json
{
  "error": "Internal server error",
  "message": "Connection error details..."
}
```

#### 2. Health Check
Check if the API is running.

**Request:**
```
GET /health
```

**Response (200 OK):**
```json
{
  "status": "OK",
  "message": "Restaurant Dish Search API is running"
}
```

### Query Logic

The search endpoint uses an optimized SQL query with JOINs, aggregation, and filtering:

```sql
SELECT 
  r.id as restaurantId,
  r.name as restaurantName,
  r.city,
  m.name as dishName,
  m.price as dishPrice,
  SUM(o.order_count) as orderCount
FROM restaurants r
INNER JOIN menu_items m ON r.id = m.restaurant_id
INNER JOIN orders o ON m.id = o.menu_item_id
WHERE LOWER(m.name) LIKE LOWER(?)
  AND m.price >= ?
  AND m.price <= ?
GROUP BY r.id, m.id
ORDER BY orderCount DESC
LIMIT 10
```

**Query Optimization:**
- **INNER JOINs**: Efficient data retrieval across three tables
- **GROUP BY**: Aggregates multiple orders per dish
- **SUM()**: Calculates total order count per restaurant-dish combination
- **LOWER()**: Case-insensitive matching
- **LIKE operator**: Partial text matching
- **WHERE**: Filters by price range before sorting
- **ORDER BY DESC**: Sorts by popularity
- **LIMIT 10**: Returns top 10 results

## 📊 Database Schema

### Tables

#### restaurants
Stores restaurant information.

```sql
CREATE TABLE restaurants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  city VARCHAR(50) NOT NULL
);
```

| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR(100) | NOT NULL, UNIQUE |
| city | VARCHAR(50) | NOT NULL |

#### menu_items
Stores dishes offered by each restaurant.

```sql
CREATE TABLE menu_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);
```

| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| restaurant_id | INT | FOREIGN KEY (restaurants.id), ON DELETE CASCADE |
| name | VARCHAR(100) | NOT NULL |
| price | DECIMAL(10,2) | NOT NULL |

#### orders
Stores order data (aggregated order counts per menu item).

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  menu_item_id INT NOT NULL,
  order_count INT NOT NULL DEFAULT 0,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);
```

| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| menu_item_id | INT | FOREIGN KEY (menu_items.id), ON DELETE CASCADE |
| order_count | INT | NOT NULL, DEFAULT 0 |

### Sample Data

**8 Restaurants:** Hyderabadi Spice House, Mumbai Masala Kitchen, Delhi Delights, Kolkata Biryani Palace, Chennai Flavors, Bangalore Spice Corner, Lucknow Kebab House, Jaipur Royal Cuisine

**28 Menu Items:** Various biryani types (Chicken, Vegetable, Mutton, Fish, Egg, Paneer, Prawn)
- Price range: ₹140 - ₹295
- Order counts: 38 - 96 (realistic popularity data)

## 🔧 Installation & Setup

### 1. Clone/Download Project
```bash
cd "c:\Users\Jayesh Phale\Downloads\Restaurants Dish Search"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create `.env` file in root directory:
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
# Standalone setup (creates database and tables)
node setup-db.js
```

Output:
```
✓ Connected to MySQL server
✓ Database 'restaurant_db' created/verified
✓ restaurants table created
✓ menu_items table created
✓ orders table created
✓ Database setup completed successfully!
```

### 5. Seed Sample Data
```bash
npm run seed
```

Output:
```
✓ Cleared existing data
✓ Inserted 8 restaurants
✓ Inserted 28 menu items
✓ Inserted 28 orders
✅ Database seeded successfully!
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
npm start
```

**Terminal 2 - Frontend (Optional):**
```bash
node frontend-server.js
```

### Production Mode

```bash
npm install --production
npm start
```

## 🧪 Testing

### Browser Testing
1. Open `frontend.html` or http://localhost:8080
2. Search for "biryani" with price range ₹150-₹300
3. Should display 10+ results sorted by popularity

### API Testing - PowerShell
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300" -UseBasicParsing
$response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

### API Testing - Direct Browser
Visit: `http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300`

### Example Searches

| Search Term | Min Price | Max Price | Expected Results |
|-------------|-----------|-----------|------------------|
| biryani | 150 | 300 | 10+ results with various biryani types |
| chicken | 100 | 250 | Multiple chicken dishes |
| paneer | 100 | 200 | Paneer varieties |
| mutton | 250 | 350 | Premium mutton options |
| fish | 280 | 290 | Fish biryani |

## 🏗️ Architecture

### Request Flow
```
Client Request → Express Middleware → Route Validation → DB Query → Response
```

### Database Connection
- **Connection Pool:** 10 concurrent connections
- **Automatic Queuing:** Handles overflow requests
- **Connection Reuse:** Efficient resource management
- **Error Handling:** Automatic retry and release

### Performance Optimizations
1. **Connection Pooling:** Reuses database connections
2. **Parameterized Queries:** SQL injection prevention + caching
3. **Database Aggregation:** Delegates computation to SQL
4. **Indexed Queries:** Primary/Foreign keys automatically indexed
5. **Limited Results:** LIMIT 10 prevents large transfers

## 🚢 Deployment

### Backend Deployment

**Railway.app (Recommended):**
```bash
npm install -g railway
railway login
railway link
railway up
```

**Heroku:**
```bash
npm install -g heroku
heroku login
heroku create your-app-name
git push heroku main
```

**AWS EC2 / DigitalOcean:**
- Install Node.js and MySQL
- Clone repository
- Set `.env` variables
- `npm install && npm start`

### Frontend Deployment

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
- Drag and drop `frontend.html` to netlify.com

## 🐛 Troubleshooting

### Backend Issues

**"Port 3000 already in use"**
```powershell
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
Stop-Process -Id <PID> -Force
```

**"Cannot connect to database"**
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists: `node setup-db.js`

**"CORS error in browser"**
- Backend has CORS enabled in server.js
- Verify frontend and backend are on different ports
- Restart backend server

### Frontend Issues

**"Backend not responding"**
- Verify backend is running: `npm start`
- Check if running on http://localhost:3000
- Open browser console (F12) for errors

**"Cannot read property 'forEach'"**
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache

### Database Issues

**"Connection timed out"**
- MySQL may not be running
- Check firewall settings
- Verify DB_HOST in .env

**"Unknown column error"**
- Run: `node setup-db.js`
- Run: `npm run seed`

## 💡 Key Backend Concepts

### Security
- **Parameterized Queries:** Prevents SQL injection attacks
- **Input Validation:** All parameters validated before use
- **CORS:** Restricted to necessary origins
- **Error Handling:** Never exposes sensitive information

### Performance
- **Connection Pooling:** Reduces connection overhead
- **Query Optimization:** JOINs + Aggregation at database level
- **Result Limiting:** LIMIT 10 prevents large data transfers
- **Indexing:** Automatic via primary/foreign keys

### Scalability
- **Stateless Design:** Can run multiple instances
- **Connection Pool:** Handles concurrent requests
- **Database Schema:** Normalized for consistency
- **Error Recovery:** Automatic connection release

### Code Quality
- **Separation of Concerns:** Routes, DB, Server separate
- **Error Handling:** Try-catch with proper HTTP status codes
- **Variable Naming:** Clear, descriptive names
- **Comments:** Key logic documented

## 📝 Git Repository

The project includes meaningful commits tracking development:
- Initial setup and configuration
- Database schema and scripts
- API endpoint implementation
- Frontend integration
- Bug fixes and optimizations

## 🎓 Interview Preparation

### Technical Talking Points

**Database Design:**
- "I used 3 normalized tables with proper foreign key relationships"
- "Cascading deletes maintain referential integrity"
- "Why I aggregate orders in a separate table vs individual records"

**Query Optimization:**
- "Using INNER JOINs for efficient multi-table queries"
- "GROUP BY with SUM() aggregates data at database level"
- "Parameterized queries provide security and caching benefits"
- "LIMIT 10 prevents unnecessary data transfer"

**API Design:**
- "RESTful principles with proper HTTP methods and status codes"
- "Input validation prevents invalid requests"
- "Structured error responses help client debugging"

**Performance:**
- "Connection pooling reduces overhead from establishing connections"
- "10 concurrent connections handle multiple simultaneous requests"
- "Case-insensitive LIKE search with proper indexing"

**Security:**
- "Parameterized queries prevent SQL injection"
- "CORS configuration controls cross-origin requests"
- "Input validation on all parameters"
- "Proper HTTP status codes for error conditions"

### Example Interview Questions

1. **"Walk me through a search request from frontend to database"**
   - Request to /search/dishes with parameters
   - Parameter validation (name, price range)
   - Connection from pool acquired
   - SQL query executed with JOINs
   - Results mapped to JSON
   - Connection released
   - Response sent to client

2. **"How would you optimize for 1 million menu items?"**
   - Add indexes on frequently searched columns
   - Implement caching layer (Redis)
   - Database read replicas
   - Pagination instead of fixed LIMIT
   - Full-text search for better performance
   - Denormalization for read-heavy queries

3. **"How do you prevent SQL injection?"**
   - Using parameterized queries (? placeholders)
   - Never concatenate user input into SQL
   - mysql2 library handles proper escaping
   - Input validation as additional layer

4. **"Explain your connection pooling implementation"**
   - 10 concurrent connections in pool
   - Reuses connections across requests
   - Automatic queuing for overflow
   - Connection release on error
   - Improves performance vs creating new connection per request

5. **"How would you debug a performance issue?"**
   - Check slow query log
   - Monitor connection pool usage
   - Review EXPLAIN query plans
   - Check for missing indexes
   - Profile database vs application code

## 📄 License

MIT - Feel free to use for learning and interviews

---

**🍽️ Ready to search for dishes! Start with "Quick Start" section above. 🚀**
