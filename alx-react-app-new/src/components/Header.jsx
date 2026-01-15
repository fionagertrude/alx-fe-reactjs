const Header = () => {
  return (
    <header style={{
      backgroundColor: 'navy',
      color: 'white',
      textAlign: 'center',
      padding: '20px 0',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      fontFamily: 'Arial, sans-serif',
      borderBottom: '3px solid gold'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem',
        margin: 0,
        letterSpacing: '2px',
        textTransform: 'uppercase'
      }}>
        My Favorite Cities
      </h1>
      <p style={{
        fontSize: '1.2rem',
        marginTop: '10px',
        opacity: '0.9',
        fontStyle: 'italic'
      }}>
        Discover amazing destinations around the world
      </p>
    </header>
  );
};

export default Header;
