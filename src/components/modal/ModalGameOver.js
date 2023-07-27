import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../hook/PlayerContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CardTable from "../table/CardTable";
import { GAME_OVER } from "../../helper/constants";
import { useNavigate } from "react-router-dom";

const ModalGameOver = ({
  modalType,
  resetGame,
  modalGameOver,
  handleModalGameOverClose,
}) => {
  const { player, setIsGameWasRestarted } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const restart = () => {
    console.log("restart");
    resetGame();
    setIsGameWasRestarted(true);
    navigate("/");
  };

  useEffect(() => {
    setMessage("Game Over");
    return () => {
      setMessage("");
      setMessage("");
    };
  }, [modalGameOver]);

  if (player)
    return (
      <Modal size="lg" show={modalGameOver} onHide={handleModalGameOverClose}>
        <Modal.Header closeButton className="dark">
          <Modal.Title>Winner</Modal.Title>
        </Modal.Header>
        <Modal.Body className="dark">
          {message && <h4 className="text-center text-warning">{message}</h4>}
          <div className="d-flex justify-content-center flex-wrap gap-1 mb-3">
            <div className="app-card">
              <img src={player.image} alt={player.name} />

              <CardTable modalType={modalType} item={player} />
              {modalType === GAME_OVER && (
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={() => restart()}>
                    Restart
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="dark">
          <Button variant="primary" onClick={handleModalGameOverClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default ModalGameOver;
