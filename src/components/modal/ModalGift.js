import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GIFT } from "../../helper/constants";
import CardTable from "../table/CardTable";
import { useContext } from "react";
import { PlayerContext } from "../../hook/PlayerContext";
import { addItemByType } from "../../helper";

const ModalGift = ({ modalType, modalGift, handleModalGiftClose }) => {
  const {
    giftItemList,
    setGiftItemList,
    inventory,
    setInventory,
    setInventoryByType,
  } = useContext(PlayerContext);

  const handleGetItem = (item) => {
    setInventory([...inventory, item]);
    handleModalGiftClose(true);
    setGiftItemList([]);
    setInventoryByType(addItemByType([...inventory, item]));
  };

  const get_items_list = () => {
    return giftItemList.map((item) => (
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
    <Modal size="lg" show={modalGift} onHide={handleModalGiftClose}>
      <Modal.Header closeButton className="dark">
        <Modal.Title>Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dark">
        <div className="d-flex justify-content-center flex-wrap gap-1">
          {giftItemList && giftItemList.length > 0 && get_items_list()}
        </div>
      </Modal.Body>
      <Modal.Footer className="dark">
        <Button variant="primary" onClick={handleModalGiftClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalGift;
