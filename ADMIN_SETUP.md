# Admin Panel Setup Guide

This guide walks you through setting up the admin panel for the Matribhumi Hajj Kafela website.

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier available)
- ImageKit account (free tier available)
- Vercel account (for deployment)

## Phase 1: Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

### Required Environment Variables

#### MongoDB Configuration
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database named `matribhumi-hajj`
4. Get your connection string and add to `MONGODB_URI`

#### Admin Authentication
Generate the admin password hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('yourpassword', 10))"
```

Generate the JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### ImageKit Configuration
1. Sign up at [ImageKit](https://imagekit.io)
2. Get your public key, private key, and URL endpoint from the dashboard
3. Add these to the environment variables

## Phase 2: Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Access the admin panel at `http://localhost:3000/admin`

## Phase 3: Vercel Deployment

### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all variables from `.env.local`

### Option B: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables during setup
6. Deploy

## Phase 4: Admin Panel Access

Once deployed, access the admin panel at:
```
https://your-domain.vercel.app/admin
```

Login with your configured admin email and password.

## Features Available

### 1. Packages Manager
- Create, edit, and delete Hajj/Umrah packages
- Bilingual support (Bangla/English)
- Manage features, inclusions, exclusions
- Set pricing and availability status

### 2. Albums Manager
- Create photo albums
- Upload photos via ImageKit (CDN with transformations)
- Add bilingual captions to photos
- Organize by date and category

### 3. Prayer Times Manager
- Update daily prayer times
- Live preview of how times appear
- Automatically updates the website widget

## API Endpoints

All API endpoints are secured with JWT authentication:

- `POST /api/auth/login` - Admin login
- `GET /api/packages` - List all packages
- `POST /api/packages` - Create package (auth required)
- `PUT /api/packages` - Update package (auth required)
- `DELETE /api/packages?id={id}` - Delete package (auth required)
- `GET /api/albums` - List all albums
- `POST /api/albums` - Create album (auth required)
- `PUT /api/albums` - Update album (auth required)
- `DELETE /api/albums?id={id}` - Delete album (auth required)
- `POST /api/albums/{id}/photos` - Add photo to album (auth required)
- `DELETE /api/albums/{id}/photos` - Remove photo from album (auth required)
- `GET /api/prayer-times` - Get current prayer times
- `PUT /api/prayer-times` - Update prayer times (auth required)
- `POST /api/upload` - Upload image to ImageKit (auth required)

## Security Notes

1. Never commit `.env.local` to version control
2. Use strong passwords for admin account
3. Keep JWT_SECRET secure and rotate periodically
4. ImageKit private key should never be exposed to client-side code
5. All admin actions are logged via API authentication

## Troubleshooting

### MongoDB Connection Issues
- Ensure IP whitelist includes Vercel's IP ranges (or use 0.0.0.0/0 for testing)
- Verify connection string format
- Check database user credentials

### Image Upload Failures
- Verify ImageKit credentials
- Check file size limits (ImageKit free: 25MB per file)
- Ensure proper folder structure in ImageKit

### Authentication Issues
- Verify ADMIN_PASSWORD hash is correct
- Check JWT_SECRET is set and consistent
- Clear browser localStorage if stuck in login loop

## Support

For issues or questions:
1. Check Vercel function logs in dashboard
2. Review MongoDB Atlas logs
3. Check browser console for frontend errors
