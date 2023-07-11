import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Echoes Of Gaia</h1>
      <Button onClick={() => navigate("/select-character")}>Start Game</Button>
    </div>
  );
};

export default Home;
