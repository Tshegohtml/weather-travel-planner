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

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Navbar Brand */}
        <Navbar.Brand href="#home">Weather Travel Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>

            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Register</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Favorites</NavDropdown.Item>
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
  );
}

export default Sidebar;
