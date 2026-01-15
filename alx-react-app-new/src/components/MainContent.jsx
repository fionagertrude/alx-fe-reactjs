const MainContent = () => {
  return (
    <main style={{ 
      backgroundColor: '#f5f5f5', 
      padding: '30px', 
      minHeight: '300px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '25px', 
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          color: '#2c3e50', 
          textAlign: 'center', 
          marginBottom: '25px',
          fontSize: '28px',
          borderBottom: '2px solid #3498db',
          paddingBottom: '10px'
        }}>
          Welcome to Our Travel Portal
        </h2>
        
        <p style={{ 
          color: '#34495e', 
          fontSize: '16px', 
          lineHeight: '1.6',
          marginBottom: '20px'
        }}>
          Explore the world's most amazing destinations with us. From bustling cities to serene beaches, we have something for every traveler.
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '20px',
          justifyContent: 'center'
        }}>
          <div style={{ 
            flex: '1', 
            minWidth: '250px',
            backgroundColor: '#e8f4f8', 
            padding: '20px', 
            borderRadius: '6px',
            border: '1px solid #3498db'
          }}>
            <h3 style={{ 
              color: '#2980b9', 
              marginTop: '0',
              fontSize: '20px'
            }}>
              Popular Destinations
            </h3>
            <ul style={{ 
              color: '#2c3e50', 
              paddingLeft: '20px',
              marginBottom: '0'
            }}>
              <li style={{ marginBottom: '8px' }}>Paris, France</li>
              <li style={{ marginBottom: '8px' }}>Tokyo, Japan</li>
              <li style={{ marginBottom: '8px' }}>New York, USA</li>
              <li>Rome, Italy</li>
            </ul>
          </div>
          
          <div style={{ 
            flex: '1', 
            minWidth: '250px',
            backgroundColor: '#f8f8e8', 
            padding: '20px', 
            borderRadius: '6px',
            border: '1px solid #f39c12'
          }}>
            <h3 style={{ 
              color: '#d35400', 
              marginTop: '0',
              fontSize: '20px'
            }}>
              Travel Tips
            </h3>
            <ul style={{ 
              color: '#2c3e50', 
              paddingLeft: '20px',
              marginBottom: '0'
            }}>
              <li style={{ marginBottom: '8px' }}>Pack light and smart</li>
              <li style={{ marginBottom: '8px' }}>Learn basic local phrases</li>
              <li style={{ marginBottom: '8px' }}>Always have travel insurance</li>
              <li>Respect local customs</li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '30px', 
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#e8f8f0',
          borderRadius: '6px',
          border: '1px solid #27ae60'
        }}>
          <p style={{ 
            color: '#27ae60', 
            fontSize: '18px', 
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            Ready for your next adventure?
          </p>
          <button style={{ 
            backgroundColor: '#3498db', 
            color: 'white', 
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Start Exploring
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
