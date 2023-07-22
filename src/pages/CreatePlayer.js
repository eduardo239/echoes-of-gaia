import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../hook/PlayerContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TextTitle from "../components/TextTitle";
import { Player } from "../classes/Player";
import PlayerList from "../components/map/PlayerList";

const CreatePlayer = () => {
  const navigate = useNavigate();
  const { player, setPlayer } = useContext(PlayerContext);
  const [username, setUsername] = useState("usuário sem nome  ");

  const savePlayer = (e) => {
    e.preventDefault();
    const newPlayer = new Player(username, "./assets/characters/dog1.png");
    setPlayer(newPlayer);
  };

  return (
    <>
      <TextTitle title="Create Player" />

      <div className="d-flex justify-content-center gap-1 m-3">
        <Button onClick={() => navigate("/")}>Back</Button>
        <Button onClick={() => navigate("/select-character")}>Next</Button>
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-1 ">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex justify-content-center">
            <PlayerList player={player} />
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <Form.Text className="text-muted">
                Player: {player?.name}
              </Form.Text>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

            <Button variant="primary" type="submit" onClick={savePlayer}>
              Save
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreatePlayer;
