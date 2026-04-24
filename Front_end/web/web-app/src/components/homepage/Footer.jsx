import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #6B21A8 0%, #4C1D95 100%)',
      color: '#fff',
      padding: '60px 0 30px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.4
      }}></div>

      {/* Bus Illustration */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '800px',
        height: '150px',
        backgroundImage: 'url("/assets/bus-illustration.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.15,
        pointerEvents: 'none'
      }}></div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '50px',
          marginBottom: '50px',
          flexWrap: 'wrap'
        }}>
          
          {/* Company Info - Takes more space */}
          <div style={{ flex: '1 1 auto', maxWidth: '500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: '#FFA500',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <i className="fas fa-bus" style={{ fontSize: '24px', color: '#fff' }}></i>
              </div>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Smart Bus</h3>
                <p style={{ fontSize: '12px', margin: 0, opacity: 0.8 }}>School Bus IT Solutions</p>
              </div>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: 0.9, marginBottom: '20px' }}>
              We deliver stunning applications for global brands and start-ups through dynamic, 
              innovative, and scalable solutions to help you become market leaders.
            </p>
            
            {/* Social Media */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: 'fab fa-facebook-f', bg: '#1877f2' },
                { icon: 'fab fa-twitter', bg: '#1da1f2' },
                { icon: 'fab fa-instagram', bg: '#e4405f' },
                { icon: 'fab fa-linkedin-in', bg: '#0077b5' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: social.bg,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textDecoration: 'none',
                    transition: 'transform 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div style={{ flex: '0 0 auto', marginRight: '150px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#FFA500' }}>Get in Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="tel:+917888000422" style={{
                color: '#fff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                fontSize: '15px',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FFA500'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
              >
                <i className="fas fa-phone" style={{
                  width: '35px',
                  height: '35px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}></i>
                +91 7888000422
              </a>
              
              <a href="skype:smartbus?chat" style={{
                color: '#fff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                fontSize: '15px',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FFA500'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
              >
                <i className="fab fa-skype" style={{
                  width: '35px',
                  height: '35px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}></i>
                smartbus
              </a>
              
              <a href="mailto:info@smartbus.in" style={{
                color: '#fff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                fontSize: '15px',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FFA500'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
              >
                <i className="fas fa-envelope" style={{
                  width: '35px',
                  height: '35px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}></i>
                info@smartbus.in
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(255, 255, 255, 0.2)',
          margin: '30px 0'
        }}></div>

        {/* Copyright */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          fontSize: '14px',
          opacity: 0.8,
          textAlign: 'center'
        }}>
          <div>
            © {new Date().getFullYear()} Smart Bus. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</a>
            <span>|</span>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</a>
            <span>|</span>
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
