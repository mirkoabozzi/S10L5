import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = (props) => {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  return (
    <Container className="mainContainer mt-5 rounded-4">
      <h1>Benvenuto!</h1>
      <InputGroup className="my-3">
        <Form.Control
          type="text"
          placeholder="Cerca una località"
          aria-describedby="basic-addon2"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        <Button
          variant="dark"
          onClick={() => {
            props.userCountry(userInput);
            navigate("/:" + userInput);
          }}
        >
          Cerca
        </Button>
      </InputGroup>
    </Container>
  );
};
export default Search;
