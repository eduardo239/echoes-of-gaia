import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CardTable from "../table/CardTable";
import { EXPERIENCE, GOLD, ITEM, WINNER } from "../../helper/constants";
import { useContext, useEffect, useState } from "react";
import { gifts, items } from "../../helper/server";
import { chooseRandomItem } from "../../helper";
import { PlayerContext } from "../../hook/PlayerContext";
import { Item } from "../../classes/Item";
import { useNavigate } from "react-router-dom";

const ModalWinner = ({
  list,
  modalType,
  modalWinner,
  handleModalWinnerClose,
  isCompletedMap,
  setIsCompletedMap,
}) => {
  const navigate = useNavigate();
  const { player, inventory, setInventory } = useContext(PlayerContext);

  const [winnerGiftList, setWinnerGiftList] = useState([]);
  const [itemObtained, setItemObtained] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (gifts) setWinnerGiftList(gifts);
    return () => {
      setItemObtained(false);
      setMessage("");
    };
  }, [modalWinner]);

  const handleGetRewards = (item) => {
    console.log("handle get rewards");

    switch (item.type) {
      case EXPERIENCE:
        const actualLevel = player.getLevel();
        player.setAddExp();
        const newLevel = player.getLevel();

        if (newLevel > actualLevel) {
          setMessage(
            "New level: " +
              player.getLevel() +
              " - " +
              "Experience points obtained: " +
              player.getExpEarned()
          );
        } else {
          setMessage("Experience points obtained: " + player.getExpEarned());
        }

        setItemObtained(true);
        if (isCompletedMap) navigate("/select-map");
        setIsCompletedMap(false);
        break;

      case ITEM:
        const randomItem = chooseRandomItem(items);

        const newItem = new Item(
          randomItem.name,
          randomItem.image,
          randomItem.type,
          randomItem.class,
          randomItem.value,
          randomItem.price
        );

        setInventory([...inventory, newItem]);
        setMessage("Winner obtained: " + newItem.name);
        setItemObtained(true);
        if (isCompletedMap) navigate("/select-map");
        setIsCompletedMap(false);
        break;

      case GOLD:
        player.setAddGold(item.value);

        setMessage("Gold obtained: " + item.value);
        setItemObtained(true);
        if (isCompletedMap) navigate("/select-map");
        setIsCompletedMap(false);
        break;

      default:
        break;
    }
  };

  const getItemList = () => {
    return winnerGiftList.map((item, index) => (
      <div key={index} className="app-card">
        <img src={item.image} alt={item.name} />

        <CardTable modalType={modalType} item={item} />
        {modalType === WINNER && (
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              disabled={itemObtained}
              onClick={() => handleGetRewards(item)}
            >
              Get
            </Button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <Modal size="lg" show={modalWinner} onHide={handleModalWinnerClose}>
      <Modal.Header closeButton className="dark">
        <Modal.Title>Winner</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dark">
        {message && <h4 className="text-center text-warning">{message}</h4>}
        <div className="d-flex justify-content-center flex-wrap gap-1 mb-3">
          {list && list.length > 0 && getItemList()}
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
