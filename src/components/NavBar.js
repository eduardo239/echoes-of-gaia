import Stack from "react-bootstrap/Stack";

const GameNavbar = ({ player }) => {
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
        </Stack>
      )}
    </div>
  );
};

export default GameNavbar;
