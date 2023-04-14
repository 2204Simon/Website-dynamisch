export const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      maxWidth: '250px',
      margin: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out',
    },
    imageContainer: {
      overflow: 'hidden',
      borderRadius: '10px',
      marginBottom: '1rem',
    },
    image: {
      width: '100%',
      height: 'auto',
      transition: 'transform 0.3s ease-in-out',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      margin: '0',
      fontSize: '1.5rem',
      textAlign: 'center',
    },
    price: {
      margin: '0',
      fontSize: '1.2rem',
    },
    quantity: {
      display: 'flex',
      alignItems: 'center',
      margin: '1rem 0',
    },
    quantityInput: {
      width: '3rem',
      padding: '0.5rem',
      border: '1px solid #aaa',
      borderRadius: '5px',
      marginLeft: '0.5rem',
      fontSize: '1.2rem',
      textAlign: 'center',
      appearance: 'textfield',
    },
  
  }