const UserProfile = (props) => {
  return (
    <div style={{
      border: '2px solid #4a90e2',
      borderRadius: '10px',
      padding: '20px',
      margin: '15px',
      backgroundColor: '#f8f9fa',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease'
    }}>
      <h2 style={{
        color: '#2c3e50',
        fontSize: '1.8rem',
        marginBottom: '15px',
        borderBottom: '2px solid #3498db',
        paddingBottom: '8px',
        fontFamily: 'Segoe UI, sans-serif'
      }}>
        {props.name}
      </h2>
      <p style={{
        fontSize: '1.1rem',
        color: '#34495e',
        margin: '8px 0'
      }}>
        <span style={{
          fontWeight: 'bold',
          color: '#e74c3c'
        }}>
          Age: 
        </span>
        <span style={{
          fontWeight: 'bold',
          color: '#2c3e50',
          marginLeft: '5px',
          fontSize: '1.2rem'
        }}>
          {props.age}
        </span>
      </p>
      <p style={{
        fontSize: '1rem',
        color: '#7f8c8d',
        lineHeight: '1.6',
        fontStyle: 'italic',
        backgroundColor: '#ecf0f1',
        padding: '12px',
        borderRadius: '5px',
        borderLeft: '4px solid #3498db'
      }}>
        <span style={{
          fontWeight: 'bold',
          color: '#16a085'
        }}>
          Bio: 
        </span>
        <span style={{ marginLeft: '8px' }}>
          {props.bio}
        </span>
      </p>
      <div style={{
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#e8f4fc',
        borderRadius: '5px',
        border: '1px dashed #3498db'
      }}>
        <p style={{
          margin: '5px 0',
          fontSize: '0.9rem',
          color: '#2980b9'
        }}>
          <span style={{ fontWeight: 'bold' }}>Hobbies:</span> {props.hobbies || 'Reading, Traveling'}
        </p>
        <p style={{
          margin: '5px 0',
          fontSize: '0.9rem',
          color: '#2980b9'
        }}>
          <span style={{ fontWeight: 'bold' }}>Location:</span> {props.location || 'Unknown'}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
