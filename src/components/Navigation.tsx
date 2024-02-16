import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserType } from '../types';

type NavigationProps = {
    isLoggedIn: boolean;
    handleLogout: () => void;
    loggedInUser: UserType | null;
};

export default function Navigation({ isLoggedIn, handleLogout }: NavigationProps) {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Yoga Voyage
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about">
                            About
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact">
                            Contact Us
                        </Nav.Link>
                        {isLoggedIn ? (
                            <NavDropdown title="Account" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <NavDropdown title="Join Us" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/signup">
                                    Sign Up
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/login">
                                    Login
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                        <Nav.Link as={Link} to="/retreats">
                            Retreats
                        </Nav.Link>
                        <Nav.Link as={Link} to="/bookings">
                            Bookings
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


