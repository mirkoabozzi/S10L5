import { useState } from "react";
import { Button, Container, Form, Image, InputGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/weathericon/compass.svg";

const Search = () => {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const geolocalFetch = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=2&appid=6136007826f2425e507093e16cf8aade`);
      if (resp.ok) {
        const result = await resp.json();
        console.log("Result", result);
        if (result.length === 0) {
          navigate("*");
        } else {
          navigate(`/details/lat=${result[0].lat}&lon=${result[0].lon}`);
        }
      } else {
        throw new Error("Errore nel recupero della località");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          navigate(`/details/lat=${latitude}&lon=${longitude}`);
        },
        (error) => {
          console.error("Error getting user location:", error);
          alert(error.message + ". Please try again or enter a location manually.");
          setIsLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-2">
      <Container className="mainContainer rounded-4">
        <p className="text-center m-0">Welcome to</p>
        <div className="text-center">
          <Image src={logo} alt="compass logo" width={80} />
        </div>
        <h1 className="text-center">Weather App</h1>
        <Form onSubmit={geolocalFetch}>
          <InputGroup className="my-3">
            <Form.Control
              className="text-center"
              type="text"
              placeholder="Search your country"
              required
              aria-describedby="basic-addon2"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </InputGroup>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
              <Button variant="outline-light" type="submit">
                Search
              </Button>
              <p className="mb-0 text-center">or</p>
              <Button variant="outline-light" type="button" onClick={getUserLocation}>
                Get My Current Location
              </Button>
              {isLoading && (
                <div className="text-center">
                  <Spinner className="mt-3" />
                </div>
              )}
            </div>
          </div>
        </Form>
      </Container>
    </Container>
  );
};

export default Search;
