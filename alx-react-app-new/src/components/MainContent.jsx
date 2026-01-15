const MainContent = () => {
  return (
    <main style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>
          Welcome to Our Travel Portal
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#e8f4f8', 
            borderRadius: '5px',
            borderLeft: '4px solid #3498db'
          }}>
            <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Featured Destination</h3>
            <p style={{ color: '#34495e' }}>Paris, France - The city of love and lights.</p>
          </div>
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#f8f8e8', 
            borderRadius: '5px',
            borderLeft: '4px solid #f39c12'
          }}>
            <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Travel Tips</h3>
            <p style={{ color: '#34495e' }}>Always carry a copy of your passport and travel insurance.</p>
          </div>
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#f0e8f8', 
            borderRadius: '5px',
            borderLeft: '4px solid #9b59b6'
          }}>
            <h3 style={{ color: '#2c3e50', marginTop: '0' }}>Upcoming Events</h3>
            <p style={{ color: '#34495e' }}>Spring Festival in Tokyo - March 15-30, 2024</p>
          </div>
        </div>
        <div style={{ 
          marginTop: '25px', 
          textAlign: 'center',
          padding: '15px',
          backgroundColor: '#e8f8f0',
          borderRadius: '5px'
        }}>
          <p style={{ color: '#27ae60', fontWeight: 'bold' }}>
            Start planning your next adventure today!
          </p>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
