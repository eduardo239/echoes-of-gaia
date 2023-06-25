import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Start</h1>

      <button
        className="btn btn-info"
        onClick={() => navigate("/select-character")}
      >
        Start Game
      </button>
      <p>Primeira página!</p>
    </div>
  );
};

export default Home;
