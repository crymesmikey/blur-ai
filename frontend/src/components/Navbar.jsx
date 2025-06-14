import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ user, logout }) => {
  return (
    <nav style={{
      background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
      padding: '10px 0',
      borderBottom: '3px solid #fff',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          🐹 CryptoHamsterNFTz.biz 🚀
        </Link>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/vip" style={{
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            💎 VIP TIER 💎
          </Link>
          
          {user ? (
            <>
              <Link to="/gallery" style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}>
                🖼️ Gallery
              </Link>
              {user.isAdmin && (
                <Link to="/admin" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}>
                  ⚙️ Admin
                </Link>
              )}
              <span style={{ color: '#fff', fontWeight: 'bold' }}>
                Welcome, {user.email}!
              </span>
              <button 
                onClick={logout}
                style={{
                  background: '#ff4444',
                  color: '#fff',
                  border: '2px solid #fff',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontFamily: 'Comic Neue, cursive'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}>
                Login
              </Link>
              <Link to="/register" style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar