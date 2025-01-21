import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import '../assets/icomoon/icomoon.css';
import { NavLink } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegistModal';

const Header = () => {
  const [navbarClass, setNavbarClass] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegist, setShowRegist] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarClass("scrolled awake");
      } else {
        setNavbarClass("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginSuccess = (loginUsername) => {
    setIsLoggedIn(true);
    setUsername(loginUsername);
    setShowLogin(false);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Update state
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" className={`ftco_navbar ftco-navbar-light ${navbarClass}`}>
        <Container className='custom-container'>
          <Navbar.Brand as={NavLink} to="/">
            Coffee<small>Blend</small>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="ftco-nav"><span className='oi oi-menu'></span>Menu</Navbar.Toggle>
          <Navbar.Collapse id="ftco-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <Nav.Link as={NavLink} to="/" className="nav-item">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/menu" className="nav-item">Menu</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/services" className="nav-item">Services</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/about" className="nav-item">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/contact" className="nav-item">Contact</Nav.Link>
              </Nav.Item>

              {isLoggedIn ? (
                <>
                  <Nav.Item className='cart'>
                    <Nav.Link as={NavLink} to="/cart" >
                      <span className='icon icon-shopping_cart'></span>
                    </Nav.Link>
                  </Nav.Item>
                  <NavDropdown title={username} id='navbar-dropdown'>
                    <NavDropdown.Item as={NavLink} to="/booking">Your Booking</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/orders">Your Orders</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Item>
                    <Nav.Link onClick={() => setShowLogin(true)} className="nav-item">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setShowRegist(true)} className="nav-item">Register</Nav.Link>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <LoginModal 
        show={showLogin} 
        handleClose={() => setShowLogin(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
      <RegisterModal 
        show={showRegist} 
        handleClose={() => setShowRegist(false)} 
      />
    </>
  );
};

export default Header;