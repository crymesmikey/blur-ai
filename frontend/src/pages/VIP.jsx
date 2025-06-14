import React, { useState } from 'react'

const VIP = () => {
  const [progress, setProgress] = useState(70) // 70% funded
  const [purchased, setPurchased] = useState(false)

  const handleVIPPurchase = () => {
    // Simulate purchase
    setPurchased(true)
    setProgress(Math.min(progress + 10, 100))
    
    setTimeout(() => {
      alert(`🎉 CONGRATULATIONS! 🎉\n\nYou are now a VIP Hamster Mogul!\n\nYour Golden Hamster Plushie will be delivered to the metaverse within 3-5 business days*\n\n*Delivery not actually real, but the feeling of being scammed is! 💸`)
    }, 1000)
  }

  return (
    <div className="container" style={{ textAlign: 'center', color: '#fff' }}>
      {/* Animated header */}
      <marquee style={{
        background: 'linear-gradient(90deg, #ffd700, #ffff00)',
        color: '#000',
        padding: '15px',
        fontSize: '20px',
        fontWeight: 'bold',
        border: '3px solid #fff',
        marginBottom: '30px'
      }}>
        ✨ ULTRA-EXCLUSIVE VIP TIER NOW AVAILABLE! BECOME A HAMSTER MOGUL TODAY! ✨
      </marquee>

      <div className="card" style={{ 
        background: 'linear-gradient(45deg, #ffd700, #ffff00)',
        color: '#000',
        maxWidth: '800px',
        margin: '0 auto',
        border: '5px solid #fff',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)'
      }}>
        <div className="spin" style={{ 
          fontSize: '120px', 
          marginBottom: '20px',
          display: 'inline-block',
          filter: 'drop-shadow(0 0 20px #ffd700)'
        }}>
          🐹
        </div>
        
        <h1 style={{ 
          fontSize: '48px',
          margin: '0 0 20px 0',
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
          background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          💎 VIP HAMSTER MOGUL TIER 💎
        </h1>
        
        <div style={{
          background: '#ff00ff',
          color: '#fff',
          padding: '20px',
          borderRadius: '15px',
          margin: '30px 0',
          border: '3px solid #fff'
        }}>
          <h2 style={{ margin: '0 0 15px 0', fontSize: '32px' }}>
            <span className="blink">🏆 GOLDEN HAMSTER PLUSHIE 🏆</span>
          </h2>
          <p style={{ fontSize: '20px', margin: '15px 0' }}>
            The ultimate status symbol for true hamster connoisseurs!
          </p>
          <div style={{ 
            fontSize: '36px', 
            fontWeight: 'bold',
            margin: '20px 0',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            💰 PRICE: $10,000 💰
          </div>
          <p style={{ fontSize: '16px', fontStyle: 'italic' }}>
            (Because why not? It's made of pure digital gold!)
          </p>
        </div>

        {/* Features list */}
        <div style={{ margin: '30px 0' }}>
          <h3 style={{ fontSize: '28px', margin: '0 0 20px 0' }}>
            🌟 EXCLUSIVE VIP BENEFITS 🌟
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            margin: '20px 0'
          }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.9)', 
              padding: '20px', 
              borderRadius: '15px',
              border: '3px solid #ff00ff'
            }}>
              <div style={{ fontSize: '40px', margin: '0 0 10px 0' }}>🧸</div>
              <strong>Golden Plushie</strong>
              <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>
                A totally real* golden hamster plushie delivered to your metaverse address!
              </p>
            </div>
            
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.9)', 
              padding: '20px', 
              borderRadius: '15px',
              border: '3px solid #00ffff'
            }}>
              <div style={{ fontSize: '40px', margin: '0 0 10px 0' }}>👑</div>
              <strong>Mogul Status</strong>
              <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>
                Your name in golden letters on our Hall of Fame!
              </p>
            </div>
            
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.9)', 
              padding: '20px', 
              borderRadius: '15px',
              border: '3px solid #ffff00'
            }}>
              <div style={{ fontSize: '40px', margin: '0 0 10px 0' }}>🚁</div>
              <strong>Private Jet Access</strong>
              <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>
                Exclusive access to our hamster private jet in the metaverse!
              </p>
            </div>
            
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.9)', 
              padding: '20px', 
              borderRadius: '15px',
              border: '3px solid #ff6b6b'
            }}>
              <div style={{ fontSize: '40px', margin: '0 0 10px 0' }}>🏝️</div>
              <strong>Private Island</strong>
              <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>
                Your own hamster island in the digital Caribbean!
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ margin: '30px 0' }}>
          <h3 style={{ fontSize: '24px', margin: '0 0 15px 0' }}>
            📊 FUNDING PROGRESS 📊
          </h3>
          
          <div style={{
            background: '#fff',
            border: '3px solid #ff00ff',
            borderRadius: '25px',
            padding: '5px',
            margin: '15px 0'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
              height: '30px',
              width: `${progress}%`,
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 'bold',
              transition: 'width 0.5s ease'
            }}>
              {progress}%
            </div>
          </div>
          
          <p style={{ fontSize: '18px', margin: '10px 0' }}>
            <strong>${(progress * 100).toLocaleString()} of $10,000 raised</strong>
          </p>
          <p style={{ fontSize: '16px', margin: '5px 0' }}>
            {Math.floor(progress / 10)}/10 VIP Plushies sold
          </p>
          <p style={{ fontSize: '14px', fontStyle: 'italic' }}>
            Only {10 - Math.floor(progress / 10)} golden plushies remaining!
          </p>
        </div>

        {/* Purchase button */}
        {!purchased ? (
          <button 
            onClick={handleVIPPurchase}
            className="btn"
            style={{
              fontSize: '28px',
              padding: '25px 50px',
              margin: '30px 0',
              background: 'linear-gradient(45deg, #ffd700, #ffff00)',
              color: '#000',
              border: '5px solid #fff',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}
          >
            💳 BUY VIP PLUSHIE NOW - $10K 💳
          </button>
        ) : (
          <div style={{
            background: '#00ff00',
            color: '#000',
            padding: '20px',
            borderRadius: '15px',
            margin: '30px 0',
            border: '3px solid #fff',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            🎉 CONGRATULATIONS! YOU ARE NOW A VIP HAMSTER MOGUL! 🎉
          </div>
        )}

        {/* Disclaimer */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          color: '#000',
          padding: '20px',
          borderRadius: '15px',
          margin: '30px 0',
          border: '3px dashed #ff00ff'
        }}>
          <p style={{ 
            margin: '0 0 10px 0', 
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            🎭 <strong>PARODY DISCLAIMER:</strong>
          </p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            • No real plushies will be delivered
          </p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            • No real money will be charged
          </p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            • This is a satirical website making fun of overpriced NFT projects
          </p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            • The metaverse doesn't actually exist (yet)
          </p>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', fontStyle: 'italic' }}>
            *But the feeling of being a VIP is totally real! 😄
          </p>
        </div>
      </div>
    </div>
  )
}

export default VIP