import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/login', formData)
      setUser(response.data.user)
      // Navigation will be handled by App.jsx redirect
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '80vh'
    }}>
      <div className="card" style={{ 
        maxWidth: '500px', 
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div className="spin" style={{ 
            fontSize: '60px', 
            marginBottom: '20px',
            display: 'inline-block'
          }}>
            🐹
          </div>
          <h1 style={{ 
            color: '#ff00ff', 
            fontSize: '32px',
            textShadow: '2px 2px 4px rgba(255, 0, 255, 0.5)',
            margin: '0 0 10px 0'
          }}>
            Welcome Back, Hamster Hodler!
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#333',
            margin: '0'
          }}>
            <span className="blink">🚀 Log in to access your crypto hamsters! 🚀</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" style={{ 
              color: '#ff00ff', 
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              📧 Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@hamsterhodler.com"
              style={{
                border: '3px solid #ff00ff',
                borderRadius: '10px',
                padding: '15px',
                fontSize: '16px',
                background: 'rgba(255, 255, 255, 0.9)'
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" style={{ 
              color: '#ff00ff', 
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              🔐 Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="super-secret-hamster-password"
              style={{
                border: '3px solid #ff00ff',
                borderRadius: '10px',
                padding: '15px',
                fontSize: '16px',
                background: 'rgba(255, 255, 255, 0.9)'
              }}
            />
          </div>

          {error && (
            <div className="error" style={{
              background: '#ff4444',
              color: '#fff',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              ❌ {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn"
            disabled={loading}
            style={{
              width: '100%',
              fontSize: '20px',
              padding: '15px',
              marginBottom: '20px',
              background: loading ? '#ccc' : 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <>
                <span className="spin" style={{ display: 'inline-block', marginRight: '10px' }}>🐹</span>
                Logging in...
              </>
            ) : (
              '🚀 ENTER THE HAMSTER DIMENSION 🚀'
            )}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center',
          padding: '20px 0',
          borderTop: '2px dashed #ff00ff',
          marginTop: '20px'
        }}>
          <p style={{ margin: '0 0 15px 0', fontSize: '16px' }}>
            Don't have a hamster account yet?
          </p>
          <Link to="/register">
            <button className="btn" style={{
              background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
              fontSize: '18px',
              padding: '12px 25px'
            }}>
              💎 Create Hamster Account 💎
            </button>
          </Link>
        </div>

        <div style={{
          background: '#ffff00',
          color: '#000',
          padding: '15px',
          borderRadius: '10px',
          border: '3px dashed #ff00ff',
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <p style={{ 
            margin: '0', 
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            🎭 <strong>PARODY ALERT:</strong> This is a satirical website! 
            No real crypto or hamsters involved! 🎭
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login