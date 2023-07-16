import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Página não encontrada</h1>
      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </div>
  );
};

export default NotFound;
