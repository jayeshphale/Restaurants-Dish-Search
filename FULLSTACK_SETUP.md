# Full Stack Application Setup Guide

This document provides complete setup instructions for both frontend and backend.

## Quick Start

### 1. Start Backend Server

```bash
# Terminal 1: Backend
cd "c:\Users\Jayesh Phale\Downloads\Restaurants Dish Search"
npm install
npm run seed
npm start
```

Expected output:
```
🚀 Restaurant Dish Search API running on http://localhost:3000
Health check: http://localhost:3000/health
```

### 2. Start Frontend Development Server

```bash
# Terminal 2: Frontend
cd "c:\Users\Jayesh Phale\Downloads\Restaurants Dish Search\frontend"
npm install
npm start
```

Expected output:
```
Compiled successfully!
You can now view restaurant-dish-search-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://<your-ip>:3000
```

### 3. Open in Browser

Visit `http://localhost:3000` to see the application

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser / Frontend (React)                │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ SearchForm   │  │ ResultsGrid  │  │ API Client      │   │
│  │ Component    │  │ Component    │  │ (axios/fetch)   │   │
│  └──────────────┘  └──────────────┘  └─────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP GET
                           ├─ /search/dishes?name=x&minPrice=y&maxPrice=z
                           ├─ /health
                           ▼
┌──────────────────────────────────────────────────────────────┐
│              Backend API (Express.js + Node.js)              │
│  ┌──────────────────┐  ┌─────────────────────────────────┐  │
│  │ server.js        │  │ routes/search.js                │  │
│  │ - CORS enabled   │  │ - Parameter validation          │  │
│  │ - Port 3000      │  │ - Database query                │  │
│  │ - Health check   │  │ - Result formatting             │  │
│  └──────────────────┘  └─────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │ Connection Pool
                           ├─ max 10 connections
                           ├─ Parameterized queries
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    MySQL Database                            │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐    │
│  │ restaurants  │  │ menu_items   │  │ orders         │    │
│  │ - id         │  │ - id         │  │ - id           │    │
│  │ - name       │  │ - name       │  │ - menu_item_id │    │
│  │ - city       │  │ - price      │  │ - order_count  │    │
│  └──────────────┘  │ - r_id (FK)  │  └────────────────┘    │
│                     └──────────────┘                          │
└──────────────────────────────────────────────────────────────┘
```

## Project Structure

```
Restaurants Dish Search/
├── backend files (server.js, db.js, routes/, scripts/)
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchForm.jsx      # Search input interface
│   │   │   └── ResultsGrid.jsx     # Results display
│   │   ├── api/
│   │   │   └── client.js           # API communication
│   │   ├── App.jsx                 # Main component
│   │   ├── index.js                # React entry point
│   │   ├── index.css               # Global styles
│   │   └── App.test.js             # Tests
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── package.json (backend)
├── .env
└── [other backend files]
```

## Configuration

### Backend (.env)

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=restaurant_db
```

### Frontend (package.json)

Key scripts:
```json
{
  "scripts": {
    "start": "react-scripts start",      // Dev server on port 3000
    "build": "react-scripts build",      // Production build
    "test": "react-scripts test",        // Run tests
    "eject": "react-scripts eject"       // Eject from CRA (irreversible)
  }
}
```

## Running Both Services

### Terminal 1 - Backend
```bash
cd "c:\Users\Jayesh Phale\Downloads\Restaurants Dish Search"
npm start
# Runs on http://localhost:3000
```

### Terminal 2 - Frontend
```bash
cd "c:\Users\Jayesh Phale\Downloads\Restaurants Dish Search\frontend"
npm start
# Runs on http://localhost:3000 (will prompt to use different port)
# Usually opens on http://localhost:3001 or http://localhost:3002
```

## API Endpoints

All requests are GET requests to the backend (default port 3000):

### 1. Search Dishes
```
GET /search/dishes?name=biryani&minPrice=150&maxPrice=300

Parameters:
  - name (required): Dish name (supports partial matching)
  - minPrice (required): Minimum price in ₹
  - maxPrice (required): Maximum price in ₹

Response: Array of 0-10 results sorted by order count (popularity)
```

