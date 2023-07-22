import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Link, useNavigate } from "react-router-dom";

const GameNavbar = ({ player }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-dark p-3 primary">
      {player ? (
        <Stack direction="horizontal" gap={3}>
          <div>
            <strong>Echoes of Gaia</strong>
          </div>
          <div>Player: {player.name}</div>
          <div>Level: {player.level}</div>
          <div>Experience: {player.exp}</div>
          <div>Next Level: {player.nextLevel}</div>
        </Stack>
      ) : (
        <Stack direction="horizontal" gap={3}>
          <div>
            <strong>Echoes of Gaia</strong>
          </div>
          <div>Player Not Found !</div>
          <div>
            <Link to="/">Home</Link>
          </div>
        </Stack>
      )}
    </div>
  );
};

export default GameNavbar;
