# CRM and Service Renewal Management System

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- npm or yarn

## Clone the repository

```bash
git clone --recurse-submodules https://github.com/shafinmurani/enquiryform
cd enquiryform
```

## Database Setup

1. Import the database structure:

   ```bash
   mysql -u root -p < db_structure.sql
   ```

2. Create MySQL user and database:
   ```sql
   CREATE USER 'enquiryform'@'localhost' IDENTIFIED BY 'enquiryform';
   CREATE DATABASE enquiryform;
   GRANT ALL PRIVILEGES ON enquiryform.* TO 'enquiryform'@'localhost';
   FLUSH PRIVILEGES;
   ```

## Backend Setup

1. Go to the server directory:
   ```bash
   cd server
   ```
2. Create a `.env` file in the `server` directory:

   ```bash
   echo "TOKEN_SECRET=your_long_random_secret_key_here" > .env
   ```

   Note: Replace `your_long_random_secret_key_here` with a secure, random string

3. Install dependencies and start server:
   ```bash
   npm install
   npm run dev
   ```

## Frontend Deployment

1. Go to the client directory:

   ```bash
   cd client
   ```

2. Install and start:
   ```bash
   npm install
   npm start
   ```

## Troubleshooting

- Verify MySQL database import
- Ensure MySQL user and database creation
- Check `.env` has a valid `TOKEN_SECRET`
- Verify database connection

## Update

To pull from the repo

```bash
git pull --recurse-submodules
```

## Need Help?

If you encounter any issues during setup, contact the project maintainers:

- Shafin Murani: [shafinmurani9@gmail.com](mailto:shafinmurani9@gmail.com)
- Ashlin Colaco: [beastashlin10@gmail.com](mailto:beastashlin10@gmail.com)
