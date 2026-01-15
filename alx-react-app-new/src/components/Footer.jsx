const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#2c3e50', 
      color: 'white', 
      padding: '30px 20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      marginTop: '30px',
      borderTop: '4px solid #3498db'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between',
          marginBottom: '25px'
        }}>
          <div style={{ 
            flex: '1', 
            minWidth: '200px', 
            marginBottom: '20px',
            padding: '0 15px'
          }}>
            <h3 style={{ 
              color: '#3498db', 
              fontSize: '20px', 
              marginBottom: '15px',
              borderBottom: '1px solid #3498db',
              paddingBottom: '8px'
            }}>
              Contact Us
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: '#ecf0f1',
              marginBottom: '8px'
            }}>
              Email: info@myfavoritecities.com
            </p>
            <p style={{ 
              fontSize: '14px', 
              color: '#ecf0f1',
              marginBottom: '8px'
            }}>
              Phone: +1 (555) 123-4567
            </p>
            <p style={{ 
              fontSize: '14px', 
              color: '#ecf0f1'
            }}>
              Address: 123 Travel St, World City
            </p>
          </div>
          
          <div style={{ 
            flex: '1', 
            minWidth: '200px', 
            marginBottom: '20px',
            padding: '0 15px'
          }}>
            <h3 style={{ 
              color: '#3498db', 
              fontSize: '20px', 
              marginBottom: '15px',
              borderBottom: '1px solid #3498db',
              paddingBottom: '8px'
            }}>
              Quick Links
            </h3>
            <ul style={{ 
              listStyleType: 'none', 
              padding: '0',
              margin: '0'
            }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{ 
                  color: '#ecf0f1', 
                  textDecoration: 'none',
                  fontSize: '14px'
                }}>
                  Home
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{ 
                  color: '#ecf0f1', 
                  textDecoration: 'none',
                  fontSize: '14px'
                }}>
                  Destinations
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{ 
                  color: '#ecf0f1', 
                  textDecoration: 'none',
                  fontSize: '14px'
                }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: '#ecf0f1', 
                  textDecoration: 'none',
                  fontSize: '14px'
                }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div style={{ 
            flex: '1', 
            minWidth: '200px', 
            marginBottom: '20px',
            padding: '0 15px'
          }}>
            <h3 style={{ 
              color: '#3498db', 
              fontSize: '20px', 
              marginBottom: '15px',
              borderBottom: '1px solid #3498db',
              paddingBottom: '8px'
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
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                Facebook
              </span>
              <span style={{ 
                padding: '8px 12px', 
                backgroundColor: '#34495e', 
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                Twitter
              </span>
              <span style={{ 
                padding: '8px 12px', 
                backgroundColor: '#34495e', 
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                Instagram
              </span>
            </div>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid #34495e', 
          paddingTop: '20px',
          marginTop: '20px'
        }}>
          <p style={{ 
            fontSize: '14px', 
            color: '#bdc3c7',
            marginBottom: '10px'
          }}>
            &copy; {new Date().getFullYear()} My Favorite Cities. All rights reserved.
          </p>
          <p style={{ 
            fontSize: '12px', 
            color: '#95a5a6'
          }}>
            Designed with ❤️ for travel enthusiasts around the world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
