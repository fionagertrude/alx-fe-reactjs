const MainContent = () => {
  return (
    <main style={{
      padding: '30px',
      minHeight: '400px',
      backgroundColor: '#ecf0f1',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          color: '#2c3e50',
          fontSize: '2rem',
          textAlign: 'center',
          marginBottom: '25px',
          paddingBottom: '15px',
          borderBottom: '3px solid #3498db'
        }}>
          Welcome to Our Travel Portal
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#fff8e1',
            borderRadius: '8px',
            border: '1px solid #ffd54f'
          }}>
            <h3 style={{
              color: '#e65100',
              marginTop: '0'
            }}>Featured Destination</h3>
            <p style={{ color: '#5d4037' }}>
              Explore the beautiful city of Paris with its iconic landmarks and rich culture.
            </p>
          </div>
          
          <div style={{
            padding: '20px',
            backgroundColor: '#e8f5e9',
            borderRadius: '8px',
            border: '1px solid #81c784'
          }}>
            <h3 style={{
              color: '#1b5e20',
              marginTop: '0'
            }}>Travel Tips</h3>
            <p style={{ color: '#33691e' }}>
              Always carry local currency and learn basic phrases in the local language.
            </p>
          </div>
          
          <div style={{
            padding: '20px',
            backgroundColor: '#f3e5f5',
            borderRadius: '8px',
            border: '1px solid #ba68c8'
          }}>
            <h3 style={{
              color: '#4a148c',
              marginTop: '0'
            }}>Upcoming Events</h3>
            <p style={{ color: '#6a1b9a' }}>
              Spring Festival in Tokyo starts next month. Book your tickets now!
            </p>
          </div>
        </div>
        
        <div style={{
          marginTop: '40px',
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px'
        }}>
          <p style={{
            fontSize: '1.1rem',
            color: '#1565c0',
            marginBottom: '15px'
          }}>
            Ready for your next adventure?
          </p>
          <button style={{
            backgroundColor: '#2196f3',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1976d2'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2196f3'}>
            Explore Destinations
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
