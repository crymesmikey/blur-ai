import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Paywall from './pages/Paywall'
import Gallery from './pages/Gallery'
import VIP from './pages/VIP'
import Admin from './pages/Admin'

// Set up axios defaults
axios.defaults.withCredentials = true

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/auth/me')
      setUser(response.data.user)
    } catch (error) {
      // User not logged in, that's fine
      console.log('Not authenticated')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout')
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#fff'
      }}>
        <div className="spin">🐹</div> Loading your hamsters...
      </div>
    )
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/gallery" /> : <Login setUser={setUser} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/gallery" /> : <Register setUser={setUser} />} 
          />
          <Route 
            path="/paywall" 
            element={user ? <Paywall user={user} setUser={setUser} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/gallery" 
            element={user ? <Gallery user={user} /> : <Navigate to="/login" />} 
          />
          <Route path="/vip" element={<VIP />} />
          <Route 
            path="/admin" 
            element={user?.isAdmin ? <Admin /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App