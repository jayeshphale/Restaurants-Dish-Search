# Restaurant Dish Search API - Configuration Guide

## Environment Configuration

### Local Development Setup

1. **MySQL Configuration**
   - Host: `localhost` (or your MySQL server address)
   - Port: `3306` (default MySQL port)
   - User: `root` (or your MySQL username)
   - Password: (your MySQL password)
   - Database: `restaurant_db` (will be created automatically)

2. **Node.js Configuration**
   - Port: `3000` (can be changed)
   - Environment: `development`

### Database Setup Commands

```bash
# For users on macOS/Linux with MySQL installed:
mysql -u root -p
# Then create database
CREATE DATABASE restaurant_db;

# For Windows users with MySQL installed:
mysql -u root -p
# Then create database
CREATE DATABASE restaurant_db;
```

### Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Configure .env (if different from defaults)
# Edit .env file with your MySQL credentials

# 3. Initialize database
node scripts/setup.js

# 4. Seed sample data
npm run seed

# 5. Start server
npm start
```

### Quick Test

Once running, test with curl or browser:

```bash
# Health check
http://localhost:3000/health

# Search API
http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

## Production Deployment

### Environment Variables for Production

```env
PORT=8080
DB_HOST=mysql.example.com
DB_PORT=3306
DB_USER=prod_user
DB_PASSWORD=strong_password_here
DB_NAME=restaurant_db
NODE_ENV=production
```

### Deployment Checklist

- [ ] Update database credentials for production
- [ ] Use strong database password
- [ ] Enable SSL/TLS for database connections
- [ ] Set up proper logging
- [ ] Configure firewall rules
- [ ] Set appropriate environment to "production"

## Notes

- The application uses connection pooling for better performance
- All queries are parameterized to prevent SQL injection
- Sample data includes 8 restaurants with Biryani dishes at various price points
