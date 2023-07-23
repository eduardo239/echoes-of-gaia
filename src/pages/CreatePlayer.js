import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../hook/PlayerContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TextTitle from "../components/TextTitle";
import { Player } from "../classes/Player";
import PlayerList from "../components/map/PlayerList";
import ButtonContainer from "../components/ButtonContainer";

const CreatePlayer = () => {
  const navigate = useNavigate();
  const { player, setPlayer } = useContext(PlayerContext);
  const [username, setUsername] = useState("jack");

  const savePlayer = (e) => {
    e.preventDefault();
    const newPlayer = new Player(username, "./assets/characters/dog1.png");
    setPlayer(newPlayer);
  };

  return (
    <>
      <TextTitle title="Create Player" />

      <ButtonContainer>
        <Button onClick={() => navigate("/")}>Back</Button>
        <Button onClick={() => navigate("/select-character")}>Next</Button>
      </ButtonContainer>

      <div className="d-flex justify-content-center flex-wrap gap-1 mb-3 p-3 bg-light">
        <div className="d-flex flex-column gap-3">
          <Form data-bs-theme="light">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-secondary">Username </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <Form.Text className="text-muted ">
                Player: {player?.name}
              </Form.Text>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

            <div className="d-grid">
              <Button variant="primary" type="submit" onClick={savePlayer}>
                Save
              </Button>
            </div>
          </Form>

          <div className="d-flex justify-content-center">
            <PlayerList player={player} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePlayer;
