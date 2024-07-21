import { useState } from "react";
import { Button, Container, Form, Image, InputGroup } from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom";
import logo from "../assets/weathericon/compass.svg";

const Search = () => {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const geolocalFetch = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=2&appid=6136007826f2425e507093e16cf8aade`);
      if (resp.ok) {
        const result = await resp.json();
        console.log("Result", result);
        if (result.length === 0) {
          navigate("*");
          redirect("*"); // inserito per netlify
        } else {
          navigate(`/details/lat=${result[0].lat}&lon=${result[0].lon}`);
          redirect(`/details/lat=${result[0].lat}&lon=${result[0].lon}`); // inserito per netlify
        }
      } else {
        throw new Error("Errore nel recupero della località");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Image src={logo} alt="compass logo" width={50} />
      <span className="fs-6">Weather App</span>
      <Container className="mainContainer rounded-4">
        <h1>Welcome!</h1>
        <Form onSubmit={geolocalFetch}>
          <InputGroup className="my-3">
            <Form.Control type="text" placeholder="Search your country" aria-describedby="basic-addon2" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
            <Button variant="dark" type="submit">
              Search
            </Button>
          </InputGroup>
        </Form>
      </Container>
    </>
  );
};

export default Search;
