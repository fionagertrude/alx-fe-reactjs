const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#2c3e50', 
      color: 'white', 
      padding: '20px',
      textAlign: 'center',
      marginTop: '20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginBottom: '15px'
        }}>
          <div style={{ margin: '10px' }}>
            <h3 style={{ color: '#3498db', fontSize: '1.1rem' }}>Contact</h3>
            <p style={{ fontSize: '0.9rem' }}>contact@myfavoritecities.com</p>
          </div>
          <div style={{ margin: '10px' }}>
            <h3 style={{ color: '#3498db', fontSize: '1.1rem' }}>Links</h3>
            <p style={{ fontSize: '0.9rem' }}>About | Privacy | Terms</p>
          </div>
          <div style={{ margin: '10px' }}>
            <h3 style={{ color: '#3498db', fontSize: '1.1rem' }}>Follow Us</h3>
            <p style={{ fontSize: '0.9rem' }}>Facebook | Twitter | Instagram</p>
          </div>
        </div>
        <div style={{ 
          borderTop: '1px solid #34495e', 
          paddingTop: '15px',
          marginTop: '15px'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#bdc3c7' }}>
            &copy; {new Date().getFullYear()} My Favorite Cities. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
