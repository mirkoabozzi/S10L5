import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container className="mainContainer mt-5 rounded-4">
      <h1>404 Not Found</h1>
      <Button variant="light" onClick={() => navigate("/")}>
        Torna alla Home
      </Button>
    </Container>
  );
};
export default NotFound;
