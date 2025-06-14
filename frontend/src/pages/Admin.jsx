import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Admin = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newNFT, setNewNFT] = useState({
    name: '',
    rarity: '',
    price: '',
    description: '',
    image: ''
  })
  const [addingNFT, setAddingNFT] = useState(false)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/stats')
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setNewNFT({
      ...newNFT,
      [e.target.name]: e.target.value
    })
  }

  const handleAddNFT = async (e) => {
    e.preventDefault()
    setAddingNFT(true)

    try {
      const response = await axios.post('/api/nfts', newNFT)
      alert(`✅ ${response.data.message}`)
      
      // Reset form
      setNewNFT({
        name: '',
        rarity: '',
        price: '',
        description: '',
        image: ''
      })
      
      // Refresh stats
      fetchStats()
      
    } catch (error) {
      console.error('Error adding NFT:', error)
      alert('❌ Failed to add NFT!')
    } finally {
      setAddingNFT(false)
    }
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#fff'
      }}>
        <div className="spin" style={{ marginRight: '15px' }}>⚙️</div>
        Loading admin dashboard...
      </div>
    )
  }

  return (
    <div className="container" style={{ color: '#fff' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '42px', 
          margin: '0 0 20px 0',
          textShadow: '3px 3px 6px rgba(255, 0, 255, 0.7)',
          color: '#fff'
        }}>
          ⚙️ ADMIN CONTROL PANEL ⚙️
        </h1>
        <p style={{ fontSize: '18px' }}>
          <span className="blink">🔧 Manage your hamster empire from here! 🔧</span>
        </p>
      </div>

      {/* Stats Dashboard */}
      {stats && (
        <div className="card" style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          color: '#333',
          marginBottom: '30px'
        }}>
          <h2 style={{ 
            color: '#ff00ff', 
            fontSize: '28px',
            margin: '0 0 20px 0',
            textAlign: 'center'
          }}>
            📊 HAMSTER EMPIRE STATS 📊
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              color: '#fff',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              border: '3px solid #fff'
            }}>
              <div style={{ fontSize: '36px', margin: '0 0 10px 0' }}>👥</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {stats.totalUsers}
              </div>
              <div>Total Users</div>
            </div>
            
            <div style={{
              background: 'linear-gradient(45deg, #ffd700, #ffff00)',
              color: '#000',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              border: '3px solid #fff'
            }}>
              <div style={{ fontSize: '36px', margin: '0 0 10px 0' }}>💎</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {stats.paidUsers}
              </div>
              <div>Premium Users</div>
            </div>
            
            <div style={{
              background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
              color: '#fff',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              border: '3px solid #fff'
            }}>
              <div style={{ fontSize: '36px', margin: '0 0 10px 0' }}>🛒</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {stats.totalPurchases}
              </div>
              <div>Total Purchases</div>
            </div>
            
            <div style={{
              background: 'linear-gradient(45deg, #00ff00, #32cd32)',
              color: '#000',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              border: '3px solid #fff'
            }}>
              <div style={{ fontSize: '36px', margin: '0 0 10px 0' }}>💰</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {stats.totalRevenue}
              </div>
              <div>Fake Revenue</div>
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center',
            padding: '15px',
            background: 'rgba(255, 255, 0, 0.2)',
            borderRadius: '10px',
            border: '2px dashed #ff00ff'
          }}>
            <p style={{ margin: '5px 0', fontSize: '16px' }}>
              <strong>Conversion Rate:</strong> {stats.conversionRate}
            </p>
            <p style={{ margin: '10px 0 0 0', fontSize: '14px', fontStyle: 'italic' }}>
              {stats.note}
            </p>
          </div>
        </div>
      )}

      {/* Add New NFT Form */}
      <div className="card" style={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#333'
      }}>
        <h2 style={{ 
          color: '#ff00ff', 
          fontSize: '28px',
          margin: '0 0 20px 0',
          textAlign: 'center'
        }}>
          ➕ ADD NEW HAMSTER NFT ➕
        </h2>
        
        <form onSubmit={handleAddNFT}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div className="form-group">
              <label style={{ color: '#ff00ff', fontWeight: 'bold' }}>
                🐹 Hamster Name:
              </label>
              <input
                type="text"
                name="name"
                value={newNFT.name}
                onChange={handleInputChange}
                required
                placeholder="e.g., Super Crypto Hamster"
                style={{
                  border: '3px solid #ff00ff',
                  borderRadius: '10px',
                  padding: '12px'
                }}
              />
            </div>
            
            <div className="form-group">
              <label style={{ color: '#ff00ff', fontWeight: 'bold' }}>
                💎 Rarity:
              </label>
              <input
                type="text"
                name="rarity"
                value={newNFT.rarity}
                onChange={handleInputChange}
                required
                placeholder="e.g., 🔥 Ultra-Rare Fire Paws"
                style={{
                  border: '3px solid #ff00ff',
                  borderRadius: '10px',
                  padding: '12px'
                }}
              />
            </div>
            
            <div className="form-group">
              <label style={{ color: '#ff00ff', fontWeight: 'bold' }}>
                💰 Price:
              </label>
              <input
                type="text"
                name="price"
                value={newNFT.price}
                onChange={handleInputChange}
                required
                placeholder="e.g., 100,000 DOGE"
                style={{
                  border: '3px solid #ff00ff',
                  borderRadius: '10px',
                  padding: '12px'
                }}
              />
            </div>
            
            <div className="form-group">
              <label style={{ color: '#ff00ff', fontWeight: 'bold' }}>
                🖼️ Image URL:
              </label>
              <input
                type="url"
                name="image"
                value={newNFT.image}
                onChange={handleInputChange}
                placeholder="https://example.com/hamster.jpg (optional)"
                style={{
                  border: '3px solid #ff00ff',
                  borderRadius: '10px',
                  padding: '12px'
                }}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label style={{ color: '#ff00ff', fontWeight: 'bold' }}>
              📝 Description:
            </label>
            <textarea
              name="description"
              value={newNFT.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Describe this amazing hamster's special powers..."
              style={{
                border: '3px solid #ff00ff',
                borderRadius: '10px',
                padding: '12px',
                width: '100%',
                resize: 'vertical',
                fontFamily: 'Comic Neue, cursive'
              }}
            />
          </div>
          
          <button 
            type="submit"
            disabled={addingNFT}
            className="btn"
            style={{
              width: '100%',
              fontSize: '20px',
              padding: '15px',
              background: addingNFT ? '#ccc' : 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              cursor: addingNFT ? 'not-allowed' : 'pointer'
            }}
          >
            {addingNFT ? (
              <>
                <span className="spin" style={{ display: 'inline-block', marginRight: '10px' }}>🐹</span>
                Adding Hamster...
              </>
            ) : (
              '🚀 ADD HAMSTER TO COLLECTION 🚀'
            )}
          </button>
        </form>
        
        <div style={{
          background: 'rgba(255, 255, 0, 0.2)',
          padding: '15px',
          borderRadius: '10px',
          border: '2px dashed #ff00ff',
          marginTop: '20px',
          fontSize: '14px'
        }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
            💡 <strong>Pro Tips:</strong>
          </p>
          <p style={{ margin: '5px 0' }}>
            • Use emojis in rarity for extra flair (💎🔥⭐✨🌈)
          </p>
          <p style={{ margin: '5px 0' }}>
            • Make prices ridiculous for maximum comedy
          </p>
          <p style={{ margin: '5px 0' }}>
            • If no image URL provided, default hamster image will be used
          </p>
          <p style={{ margin: '5px 0' }}>
            • Remember: This is all fake and for parody purposes! 🎭
          </p>
        </div>
      </div>
    </div>
  )
}

export default Admin