import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const geolocalFetch = async () => {
    try {
      const resp = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=2&appid=6136007826f2425e507093e16cf8aade`);
      if (resp.ok) {
        const result = await resp.json();
        console.log("Result", result);
        navigate(`/details/lat=${result[0].lat}&lon=${result[0].lon}`);
      } else {
        throw new Error("Errore nel recupero della località");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mainContainer mt-5 rounded-4">
      <h1>Benvenuto!</h1>
      <InputGroup className="my-3">
        <Form.Control type="text" placeholder="Cerca una località" aria-describedby="basic-addon2" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        <Button variant="dark" onClick={geolocalFetch}>
          Cerca
        </Button>
      </InputGroup>
    </Container>
  );
};

export default Search;