### 2. Health Check
```
GET /health

Response:
{
  "status": "OK",
  "message": "Restaurant Dish Search API is running"
}
```

## Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
node test-api.js          # Node.js test
python test-api.py        # Python test
```

### Manual Testing

**Using Browser:**
1. Frontend UI: http://localhost:3000 (or 3001/3002)
2. API directly: http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300

**Using PowerShell:**
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300" -Method Get -UseBasicParsing
$response.Content
```

## Sample Data

The application comes pre-loaded with:
- **8 Restaurants** (Hyderabadi, Mumbai, Delhi, Kolkata, Chennai, Bangalore, Lucknow, Jaipur)
- **28 Menu Items** (Various biryani types, prices ₹140-₹295)
- **28 Order Records** (38-96 orders per item for realistic popularity)

### Example Results for "biryani" with price ₹150-₹300:

```json
[
  {
    "restaurant_id": 1,
    "restaurant_name": "Hyderabadi Spice House",
    "city": "Hyderabad",
    "dish_name": "Chicken Biryani",
    "price": 195,
    "order_count": 85
  },
  {
    "restaurant_id": 3,
    "restaurant_name": "Mumbai Masala Kitchen",
    "city": "Mumbai",
    "dish_name": "Vegetable Biryani",
    "price": 160,
    "order_count": 72
  },
  ...
]
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

**Option 1: Kill the process**
```powershell
# Find process using port 3000
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess

# Kill the process (replace PID)
Stop-Process -Id <PID> -Force
```

**Option 2: Use different port**
```bash
# Backend
$env:PORT=3001
npm start

# Frontend will automatically use a different port
npm start
```

### Backend Not Responding

```bash
# Check backend is running
curl http://localhost:3000/health

# Restart backend
npm start

# If database error, reseed
npm run seed
```

### CORS Error

If you see "CORS error" in browser console:
- Ensure backend has cors middleware enabled
- Check server.js has `app.use(cors())`
- Restart backend server

### Database Connection Error

```bash
# Verify MySQL is running and credentials are correct
# Check .env file settings
# Reseed database
node scripts/setup.js
npm run seed
```

## Building for Production

### Frontend Production Build

```bash
cd frontend
npm run build
```

Output: `frontend/build/` directory with optimized files

### Deploy Frontend
```bash
# Option 1: Vercel
npm install -g vercel
vercel

# Option 2: Netlify
# Drag and drop build/ folder to netlify.com

# Option 3: AWS S3 + CloudFront
aws s3 sync build/ s3://your-bucket-name/
```

### Deploy Backend
```bash
# Option 1: Railway.app (Recommended)
npm install -g railway
railway login
railway link
railway up

# Option 2: Heroku
npm install -g heroku
heroku login
heroku create your-app-name
git push heroku main

# Option 3: AWS EC2
# Provision EC2 instance, clone repo, run npm install && npm start
```

## Environment Variables

### Frontend (.env in frontend/)
```env
REACT_APP_API_URL=http://localhost:3000
```

### Backend (.env in root)
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=restaurant_db
```

## Performance Optimization

### Frontend
- React code splitting with lazy loading
- CSS minification
- Image optimization
- Gzip compression

### Backend
- Database connection pooling (10 connections)
- Query optimization with proper indexes
- Response compression
- Caching headers

## Security Considerations

✅ **Implemented:**
- Parameterized queries (SQL injection prevention)
- CORS configured
- Input validation
- Error handling

🔒 **Additional for Production:**
- HTTPS/SSL
- Rate limiting
- API authentication
- Database encryption
- Environment variable validation

## Next Steps

1. ✅ Run backend: `npm start`
2. ✅ Run frontend: `npm start` (from frontend/)
3. ✅ Test in browser: http://localhost:3000
4. ✅ Deploy to cloud (Railway, Vercel, Netlify)
5. ✅ Share URL for interview demo

## Support

For issues:
1. Check browser console (F12) for errors
2. Check backend console for API errors
3. Review troubleshooting section above
4. Check CORS headers in Network tab

---

**You're all set! Happy coding! 🚀**
