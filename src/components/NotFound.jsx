import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Container className="mainContainer my-5 rounded-4 text-center">
        <h1>404 Not Found</h1>
        <Button variant="outline-light" onClick={() => navigate("/")}>
          Back To Home
        </Button>
      </Container>
    </Container>
  );
};
export default NotFound;
