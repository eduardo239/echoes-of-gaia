import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import TextTitle from "../components/TextTitle";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TextTitle title="Echoes Of Gaia" />

      <div className="d-flex justify-content-center gap-1 mt-3 p-3 bg-light bottom-separator">
        <Button onClick={() => navigate("/create-player")}>Start</Button>
      </div>
    </div>
  );
};

export default Home;
