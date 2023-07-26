import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import TextTitle from "../components/TextTitle";
import ButtonContainer from "../components/ButtonContainer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TextTitle title="Echoes Of Gaia" />

      <ButtonContainer>
        <Button className="w-123" onClick={() => navigate("/create-player")}>
          Start
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default Home;
