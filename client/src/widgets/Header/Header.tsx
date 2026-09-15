import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            setIsDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    return (
        <div>
            <Navbar bg="primary" variant="dark" className="d-flex justify-content-between align-items-center px-4">
                <div className="d-flex align-items-center text-white">
                    <GiHamburgerMenu size={24} style={{ cursor: 'pointer' }} />
                    <Navbar.Brand href="/" className="font-weight-bold ml-3" style={{ marginLeft: '15px' }}>MASTER DATA</Navbar.Brand>
                </div>
                <div>
                    <Button 
                        variant={isDarkMode ? 'light' : 'dark'} 
                        size="sm" 
                        onClick={toggleDarkMode}
                        title="Toggle Dark Mode"
                    >
                        {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
                    </Button>
                </div>
            </Navbar>
        </div>
    )
}

export default Header
