# Restaurant Dish Search

Simple Node + Express backend (MySQL) with a React frontend. Search restaurants by dish name and price range — returns top restaurants ordered by popularity.

Quick commands
- Backend (from repo root):
  ```powershell
  cd .\backend
  npm install
  # use local MySQL credentials (example: root/root)
  $env:DB_HOST='localhost'; $env:DB_USER='root'; $env:DB_PASSWORD='root'; $env:DB_NAME='restaurant_db'
  npm run setup-db   # create DB & tables
  npm run seed       # seed sample data
  npm start          # starts API (default port 3001)
  ```

- Frontend (React):
  ```powershell
  cd .\frontend
  npm install
  npm start
  # CRA will open a browser; if port 3000 is in use it will pick another port (check console)
  ```

API
- Health: `GET /health`
- Search: `GET /search/dishes?name=<dish>&minPrice=<min>&maxPrice=<max>`
  - Response shape: `{ "restaurants": [ { restaurantId, restaurantName, city, dishName, dishPrice, orderCount } ] }`

Files removed
- The standalone static frontend (`frontend/standalone/frontend.html` and its small server) was removed — the React app in `frontend/` is the primary UI now.

Notes
- Keep secrets out of the repo: use a local `.env` in `backend/` or set env vars in your shell. Do NOT commit `.env`.
- If you want a Docker Compose setup (MySQL + backend + frontend) I can add one.

If anything is unclear or you want a Docker setup, tell me and I will add it.

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

### Backend Deployment on Render (Complete Guide)

#### Step 1: Prepare Your Code for Render

1. **Ensure `package.json` has correct start script:**
```json
{
  "scripts": {
    "start": "node server.js",
    "seed": "node scripts/seed.js"
  }
}
```

2. **Update `.env` file structure** - Render provides environment variables in the dashboard:
```
DATABASE_HOST=your_render_mysql_host
DATABASE_USER=your_mysql_user
DATABASE_PASSWORD=your_mysql_password
DATABASE_NAME=restaurants_db
PORT=10000
```

3. **Push to GitHub** - Render connects via GitHub:
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

#### Step 2: Create Render MySQL Database

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"MySQL"**
3. **Database Configuration:**
   - **Name**: `restaurants_db`
   - **Database**: `restaurants_db`
   - **Username**: `render_user` (or your choice)
   - **Region**: Select closest to you
   - **Pricing**: Free tier available

4. **Save these credentials:**
   - **External Database URL** (provided after creation)
   - **Host**: `<host>.mysql.render.com`
   - **Port**: `3306`
   - **User**: Your username
   - **Password**: Your password

#### Step 3: Create Render Web Service for Backend

1. Click **"New +"** → **"Web Service"**
2. **Connect GitHub Repository:**
   - Select "Deploy an existing repository"
   - Search and select your restaurant-search repo
   - Authorize GitHub access if needed

3. **Configuration Settings:**
   - **Name**: `restaurant-api` (or your choice)
   - **Environment**: `Node`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables** (click "Add Environment Variable"):
```
DATABASE_HOST=<mysql.render.com host from Step 2>
DATABASE_USER=<your_username>
DATABASE_PASSWORD=<your_password>
DATABASE_NAME=restaurants_db
PORT=10000
NODE_ENV=production
```

5. **Deploy Settings:**
   - **Pricing Plan**: Free or Starter
   - Click **"Create Web Service"**

6. **Wait for Deployment:**
   - Render builds and deploys automatically
   - Check deployment logs in Dashboard
   - Expected URL: `https://restaurant-api-xxxxx.onrender.com`

#### Step 4: Initialize Database on Render

1. **Connect to Render MySQL** using a MySQL client:
```bash
# Using MySQL command line
mysql -h <host>.mysql.render.com -u <user> -p
# Enter your password when prompted
```

