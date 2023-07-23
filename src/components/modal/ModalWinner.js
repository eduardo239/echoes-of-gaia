import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GIFT } from "../../constants";
import CardTable from "../table/CardTable";
import { useContext, useEffect, useState } from "react";
import { items } from "../../server";
import { chooseRandomItem } from "../../helper";
import { Item } from "../../classes/Item";
import { PlayerContext } from "../../hook/PlayerContext";

const ModalWinner = ({
  list,
  modalType,
  modalWinner,

  handleModalWinnerClose,
}) => {
  const { player } = useContext(PlayerContext);

  const [winnerGiftList, setWinnerGiftList] = useState([]);

  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetAwards = () => {
    console.log("handleGetAwards");
  };

  const getItemList = () => {
    return winnerGiftList.map((item) => (
      <div key={item.id} className="app-card">
        <img src={item.image} alt={item.name} />

        <CardTable modalType={modalType} item={item} />
        {modalType === GIFT && (
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleGetAwards(item)}
            >
              Get
            </Button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <Modal size="xl" show={modalWinner} onHide={handleModalWinnerClose}>
      <Modal.Header closeButton className="dark">
        <Modal.Title>Winner</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dark">
        <div className="d-flex justify-content-center flex-wrap gap-1">
          {/* {list && list.length > 0 && getItemList()} */}
          <div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleGetAwards()}
            >
              Get
            </Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="dark">
        <Button variant="primary" onClick={handleModalWinnerClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWinner;
