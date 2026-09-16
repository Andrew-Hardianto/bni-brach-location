import React, { useState, useEffect } from 'react'
import { Toast } from 'react-bootstrap'

const Message = ({ variant = 'info', children }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 5000);
        return () => clearTimeout(timer);
    }, [children]); // Reset timer if children (error message) changes

    if (!show) return null;

    let headerText = 'Notification';
    if (variant === 'danger') headerText = 'Error';
    if (variant === 'success') headerText = 'Success';

    return (
        <div style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 9999 }}>
            <Toast show={show} onClose={() => setShow(false)} className={`bg-${variant} text-white`} style={{ border: '3px solid #000', borderRadius: '6px', boxShadow: '7px 7px 0px 0px #000', opacity: 1 }}>
                <Toast.Header style={{ borderBottom: '3px solid #000', backgroundColor: '#fff' }}>
                    <strong className="mr-auto text-dark" style={{ fontWeight: 800, textTransform: 'uppercase' }}>{headerText}</strong>
                </Toast.Header>
                <Toast.Body style={{ fontWeight: 600, color: variant === 'warning' || variant === 'light' ? '#000' : '#fff' }}>
                    {children}
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default Message
