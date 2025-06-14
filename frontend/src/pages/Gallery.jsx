import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Gallery = ({ user }) => {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(null)
  const [walletBalance, setWalletBalance] = useState(null)

  useEffect(() => {
    fetchNFTs()
    fetchWalletBalance()
  }, [])

  const fetchNFTs = async () => {
    try {
      const response = await axios.get('/api/nfts')
      setNfts(response.data)
    } catch (error) {
      console.error('Error fetching NFTs:', error)
      if (error.response?.status === 402) {
        // User hasn't paid, redirect to paywall
        window.location.href = '/paywall'
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchWalletBalance = async () => {
    try {
      const response = await axios.get('/api/walletBalance')
      setWalletBalance(response.data)
    } catch (error) {
      console.error('Error fetching wallet balance:', error)
    }
  }

  const handlePurchase = async (nft) => {
    setPurchasing(nft.id)
    
    try {
      // Simulate transaction processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const response = await axios.post('/api/purchase', {
        nftId: nft.id,
        amount: nft.price
      })
      
      // Show success message
      alert(`🎉 ${response.data.message}\n\nTransaction ID: ${response.data.transactionId}\n\n${response.data.note}`)
      
    } catch (error) {
      console.error('Purchase error:', error)
      alert('Purchase failed! Your hamster escaped! 🐹💨')
    } finally {
      setPurchasing(null)
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
        <div className="spin" style={{ marginRight: '15px' }}>🐹</div>
        Loading your exclusive hamster collection...
      </div>
    )
  }

  return (
    <div className="container" style={{ color: '#fff' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <marquee style={{
          background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
          color: '#fff',
          padding: '10px',
          fontSize: '18px',
          fontWeight: 'bold',
          border: '3px solid #fff',
          marginBottom: '20px'
        }}>
          🎉 WELCOME TO THE EXCLUSIVE HAMSTER NFT GALLERY! YOU ARE NOW A CERTIFIED DIAMOND HANDS HODLER! 🎉
        </marquee>
        
        <h1 style={{ 
          fontSize: '42px', 
          margin: '0 0 20px 0',
          textShadow: '3px 3px 6px rgba(255, 0, 255, 0.7)',
          color: '#fff'
        }}>
          🐹 PREMIUM HAMSTER COLLECTION 🐹
        </h1>
        
        <p style={{ fontSize: '20px', margin: '0 0 20px 0' }}>
          <span className="blink">💎 Each hamster is 100% unique and totally not a scam! 💎</span>
        </p>
      </div>

      {/* Wallet Balance Display */}
      {walletBalance && (
        <div className="card" style={{ 
          background: 'rgba(0, 255, 0, 0.9)',
          color: '#000',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: '0 0 15px 0', fontSize: '24px' }}>
            💰 Your Crypto Wallet 💰
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '15px' 
          }}>
            {walletBalance.balances.map((balance, index) => (
              <div key={index} style={{
                background: '#fff',
                padding: '15px',
                borderRadius: '10px',
                border: '2px solid #ff00ff'
              }}>
                <strong>{balance.currency}</strong>
                <br />
                <span style={{ fontSize: '18px', color: '#ff00ff' }}>
                  {balance.balance.toLocaleString()} {balance.symbol}
                </span>
              </div>
            ))}
          </div>
          <p style={{ margin: '15px 0 0 0', fontSize: '16px', fontWeight: 'bold' }}>
            Total Portfolio Value: {walletBalance.totalValue}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', fontStyle: 'italic' }}>
            {walletBalance.note}
          </p>
        </div>
      )}

      {/* NFT Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '25px',
        marginBottom: '40px'
      }}>
        {nfts.map((nft) => (
          <div key={nft.id} className="card" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#333',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <div style={{ textAlign: 'center' }}>
              <img 
                src={nft.image} 
                alt={nft.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  border: '3px solid #ff00ff',
                  marginBottom: '15px'
                }}
              />
              
              <h3 style={{ 
                color: '#ff00ff', 
                fontSize: '20px',
                margin: '0 0 10px 0',
                textShadow: '1px 1px 2px rgba(255, 0, 255, 0.3)'
              }}>
                {nft.name}
              </h3>
              
              <div style={{
                background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
                color: '#fff',
                padding: '8px',
                borderRadius: '5px',
                margin: '10px 0',
                fontWeight: 'bold'
              }}>
                {nft.rarity}
              </div>
              
              <p style={{ 
                fontSize: '14px', 
                margin: '10px 0',
                lineHeight: '1.4'
              }}>
                {nft.description}
              </p>
              
              <div style={{
                background: '#ffff00',
                color: '#000',
                padding: '10px',
                borderRadius: '5px',
                margin: '15px 0',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                💰 Price: {nft.price}
              </div>
              
              <button
                onClick={() => handlePurchase(nft)}
                disabled={purchasing === nft.id}
                className="btn"
                style={{
                  width: '100%',
                  fontSize: '16px',
                  padding: '12px',
                  background: purchasing === nft.id ? '#ccc' : 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                  cursor: purchasing === nft.id ? 'not-allowed' : 'pointer'
                }}
              >
                {purchasing === nft.id ? (
                  <>
                    <span className="spin" style={{ display: 'inline-block', marginRight: '8px' }}>🐹</span>
                    Processing...
                  </>
                ) : (
                  '🛒 BUY NOW & HODL FOREVER 🛒'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer message */}
      <div className="card" style={{ 
        background: 'rgba(255, 255, 0, 0.9)',
        color: '#000',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 15px 0' }}>
          🎉 Congratulations, Diamond Hands! 🎉
        </h2>
        <p style={{ fontSize: '16px', margin: '10px 0' }}>
          You now have access to the most exclusive collection of digital hamsters in the metaverse!
          Each purchase is recorded on our totally-real blockchain* for maximum authenticity!
        </p>
        <p style={{ fontSize: '12px', fontStyle: 'italic', margin: '10px 0 0 0' }}>
          *Not actually a blockchain, just a SQLite database, but who's counting? 🤷‍♂️
        </p>
      </div>
    </div>
  )
}

export default Gallery