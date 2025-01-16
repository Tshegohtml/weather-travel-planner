import { useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

// Type declaration for the location data
interface LocationData {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface SidebarProps {
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

function Sidebar({ setCity }: SidebarProps) {
  const [cityLocal, setCityLocal] = useState<string>("");
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ email: "", password: "" });

  // Get user's location using the browser's geolocation API
  const getLocation = async () => {
    Swal.fire({
      title: "Getting your location...",
      text: "Please wait while we fetch your current location.",
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: LocationData = {
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          };
          Swal.close(); // Close SweetAlert spinner
          Swal.fire({
            title: "Location Retrieved",
            text: `Latitude: ${newLocation.coords.latitude}, Longitude: ${newLocation.coords.longitude}`,
            icon: "success",
          });
        },
        () => {
          Swal.close();
          Swal.fire({
            title: "Error!",
            text: "Permission to access location was denied.",
            icon: "error",
          });
        }
      );
    } else {
      Swal.fire({
        title: "Error!",
        text: "Geolocation is not supported by this browser.",
        icon: "error",
      });
    }
  };

  // Handle city input change
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityLocal(e.target.value);
  };

  // Handle form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCity(cityLocal);
  };

  // Handle input changes for login and registration forms
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  // Login function
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://your-api-url.com/api/login", loginData);
      Swal.fire({
        title: "Success!",
        text: "You have logged in successfully.",
        icon: "success",
      });
      // Handle successful login (e.g., redirect or store token)
      console.log(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Login failed. Please check your credentials.",
        icon: "error",
      });
    }
  };

  // Register function
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://your-api-url.com/api/register", registerData);
      Swal.fire({
        title: "Success!",
        text: "You have registered successfully.",
        icon: "success",
      });
      // Handle successful registration (e.g., login automatically or redirect)
      console.log(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Registration failed. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* Navbar Brand */}
          <Navbar.Brand href="#home">Weather Travel Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>

              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setShowLogin(true)}>
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setShowRegister(true)}>
                  Register
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => setShowFavorites(true)}>
                  Favorites
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Search Form */}
            <Form onSubmit={handleSearchSubmit}>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search by City"
                    value={cityLocal}
                    onChange={handleCityChange}
                    className="mr-sm-2"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">
                    <i className="bi bi-search"></i>
                  </Button>
                  {/* Location Button */}
                  <Button variant="primary" className="ms-2" onClick={getLocation}>
                    <i className="bi bi-geo-alt-fill"></i>
                  </Button>
                </Col>
              </Row>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Register Modal */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Favorites Modal */}
      <Modal show={showFavorites} onHide={() => setShowFavorites(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>New York</li>
            <li>London</li>
            <li>Tokyo</li>
            {/* Add dynamic favorites here */}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Sidebar;
