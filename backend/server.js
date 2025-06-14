import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sqlite3 from 'sqlite3'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'hamster-secret-key-totally-secure'

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Initialize SQLite database
const db = new sqlite3.Database('hamsters.db')

// Create tables if they don't exist
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    hasPaid BOOLEAN DEFAULT FALSE,
    isAdmin BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // NFTs table with pre-populated hamsters
  db.run(`CREATE TABLE IF NOT EXISTS nfts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    rarity TEXT NOT NULL,
    price TEXT NOT NULL,
    description TEXT,
    available INTEGER DEFAULT 1
  )`)

  // Purchases table
  db.run(`CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    nftId INTEGER,
    amount TEXT,
    transactionId TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (nftId) REFERENCES nfts (id)
  )`)

  // Pre-populate NFTs if table is empty
  db.get("SELECT COUNT(*) as count FROM nfts", (err, row) => {
    if (row.count === 0) {
      const hamsters = [
        { name: "Hamster McCryptoFace", rarity: "💎 Ultra-Rare Diamond Paws", price: "50,000 DOGE", description: "The OG crypto hamster with diamond-encrusted paws!" },
        { name: "Laser-Eyes Hamster", rarity: "🔥 Legendary Laser Vision", price: "0.5 ETH", description: "Can see through FUD with laser precision!" },
        { name: "Moon Hammy #5", rarity: "🚀 Rare Moon Walker", price: "100,000 SHIB", description: "First hamster to HODL on the moon!" },
        { name: "Golden Wheel Runner", rarity: "⭐ Epic Golden Fur", price: "25 BTC", description: "Runs so fast, it generates electricity!" },
        { name: "Neon Glow Hamster", rarity: "✨ Mythic Neon Aura", price: "1,000,000 DOGE", description: "Glows in the dark with pure crypto energy!" },
        { name: "Cyber Punk Hammy", rarity: "🤖 Rare Cybernetic", price: "0.25 ETH", description: "Half hamster, half machine, all HODL!" },
        { name: "Rainbow Fur Hamster", rarity: "🌈 Epic Rainbow Coat", price: "75,000 ADA", description: "Every color represents a different crypto!" },
        { name: "Tiny Titan Hamster", rarity: "💪 Legendary Strength", price: "500 SOL", description: "Small but mighty, can lift entire blockchains!" },
        { name: "Wizard Hat Hammy", rarity: "🧙 Mythic Magic Powers", price: "10 ETH", description: "Can predict market crashes with 99% accuracy!" },
        { name: "Sunglasses Cool Hamster", rarity: "😎 Ultra-Cool Vibes", price: "200,000 MATIC", description: "Too cool for bear markets!" },
        { name: "Rocket Booster Hamster", rarity: "🚀 Epic Propulsion", price: "1,500 AVAX", description: "Personal rocket for moon missions!" },
        { name: "Diamond Hands Hammy", rarity: "💎 Legendary Diamond Hands", price: "50 ETH", description: "Never sells, only HODLs forever!" }
      ]

      const stmt = db.prepare("INSERT INTO nfts (name, rarity, price, description, image) VALUES (?, ?, ?, ?, ?)")
      hamsters.forEach((hamster, index) => {
        stmt.run(hamster.name, hamster.rarity, hamster.price, hamster.description, `https://images.pexels.com/photos/33235/hamster-rodent-pet.jpg?auto=compress&cs=tinysrgb&w=400`)
      })
      stmt.finalize()
    }
  })
})

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' })
  }
}

// Check if user has paid (for gallery access)
const requirePayment = (req, res, next) => {
  if (!req.user.hasPaid) {
    return res.status(402).json({ error: 'Payment required. Please unlock the gallery first.' })
  }
  next()
}

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required.' })
  }
  next()
}

// Routes

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' })
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Check if this is the first user (make them admin)
    db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
      const isFirstUser = row.count === 0

      // Insert user
      db.run(
        "INSERT INTO users (email, password, isAdmin) VALUES (?, ?, ?)",
        [email, hashedPassword, isFirstUser],
        function(err) {
          if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
              return res.status(400).json({ error: 'Email already exists' })
            }
            return res.status(500).json({ error: 'Database error' })
          }

          // Create JWT token
          const token = jwt.sign(
            { 
              id: this.lastID, 
              email, 
              hasPaid: false, 
              isAdmin: isFirstUser 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
          )

          // Set cookie
          res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
          })

          res.status(201).json({
            message: 'User created successfully',
            user: { id: this.lastID, email, hasPaid: false, isAdmin: isFirstUser }
          })
        }
      )
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Find user
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' })
      }

      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' })
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid credentials' })
      }

      // Create JWT token
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          hasPaid: user.hasPaid, 
          isAdmin: user.isAdmin 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      )

      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      })

      res.json({
        message: 'Login successful',
        user: { 
          id: user.id, 
          email: user.email, 
          hasPaid: user.hasPaid, 
          isAdmin: user.isAdmin 
        }
      })
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  // Get fresh user data from database
  db.get("SELECT id, email, hasPaid, isAdmin FROM users WHERE id = ?", [req.user.id], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json({ user })
  })
})

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
})

