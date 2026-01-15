const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '25px 20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      borderTop: '4px solid #3498db'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          marginBottom: '20px'
        }}>
          <div style={{ flex: '1', minWidth: '200px', margin: '10px' }}>
            <h3 style={{
              color: '#3498db',
              fontSize: '1.2rem',
              marginBottom: '15px'
            }}>
              Contact Us
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#bdc3c7' }}>
              Email: contact@myfavoritecities.com
            </p>
            <p style={{ fontSize: '0.9rem', color: '#bdc3c7' }}>
              Phone: +1 (555) 123-4567
            </p>
          </div>
          
          <div style={{ flex: '1', minWidth: '200px', margin: '10px' }}>
            <h3 style={{
              color: '#3498db',
              fontSize: '1.2rem',
              marginBottom: '15px'
            }}>
              Quick Links
            </h3>
            <ul style={{
              listStyleType: 'none',
              padding: 0
            }}>
              <li style={{ margin: '8px 0' }}>
                <a href="#" style={{
                  color: '#ecf0f1',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#3498db'}
                onMouseLeave={(e) => e.target.style.color = '#ecf0f1'}>
                  About Us
                </a>
              </li>
              <li style={{ margin: '8px 0' }}>
                <a href="#" style={{
                  color: '#ecf0f1',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#3498db'}
                onMouseLeave={(e) => e.target.style.color = '#ecf0f1'}>
                  Privacy Policy
                </a>
              </li>
              <li style={{ margin: '8px 0' }}>
                <a href="#" style={{
                  color: '#ecf0f1',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#3498db'}
                onMouseLeave={(e) => e.target.style.color = '#ecf0f1'}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div style={{ flex: '1', minWidth: '200px', margin: '10px' }}>
            <h3 style={{
              color: '#3498db',
              fontSize: '1.2rem',
              marginBottom: '15px'
            }}>
              Follow Us
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px'
            }}>
              <span style={{
                padding: '8px 12px',
                backgroundColor: '#34495e',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3498db'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#34495e'}>
                FB
              </span>
              <span style={{
                padding: '8px 12px',
                backgroundColor: '#34495e',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3498db'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#34495e'}>
                TW
              </span>
              <span style={{
                padding: '8px 12px',
                backgroundColor: '#34495e',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3498db'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#34495e'}>
                IG
              </span>
            </div>
          </div>
        </div>
        
        <div style={{
          marginTop: '25px',
          paddingTop: '20px',
          borderTop: '1px solid #34495e'
        }}>
          <p style={{
            fontSize: '0.9rem',
            color: '#95a5a6',
            margin: 0
          }}>
            &copy; {new Date().getFullYear()} My Favorite Cities. All rights reserved.
          </p>
          <p style={{
            fontSize: '0.8rem',
            color: '#7f8c8d',
            marginTop: '5px'
          }}>
            Designed with ❤️ for travel enthusiasts worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
