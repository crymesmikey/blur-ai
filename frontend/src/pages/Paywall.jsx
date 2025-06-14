import React, { useState } from 'react'
import axios from 'axios'

const Paywall = ({ user, setUser }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const response = await axios.post('/api/unlock')
      
      // Update user state
      setUser({ ...user, hasPaid: true })
      setSuccess(true)
      
      // Redirect to gallery after success message
      setTimeout(() => {
        window.location.href = '/gallery'
      }, 3000)
      
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed! Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container" style={{ textAlign: 'center', color: '#fff' }}>
        <div className="card" style={{ 
          background: 'rgba(0, 255, 0, 0.9)',
          color: '#000',
          maxWidth: '600px',
          margin: '50px auto'
        }}>
          <div className="spin" style={{ 
            fontSize: '100px', 
            marginBottom: '20px',
            display: 'inline-block'
          }}>
            🎉
          </div>
          <h1 style={{ fontSize: '36px', margin: '0 0 20px 0' }}>
            PAYMENT SUCCESSFUL! 🚀
          </h1>
          <p style={{ fontSize: '20px', margin: '20px 0' }}>
            Welcome to the exclusive Hamster NFT Gallery! 
            You are now a certified Crypto Hamster Hodler! 💎
          </p>
          <p style={{ fontSize: '16px', fontStyle: 'italic' }}>
            Redirecting to your hamster collection in 3 seconds...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ textAlign: 'center', color: '#fff' }}>
      {/* Animated banner */}
      <marquee style={{
        background: '#ff00ff',
        color: '#fff',
        padding: '10px',
        fontSize: '18px',
        fontWeight: 'bold',
        border: '3px solid #fff',
        marginBottom: '20px'
      }}>
        🔒 EXCLUSIVE ACCESS REQUIRED! UNLOCK THE SACRED HAMSTER VAULT! 🔒
      </marquee>

      <div className="card" style={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#333',
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        <div className="spin" style={{ 
          fontSize: '80px', 
          marginBottom: '20px',
          display: 'inline-block'
        }}>
          🐹
        </div>
        
        <h1 style={{ 
          color: '#ff00ff', 
          fontSize: '36px',
          textShadow: '2px 2px 4px rgba(255, 0, 255, 0.5)',
          margin: '0 0 20px 0'
        }}>
          🔐 PREMIUM HAMSTER ACCESS 🔐
        </h1>
        
        <div style={{
          background: '#ffff00',
          color: '#000',
          padding: '20px',
          border: '3px dashed #ff00ff',
          margin: '20px 0',
          borderRadius: '10px'
        }}>
          <h2 style={{ margin: '0 0 15px 0', fontSize: '24px' }}>
            <span className="blink">⚡ EXCLUSIVE OFFER ⚡</span>
          </h2>
          <p style={{ fontSize: '18px', margin: '10px 0' }}>
            Only <strong>TRUE HAMSTER HODLERS</strong> can enter the sacred NFT collection!
          </p>
          <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '15px 0' }}>
            💰 Unlock Price: <span style={{ color: '#ff00ff' }}>0.1 FakeCoin</span> 💰
          </p>
        </div>

        <div style={{ margin: '30px 0' }}>
          <h3 style={{ color: '#ff00ff', fontSize: '24px' }}>
            What You Get:
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '15px',
            margin: '20px 0'
          }}>
            <div style={{ 
              background: 'rgba(255, 0, 255, 0.1)', 
              padding: '15px', 
              borderRadius: '10px',
              border: '2px solid #ff00ff'
            }}>
              <div style={{ fontSize: '30px', margin: '0 0 10px 0' }}>🖼️</div>
              <strong>Exclusive Gallery</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                Access to 12+ ultra-rare hamster NFTs!
              </p>
            </div>
            
            <div style={{ 
              background: 'rgba(0, 255, 255, 0.1)', 
              padding: '15px', 
              borderRadius: '10px',
              border: '2px solid #00ffff'
            }}>
              <div style={{ fontSize: '30px', margin: '0 0 10px 0' }}>💎</div>
              <strong>Diamond Status</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                Become a certified Diamond Hands Hodler!
              </p>
            </div>
            
            <div style={{ 
              background: 'rgba(255, 255, 0, 0.1)', 
              padding: '15px', 
              borderRadius: '10px',
              border: '2px solid #ffff00'
            }}>
              <div style={{ fontSize: '30px', margin: '0 0 10px 0' }}>🚀</div>
              <strong>Moon Access</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                Direct ticket to the hamster moon!
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={handlePayment}
          disabled={loading}
          className="btn"
          style={{
            fontSize: '24px',
            padding: '20px 40px',
            margin: '20px 0',
            background: loading ? '#ccc' : 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%',
            maxWidth: '400px'
          }}
        >
          {loading ? (
            <>
              <span className="spin" style={{ display: 'inline-block', marginRight: '10px' }}>🐹</span>
              Processing Payment...
            </>
          ) : (
            '💳 PAY NOW & UNLOCK GALLERY 💳'
          )}
        </button>

        <div style={{
          background: 'rgba(0, 0, 0, 0.1)',
          padding: '15px',
          borderRadius: '10px',
          margin: '20px 0',
          fontSize: '14px'
        }}>
          <p style={{ margin: '0 0 10px 0' }}>
            <strong>💡 Payment Details:</strong>
          </p>
          <p style={{ margin: '5px 0' }}>
            • 100% secure fake payment processing
          </p>
          <p style={{ margin: '5px 0' }}>
            • No real money will be charged (this is parody!)
          </p>
          <p style={{ margin: '5px 0' }}>
            • Instant access to hamster collection
          </p>
          <p style={{ margin: '5px 0' }}>
            • Lifetime membership to the Hamster Metaverse*
          </p>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', fontStyle: 'italic' }}>
            *Metaverse not actually real, but your hamsters are definitely fake!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Paywall