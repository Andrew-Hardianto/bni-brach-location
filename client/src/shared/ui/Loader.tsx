import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Transparent dark background */
            zIndex: 9999, /* Make sure it stays on top of everything */
            backdropFilter: 'blur(2px)' /* Optional neo-brutalist touch */
        }}>
            <Spinner
                animation='border'
                role='status'
                style={{
                    width: '80px',
                    height: '80px',
                    color: '#F15A24', /* BNI Orange for the spinner */
                    borderWidth: '8px' /* Thicker border for brutalist style */
                }}
            >
                <span className='sr-only'>Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader
