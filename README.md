# 🐹 CryptoHamsterNFTz.biz - Satirical NFT Marketplace

A full-stack parody web application that lampoons crypto culture and NFT marketplaces. Built with React frontend and Node.js/Express backend.

## 🎭 Project Purpose

This is a **satirical website** created for entertainment and educational purposes. It parodies the absurd pricing, marketing tactics, and hype culture surrounding NFT projects. No real cryptocurrency or money is involved!

## 🚀 Features Implemented

### Frontend Features
- **Landing Page**: Over-the-top 90s-style design with animated hamsters, neon colors, Comic Sans font, and marquee banners
- **User Authentication**: Email/password registration and login system
- **Paywall System**: Mock payment gateway to "unlock" the NFT gallery
- **NFT Gallery**: Exclusive collection of 12+ hamster NFTs with fake purchase functionality
- **VIP Tier Page**: Ridiculous $10,000 "Golden Hamster Plushie" offer with progress tracking
- **Admin Panel**: Dashboard for viewing stats and adding new NFTs
- **Responsive Design**: Works on mobile and desktop with intentionally tacky 90s aesthetics

### Backend Features
- **RESTful API**: Express.js server with proper routing and middleware
- **SQLite Database**: Lightweight database with Users, NFTs, and Purchases tables
- **JWT Authentication**: Secure session management with HTTP cookies
- **Protected Routes**: Middleware for authentication and payment verification
- **Admin Capabilities**: Special endpoints for managing content and viewing statistics
- **Mock Crypto Wallet**: Fake balance API returning ridiculous cryptocurrency amounts

## 🛠️ Tech Stack

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Axios for API calls
- CSS with intentionally retro styling

**Backend:**
- Node.js with Express
- SQLite3 database
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled for cross-origin requests

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-hamster-nftz
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend && npm install
   
   # Install backend dependencies
   cd ../backend && npm install
   ```

3. **Start the application**
   ```bash
   # From the root directory, start both frontend and backend
   npm run dev
   ```

   Or start them separately:
   ```bash
   # Terminal 1: Start backend (from root)
   npm run server
   
   # Terminal 2: Start frontend (from root)
   npm run client
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🎮 How to Use

### User Flow
1. **Visit Landing Page**: Experience the full 90s parody aesthetic
2. **Register Account**: Create an account (first user becomes admin)
3. **Hit the Paywall**: Try to access the gallery and get redirected to payment
4. **"Pay" to Unlock**: Click the fake payment button to unlock gallery access
5. **Browse NFTs**: View the exclusive hamster collection
6. **"Purchase" Hamsters**: Buy NFTs with fake cryptocurrency
7. **Check VIP Tier**: Visit the ridiculous $10K golden plushie offer

### Admin Features
- **View Stats**: See user registration, payment, and purchase statistics
- **Add NFTs**: Create new hamster NFTs for the collection
- **Monitor Activity**: Track fake revenue and conversion rates

## 🗄️ Database Schema

### Users Table
- `id`: Primary key
- `email`: Unique user email
- `password`: Hashed password
- `hasPaid`: Boolean for gallery access
- `isAdmin`: Boolean for admin privileges
- `createdAt`: Registration timestamp

### NFTs Table
- `id`: Primary key
- `name`: Hamster name
- `rarity`: Rarity description with emojis
- `price`: Fake cryptocurrency price
- `description`: Hamster description
- `image`: Image URL
- `available`: Availability count

### Purchases Table
- `id`: Primary key
- `userId`: Foreign key to users
- `nftId`: Foreign key to nfts
- `amount`: Purchase amount
- `transactionId`: Fake transaction ID
- `createdAt`: Purchase timestamp

## 🎨 Design Philosophy

The application intentionally uses:
- **Comic Sans font** for maximum cheese factor
- **Neon color gradients** and rainbow backgrounds
- **Blinking text** and spinning animations
- **Marquee scrolling banners** (because it's the 90s!)
- **Over-the-top marketing copy** with crypto buzzwords
- **Deliberately tacky aesthetics** while maintaining functionality

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - Create new user account
- `POST /api/login` - User login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - User logout

### Gallery & Purchases
- `POST /api/unlock` - Unlock gallery access (fake payment)
- `GET /api/nfts` - Get NFT collection (requires payment)
- `POST /api/purchase` - Purchase NFT (fake transaction)
- `GET /api/walletBalance` - Get fake crypto wallet balance

### Admin (Admin Only)
- `GET /api/stats` - Get platform statistics
- `POST /api/nfts` - Add new NFT to collection

### Utility
- `GET /api/health` - Health check endpoint

## 🎭 Parody Elements

This project includes numerous satirical elements:
- **Fake cryptocurrency balances** (BitConnect, SafeMoon, etc.)
- **Ridiculous NFT prices** (50 BTC for a hamster!)
- **Over-the-top marketing language** ("HODL to the moon!")
- **Absurd VIP offerings** ($10K golden plushie)
- **Intentionally bad web design** (90s throwback)
- **Mock testimonials** from "crypto millionaires"
- **Fake progress bars** and visitor counters

## ⚠️ Important Disclaimers

- **No real money involved**: All transactions are fake
- **No actual NFTs**: Images are just placeholders
- **Parody website**: Created for entertainment and education
- **Not financial advice**: Just hamster advice! 🐹
- **No real blockchain**: Uses SQLite database instead

## 🚀 Deployment

The application is designed to be deployment-ready:

**Frontend**: Can be deployed to Netlify, Vercel, or similar
**Backend**: Can be deployed to Heroku, Railway, or similar
**Database**: SQLite file can be easily migrated to PostgreSQL for production

## 🤝 Contributing

This is a parody project, but contributions are welcome! Feel free to:
- Add more ridiculous hamster NFTs
- Improve the intentionally bad design
- Add more crypto parody elements
- Fix any actual bugs (while keeping the fake ones for humor)

## 📄 License

MIT License - Feel free to use this for educational purposes or to create your own crypto parodies!

## 👨‍💻 Created By

**blureh** - Making the internet a more ridiculous place, one hamster at a time! 🐹

---

*Remember: This is all fake! Don't actually spend $10,000 on a digital hamster plushie! 😄*