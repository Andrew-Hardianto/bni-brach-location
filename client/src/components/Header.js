import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi'

const Header = () => {
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <GiHamburgerMenu />
                <Container>
                    <Navbar.Brand href="" className="font-weight-bold">MASTER DATA</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
