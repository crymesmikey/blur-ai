import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="container" style={{ textAlign: 'center', color: '#fff' }}>
      {/* Marquee banner - because it's the 90s! */}
      <marquee style={{
        background: '#ff00ff',
        color: '#fff',
        padding: '10px',
        fontSize: '18px',
        fontWeight: 'bold',
        border: '3px solid #fff',
        marginBottom: '20px'
      }}>
        🚀 WELCOME TO THE FUTURE OF HAMSTER OWNERSHIP! GET RICH QUICK WITH DIGITAL PETS! 🚀
      </marquee>

      {/* Main hero section */}
      <div className="card" style={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#333',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '48px',
          margin: '0 0 20px 0',
          textShadow: '3px 3px 6px rgba(255, 0, 255, 0.7)'
        }} className="neon">
          🐹 CryptoHamsterNFTz.biz 🐹
        </h1>
        
        <div style={{ fontSize: '24px', margin: '20px 0' }}>
          <span className="blink">💎 HODL YOUR HAMSTERS TO THE MOON! 💎</span>
        </div>
        
        <div className="spin" style={{ 
          fontSize: '100px', 
          margin: '20px 0',
          display: 'inline-block'
        }}>
          🐹
        </div>
        
        <h2 style={{ color: '#ff00ff', fontSize: '32px' }}>
          GET RICH WITH HAMSTER NFTs!
        </h2>
        
        <p style={{ fontSize: '20px', lineHeight: '1.6', margin: '20px 0' }}>
          Welcome to the <strong>ULTIMATE</strong> hamster investment opportunity! 
          Our exclusive collection of digital hamsters will make you a 
          <span style={{ color: '#ff00ff', fontWeight: 'bold' }}> CRYPTO MILLIONAIRE</span>! 
          Each hamster is 100% unique and stored on the blockchain* 
          <br />
          <small>*Not actually on any blockchain, but we'll pretend!</small>
        </p>
        
        <div style={{ 
          background: '#ffff00', 
          color: '#000', 
          padding: '15px', 
          border: '3px dashed #ff00ff',
          margin: '20px 0',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          🔥 LIMITED TIME OFFER: Only 10,000 hamsters available! 🔥
          <br />
          <span className="blink">ACT NOW BEFORE THEY'RE GONE FOREVER!</span>
        </div>
        
        <Link to="/register">
          <button className="btn" style={{ 
            fontSize: '24px',
            padding: '20px 40px',
            margin: '20px 10px'
          }}>
            🚀 ENTER THE HAMSTER METAVERSE 🚀
          </button>
        </Link>
        
        <Link to="/login">
          <button className="btn" style={{ 
            fontSize: '20px',
            padding: '15px 30px',
            margin: '20px 10px',
            background: 'linear-gradient(45deg, #4ecdc4, #44a08d)'
          }}>
            Login to Your Hamster Account
          </button>
        </Link>
      </div>

      {/* Features section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div className="card">
          <h3 style={{ color: '#ff00ff', fontSize: '24px' }}>💎 Ultra-Rare Hamsters</h3>
          <p>Each hamster has unique diamond paws, laser eyes, or moon boots! 
          Some are so rare, only 1 exists in the entire universe!</p>
        </div>
        
        <div className="card">
          <h3 style={{ color: '#00ffff', fontSize: '24px' }}>🚀 To The Moon!</h3>
          <p>Our hamsters are programmed to HODL and never sell! 
          Watch your investment grow as hamster prices skyrocket!</p>
        </div>
        
        <div className="card">
          <h3 style={{ color: '#ffff00', fontSize: '24px' }}>🎮 Metaverse Ready</h3>
          <p>Take your hamsters into the metaverse! They can run on digital wheels 
          and earn you passive income while you sleep!</p>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="card" style={{ background: 'rgba(0, 255, 255, 0.9)', color: '#000' }}>
        <h2 style={{ fontSize: '32px', margin: '0 0 20px 0' }}>
          🌟 WHAT OUR HAMSTER HODLERS SAY 🌟
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          <div style={{ 
            background: '#fff', 
            padding: '15px', 
            borderRadius: '10px',
            border: '2px solid #ff00ff'
          }}>
            <p>"I bought 1 hamster for $50 and now I'm a millionaire!"</p>
            <strong>- CryptoKing2023</strong>
          </div>
          
          <div style={{ 
            background: '#fff', 
            padding: '15px', 
            borderRadius: '10px',
            border: '2px solid #ff00ff'
          }}>
            <p>"My hamster NFT cured my depression and bought me a Lambo!"</p>
            <strong>- DiamondHands4Ever</strong>
          </div>
          
          <div style={{ 
            background: '#fff', 
            padding: '15px', 
            borderRadius: '10px',
            border: '2px solid #ff00ff'
          }}>
            <p>"I quit my job thanks to hamster passive income!"</p>
            <strong>- ToTheMoonGirl</strong>
          </div>
        </div>
      </div>

      {/* Footer with visitor counter */}
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '10px',
        border: '2px solid #fff'
      }}>
        <p style={{ margin: '10px 0' }}>
          <img src="https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif" 
               alt="Under Construction" 
               style={{ width: '100px', height: 'auto' }} />
        </p>
        <p style={{ fontSize: '16px' }}>
          👥 Visitor Counter: 1,337,420 (totally real number)
        </p>
        <p style={{ fontSize: '14px', opacity: '0.8' }}>
          © 2025 blureh - CryptoHamsterNFTz.biz - Not financial advice, just hamster advice
        </p>
      </div>
    </div>
  )
}

export default Landing