// Unlock gallery (simulate payment)
app.post('/api/unlock', authenticateToken, (req, res) => {
  db.run("UPDATE users SET hasPaid = TRUE WHERE id = ?", [req.user.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' })
    }
    
    res.json({ 
      success: true, 
      message: 'Access granted! Welcome to the exclusive Hamster NFT Gallery! 🐹💎' 
    })
  })
})

// Get NFTs (protected route)
app.get('/api/nfts', authenticateToken, requirePayment, (req, res) => {
  db.all("SELECT * FROM nfts", (err, nfts) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' })
    }
    res.json(nfts)
  })
})

// Purchase NFT
app.post('/api/purchase', authenticateToken, requirePayment, (req, res) => {
  const { nftId, amount } = req.body
  
  if (!nftId) {
    return res.status(400).json({ error: 'NFT ID is required' })
  }

  // Generate fake transaction ID
  const transactionId = `HAMSTER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  // Record the purchase
  db.run(
    "INSERT INTO purchases (userId, nftId, amount, transactionId) VALUES (?, ?, ?, ?)",
    [req.user.id, nftId, amount || 'PRICELESS', transactionId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' })
      }

      // Get NFT details for response
      db.get("SELECT name FROM nfts WHERE id = ?", [nftId], (err, nft) => {
        res.json({
          success: true,
          message: `Congratulations! You now own ${nft?.name || 'this amazing hamster'}! 🎉`,
          transactionId,
          note: "* Not really, but we'll pretend! This is totally fake money! 💸"
        })
      })
    }
  )
})

// Get fake crypto wallet balance
app.get('/api/walletBalance', (req, res) => {
  // Return ridiculous fake balances
  const balances = [
    { currency: 'BitConnect', symbol: 'BCC', balance: 1337420.69 },
    { currency: 'HamsterCoin', symbol: 'HAM', balance: 9999999.42 },
    { currency: 'SafeMoon', symbol: 'SAFEMOON', balance: 42069000 },
    { currency: 'DogeCoin', symbol: 'DOGE', balance: 1000000 }
  ]
  
  res.json({ 
    balances,
    totalValue: '$∞ (to the moon!)',
    note: 'These are totally real numbers from your definitely-not-fake wallet! 🚀'
  })
})

// Admin: Get stats
app.get('/api/stats', authenticateToken, requireAdmin, (req, res) => {
  // Get various stats
  const stats = {}
  
  // Total users
  db.get("SELECT COUNT(*) as count FROM users", (err, result) => {
    stats.totalUsers = result.count
    
    // Users who paid
    db.get("SELECT COUNT(*) as count FROM users WHERE hasPaid = TRUE", (err, result) => {
      stats.paidUsers = result.count
      
      // Total purchases
      db.get("SELECT COUNT(*) as count FROM purchases", (err, result) => {
        stats.totalPurchases = result.count
        
        // Fake revenue calculation
        stats.totalRevenue = '$' + (stats.totalPurchases * 1337.42).toLocaleString() + ' (monopoly money)'
        stats.conversionRate = stats.totalUsers > 0 ? ((stats.paidUsers / stats.totalUsers) * 100).toFixed(1) + '%' : '0%'
        
        res.json({
          ...stats,
          note: 'Remember: All revenue is fake! This is a parody site! 🎭'
        })
      })
    })
  })
})

// Admin: Add new NFT
app.post('/api/nfts', authenticateToken, requireAdmin, (req, res) => {
  const { name, rarity, price, description, image } = req.body
  
  if (!name || !rarity || !price) {
    return res.status(400).json({ error: 'Name, rarity, and price are required' })
  }

  db.run(
    "INSERT INTO nfts (name, rarity, price, description, image) VALUES (?, ?, ?, ?, ?)",
    [name, rarity, price, description || '', image || 'https://images.pexels.com/photos/33235/hamster-rodent-pet.jpg?auto=compress&cs=tinysrgb&w=400'],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' })
      }
      
      res.status(201).json({
        success: true,
        message: 'New hamster NFT added to the collection!',
        nftId: this.lastID
      })
    }
  )
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'CryptoHamsterNFTz.biz backend is running! 🐹',
    timestamp: new Date().toISOString()
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🐹 CryptoHamsterNFTz.biz backend running on port ${PORT}`)
  console.log(`💎 Ready to HODL some hamsters! 🚀`)
})