2. **Create Database & Tables:**
```sql
USE restaurants_db;

-- Create restaurants table
CREATE TABLE restaurants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  UNIQUE KEY unique_name_city (name, city)
);

-- Create menu items table
CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT NOT NULL,
  dish_name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Create orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  menu_item_id INT NOT NULL,
  order_count INT DEFAULT 1,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_menu_items_dish ON menu_items(dish_name);
CREATE INDEX idx_orders_menu_item ON orders(menu_item_id);
```

3. **Seed Sample Data (Optional):**
```sql
-- Insert sample restaurants
INSERT INTO restaurants (name, city) VALUES 
('Taj Palace', 'Mumbai'),
('Spice Route', 'Delhi'),
('Southern Masala', 'Bangalore'),
('Coastal Kitchen', 'Chennai'),
('Golden Fork', 'Kolkata'),
('Royal Tandoor', 'Pune'),
('Curry House', 'Hyderabad'),
('Biryani Bliss', 'Lucknow');

-- Insert menu items
INSERT INTO menu_items (restaurant_id, dish_name, price) VALUES
(1, 'Hyderabadi Biryani', 280),
(1, 'Butter Chicken', 350),
(2, 'Mughlai Biryani', 250),
(2, 'Paneer Tikka', 280),
-- ... add more as needed
```

#### Step 5: Verify Deployment

1. **Test API Health:**
```
https://restaurant-api-xxxxx.onrender.com/health
```
Should return: `{ status: 'OK' }`

2. **Test Search Endpoint:**
```
https://restaurant-api-xxxxx.onrender.com/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

3. **Check Logs:**
   - Go to Web Service Dashboard
   - Click "Logs" to view real-time server output

#### Step 6: Deploy Frontend

**Option A: Deploy as Static Site (Recommended)**
1. Go to Render → **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. **Configuration:**
   - **Build Command**: (leave empty for static HTML)
   - **Publish Directory**: `.` (root folder where frontend.html is)
4. Add environment variable:
```
BACKEND_URL=https://restaurant-api-xxxxx.onrender.com
```
5. Update `frontend.html` to use environment variable:
   - Find: `const API_BASE_URL = 'http://localhost:3000';`
   - Replace with: `const API_BASE_URL = 'https://restaurant-api-xxxxx.onrender.com';`

**Option B: Deploy Node Frontend Server**
1. Create new Web Service pointing to your repo
2. **Build Command**: `npm install`
3. **Start Command**: `node frontend-server.js`
4. Add environment variable with backend URL

**Option C: Use Vercel (Easiest for Frontend)**
1. Push frontend.html to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import GitHub repository
4. Deploy (takes 1-2 minutes)
5. Update `frontend.html` API_BASE_URL to your Render backend URL

#### Step 7: Connect Frontend to Backend

**Update frontend.html:**
```javascript
// Find this line (around line 1):
const API_BASE_URL = 'http://localhost:3000';

// Change to:
const API_BASE_URL = 'https://restaurant-api-xxxxx.onrender.com';
```

Save and redeploy frontend.

#### Troubleshooting Render Deployment

**Issue: "502 Bad Gateway"**
- Check backend logs: Dashboard → Logs
- Verify database connection in Error logs
- Ensure all environment variables are set correctly
- Restart service: Dashboard → "Manual Restart"

**Issue: "Cannot connect to database"**
- Verify MySQL host/user/password in environment variables
- Check if database was created and tables initialized
- Test MySQL connection string using MySQL Workbench

**Issue: "Database error after restart"**
- Render spins down free tier after 15 minutes of inactivity
- First request will take 30+ seconds (wake-up time)
- Data persists in MySQL, but Node process may reset

**Issue: "CORS error from frontend"**
- Ensure backend has CORS enabled in `server.js`
- Verify frontend URL matches backend CORS settings
- Clear browser cache and hard refresh (Ctrl+Shift+R)

**Issue: "Frontend shows errors but backend works"**
- Check browser console (F12 → Console)
- Verify API_BASE_URL in frontend.html is correct
- Check that backend returns `{ restaurants: [...] }` format

### Alternative Deployment Platforms

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
