const MainContent = () => {
  return (
    <div style={{ backgroundColor: 'lightyellow', padding: '20px', margin: '10px' }}>
      <h2 style={{ color: 'darkred', textAlign: 'center' }}>Main Content Section</h2>
      <p style={{ color: 'black', fontSize: '16px' }}>This section demonstrates inline CSS styling.</p>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '15px', 
        marginTop: '15px',
        border: '2px solid green'
      }}>
        <h3 style={{ color: 'darkgreen' }}>Featured Content</h3>
        <p style={{ color: '#333' }}>More styled content here.</p>
      </div>
    </div>
  )
}

export default MainContent
