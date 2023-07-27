import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ITEM } from "../../helper/constants";
import CardTable from "../table/CardTable";
import { useContext } from "react";
import { PlayerContext } from "../../hook/PlayerContext";
import { addItemByType } from "../../helper";
import { ReactComponent as IconWallet } from "../../assets/icons-b/mingcute_wallet-2-line.svg";

const ModalShop = ({ modalType, modalShop, handleModalShopClose }) => {
  const { player, inventory, setInventory, setInventoryByType, shopItems } =
    useContext(PlayerContext);

  const buyItem = (item) => {
    if (item.price > player.gold) {
      // setMessage("Insufficient gold");
    } else {
      const newItem = { ...item };
      newItem.id = uuidv4();
      setInventory([...inventory, newItem]);
      player.gold -= item.price;
      setInventoryByType(addItemByType([...inventory, newItem]));
    }
  };

  const getItemList = () => {
    return shopItems.map((item) => (
      <div key={item.id} className="app-card">
        <div className="card-image">
          <img src={item.image} alt={item.name} />
          <div className="absolute-top-right gold-label">
            <IconWallet /> <span>{item.price}</span>
          </div>
        </div>

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
    <Modal size="lg" show={modalShop} onHide={handleModalShopClose}>
      <Modal.Header closeButton className="dark">
        <Modal.Title>Shop Items - Gold ${123}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dark">
        <div className="d-flex justify-content-center flex-wrap gap-1">
          {shopItems && shopItems.length > 0 && getItemList()}
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
