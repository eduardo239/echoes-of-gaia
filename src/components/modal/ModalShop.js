import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ITEM } from "../../constants";
import CardTable from "../table/CardTable";
import { useContext } from "react";
import { PlayerContext } from "../../hook/PlayerContext";

const ModalShop = ({ modalType, modalShop, handleModalShopClose }) => {
  const { player, setPlayer, inventory, setInventory, shopItems } =
    useContext(PlayerContext);

  const buyItem = (item) => {
    const _player = player;

    if (item.price > _player.gold) {
      // setMessage("Insufficient gold");
    } else {
      const newItem = { ...item };
      newItem.id = uuidv4();
      setInventory([...inventory, newItem]);
      player.gold -= item.price;
    }
  };

  const get_items_list = () => {
    return shopItems.map((item) => (
      <div key={item.id} className="app-card">
        <img src={item.image} alt={item.name} />

        <CardTable modalType={modalType} item={item} />
        {modalType === ITEM && (
          <div className="d-grid gap-2">
            <Button variant="primary" size="sm" onClick={() => buyItem(item)}>
              Buy
            </Button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <Modal size="xl" show={modalShop} onHide={handleModalShopClose}>
      <Modal.Header closeButton className="dark">
        <Modal.Title>Shop Items - Gold ${123}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dark">
        <div className="d-flex justify-content-center flex-wrap gap-1">
          {shopItems && shopItems.length > 0 && get_items_list()}
        </div>
      </Modal.Body>
      <Modal.Footer className="dark">
        <Button variant="primary" onClick={handleModalShopClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalShop;
