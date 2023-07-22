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
    // get_random_item();
    // get_exp2();
    // get_random_gold();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get_random_gold = () => {
    const gold = player.gold;
    return 40;
  };

  /**
   * When your character is weaker than the enemy he’s facing, he will gain maximum experience (~49 points).
    If your character is more or less on the same level with the enemy he’s facing, he will gain mediocre amount of experience (~20-30 points).
    If your character is stronger than the enemy he’s facing, he will gain minimum experience (~1-3 points).} level 
   *
   */

  const next_level = (level) => {
    return Math.round((4 * Math.sqrt(level)) / 5) * 10;
  };

  const get_exp = (level, factor) => {
    return Math.ceil(factor * level + 1);
  };

  const get_random_exp = () => {
    console.log(player);
    // return round((4 * (level ^ 3)) / 5)
    const level = player.level;
    const factor = 1.5;

    const getExp = get_exp(level, factor);
    const nextLevel = next_level(level);

    if (getExp + player.exp > nextLevel) {
      console.log("level up");
      const remainExp = getExp + player.exp - nextLevel;
      player.level += 1;
      player.exp = remainExp;
      player.nextLevel = next_level(player.level + 1);
    } else {
      console.log("level added");
      player.exp += getExp;
    }
  };

  const get_random_item = () => {
    const item = chooseRandomItem(items);
    const newItem = new Item(
      item.name,
      item.image,
      item.type,
      item._class,
      item.value,
      item.price
    );
    setWinnerGiftList([...winnerGiftList, newItem]);
  };

  const handleGetItem = (item) => {
    console.log(item);
    get_random_exp();
    get_random_gold();
    handleModalWinnerClose();
  };

  const get_items_list = () => {
    return winnerGiftList.map((item) => (
      <div key={item.id} className="app-card">
        <img src={item.image} alt={item.name} />

        <CardTable modalType={modalType} item={item} />
        {modalType === GIFT && (
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleGetItem(item)}
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
          {list && list.length > 0 && get_items_list()}
          <div>
            <Button variant="primary" size="lg" onClick={() => handleGetItem()}>
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
