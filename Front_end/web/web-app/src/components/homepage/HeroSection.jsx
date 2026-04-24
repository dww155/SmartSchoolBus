import React from 'react';

function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Decorative shapes */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        transform: 'rotate(-15deg)'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        left: '-5%',
        width: '500px',
        height: '500px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '50%'
      }}></div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          
          {/* Left: content */}
          <div style={{ color: '#fff' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '24px',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              ✨ Trusted by schools & parents
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '24px',
              textShadow: '2px 2px 20px rgba(0,0,0,0.15)'
            }}>
              Real-time school bus tracking made simple
            </h1>

            <p style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '20px',
              opacity: 0.95
            }}>
              So every kid gets to school in time & returns home safely
            </p>

            <p style={{
              fontSize: '16px',
              lineHeight: 1.7,
              marginBottom: '32px',
              opacity: 0.9,
              maxWidth: '600px'
            }}>
              Get notified instantly of your Pickup and Drop, Stoppage alert through our intuitive platform. 
              You will never miss out on any important updates related to your child's school trips. 
              You can rest assured that all notifications are reliable, accurate, and delivered on time, 
              allowing you to have a stress-free experience.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <button style={{
                padding: '14px 32px',
                background: '#edc214',
                color: '#1F2937',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(252, 211, 77, 0.4)',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(252, 211, 77, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(252, 211, 77, 0.4)';
              }}
              >
                <i className="fas fa-rocket"></i>
                Explore Now
              </button>
              
              <button style={{
                padding: '14px 32px',
                background: 'transparent',
                color: '#fff',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <i className="fas fa-calendar-check"></i>
                Book Demo
              </button>
            </div>

            {/* Features badges */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { icon: 'fa-map-marker-alt', text: 'Live GPS' },
                { icon: 'fa-bell', text: 'Instant Alerts' },
                { icon: 'fa-shield-alt', text: 'Safe & Secure' },
                { icon: 'fa-clock', text: 'Real-time ETA' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '10px 16px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <i className={`fas ${item.icon}`}></i>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: 'perspective(1000px) rotateY(-5deg)',
              animation: 'float 3s ease-in-out infinite'
            }}>
              {/* Phone frame simulation */}
              <div style={{
                background: 'transparent',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                padding: '30px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative'
              }}>
                <div style={{
                  background: 'transparent',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                  <img 
                    src="/assets/LogoBusApp3.png" 
                    alt="Smart Bus App" 
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                </div>
                
                {/* Decorative dots */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '5px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '3px'
                }}></div>
              </div>

              {/* Floating elements */}
              <div style={{
                position: 'absolute',
                top: '10%',
                right: '-20px',
                background: 'rgba(139, 92, 246, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '12px 16px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
                animation: 'bounce 2s ease-in-out infinite',
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <i className="fas fa-map-marker-alt" style={{ marginRight: '6px', color: '#FCD34D' }}></i>
                Live Tracking
              </div>

              <div style={{
                position: 'absolute',
                bottom: '15%',
                left: '-30px',
                background: 'rgba(139, 92, 246, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '12px 16px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
                animation: 'bounce 2s ease-in-out infinite 0.5s',
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <i className="fas fa-bell" style={{ marginRight: '6px', color: '#FCD34D' }}></i>
                Alert System
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Add animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: perspective(1000px) rotateY(-5deg) translateY(0px); }
          50% { transform: perspective(1000px) rotateY(-5deg) translateY(-20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;