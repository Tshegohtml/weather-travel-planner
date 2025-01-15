import { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaSearchLocation, FaUtensils, FaHotel, FaFire } from "react-icons/fa"; // For icons
import Swal from "sweetalert2";

interface HeaderProps {
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ setCity }: HeaderProps) => {
  const [cityLocal, setCityLocal] = useState<string>("");
  const [locationFetched, setLocationFetched] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // Handle form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCity(cityLocal);
  };

  // Handle city input change
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityLocal(e.target.value);
  };

  // Show search
  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  // Handle getting the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
          )
            .then((response) => response.json())
            .then((data) => {
              const city = data.results[0]?.components.city || "Your Location";
              setCityLocal(city);
              setLocationFetched(true);
            })
            .catch((error) => {
              console.error("Error fetching location:", error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Unable to fetch city name from coordinates.",
                confirmButtonText: "Okay",
              });
              setLocationFetched(false);
            });
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
          Swal.fire({
            icon: "error",
            title: "Unable to fetch your location",
            text: "Please allow location access in your browser.",
            confirmButtonText: "Okay",
          });
          setLocationFetched(false);
        }
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Geolocation Not Supported",
        text: "Your browser does not support geolocation.",
        confirmButtonText: "Okay",
      });
      setLocationFetched(false);
    }
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        position: "relative",
        padding: "50px 0",
      }}
    >
      <Container className="text-center">
        <div>
          <FaSearchLocation
            style={{ fontSize: "4rem", marginBottom: "20px" }}
          />
          <h2>Discover Your Next Adventure</h2>
          <p style={{ fontSize: "1.25rem", marginBottom: "40px" }}>
            Find the best places to eat, stay, and explore near you.
          </p>
          <Row className="justify-content-center">
            {/* Category Cards */}
            <Col xs={12} sm={4} className="mb-4">
              <Card className="bg-dark text-white bg-opacity-10 border-0 shadow">
                <Card.Body className="d-flex flex-column align-items-center">
                  <FaUtensils
                    style={{ fontSize: "3rem", marginBottom: "15px" }}
                  />
                  <Card.Title>Restaurants</Card.Title>
                  <Card.Text>
                    Discover the best dining experiences, from local favorites
                    to top-rated eateries.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={4} className="mb-4">
              <Card
                className="bg-dark text-white bg-opacity-10 border-0 shadow"
                style={{ height: "100%" }}
              >
                <Card.Body className="d-flex flex-column align-items-center">
                  <FaHotel style={{ fontSize: "3rem", marginBottom: "15px" }} />
                  <Card.Title>Hotels</Card.Title>
                  <Card.Text>
                    Find the perfect place to stay, with options ranging from
                    budget to luxury.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={4} className="mb-4">
              <Card
                className="bg-dark text-white bg-opacity-10 border-0 shadow"
                style={{ height: "100%" }}
              >
                <Card.Body className="d-flex flex-column align-items-center">
                  <FaFire style={{ fontSize: "3rem", marginBottom: "15px" }} />
                  <Card.Title>Attractions</Card.Title>
                  <Card.Text>
                    Explore popular attractions and hidden gems that make your
                    trip memorable.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Search Form */}
            <div className="bg-dark bg-opacity-25 p-4 rounded-5">
              <Button
                variant="primary ms-2"
                onClick={handleShowSearch}
                style={buttonStyle}
                hidden={showSearch}
              >
                <i className="bi bi-geo-alt-fill"></i> Explore Now
              </Button>

              {showSearch && (
                <Form onSubmit={handleSearchSubmit}>
                  <Row className="justify-content-center">
                    <Col xs="auto">
                      <Form.Control
                        type="text"
                        placeholder="Search by City"
                        value={cityLocal}
                        onChange={handleCityChange}
                        className="mr-sm-2"
                        style={{ height: "2.9rem" }}
                      />
                    </Col>
                    <Col xs="auto">
                      <Button type="submit" style={buttonStyle}>
                        <i className="bi bi-search"></i>
                      </Button>
                      {/* Location Button */}
                      <Button
                        variant="primary ms-2"
                        onClick={getLocation}
                        style={buttonStyle}
                        disabled={locationFetched}
                      >
                        <i className="bi bi-geo-alt-fill"></i> Get Location
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </div>

            {/* Explore Now CTA */}
            {locationFetched && (
              <Button
                variant="success"
                className="mt-4"
                onClick={() => setCity(cityLocal)}
                style={buttonStyle}
              >
                Explore Now
              </Button>
            )}
          </Row>
        </div>
      </Container>
    </section>
  );
};

// Custom button style for consistency
const buttonStyle = {
  backgroundColor: "#9483fc",
  borderRadius: "20px",
  padding: "12px 30px",
  fontWeight: 600,
  color: "white",
  border: "none",
  "&:hover": {
    backgroundColor: "#feb47b",
  },
};

export default Header;
