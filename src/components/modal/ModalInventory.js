import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ITEM } from "../../constants";
import CardTable from "../table/CardTable";
import { useContext } from "react";
import { PlayerContext } from "../../hook/PlayerContext";
import { addItemByType } from "../../helper";
import { useEffect } from "react";

const ModalInventory = ({
  modalType,
  modalInventory,
  handleModalInventoryClose,
  setUseItem = null,
  setIsUsingItem = false,
}) => {
  const { inventory, setInventoryByType } = useContext(PlayerContext);

  const clickUseItem = (item) => {
    setUseItem(item);
    handleModalInventoryClose(true);
    setIsUsingItem(true);
  };

  const loadItemsByType = () => {
    if (inventory) {
      const invByType = addItemByType(inventory);
      const keysArray = Object.keys(invByType);
      console.log(keysArray.length);
      // TODO: separate itens by type
    }
  };

  useEffect(() => {
    loadItemsByType();
    return () => {
      setInventoryByType([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalInventory]);

  const getItemList = () => {
    return inventory.map((item) => (
      <div key={item.id} className="app-card">
        <img src={item.image} alt={item.name} />

        <CardTable modalType={modalType} item={item} />
        {modalType === ITEM && (
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => clickUseItem(item)}
            >
              Use
            </Button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <Modal size="lg" show={modalInventory} onHide={handleModalInventoryClose}>
      <Modal.Header closeButton className="dark">
        <Modal.Title>Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dark">
        <div className="d-flex justify-content-center flex-wrap gap-1">
          {inventory && inventory.length > 0 && getItemList()}
        </div>
      </Modal.Body>
      <Modal.Footer className="dark">
        <Button variant="primary" onClick={handleModalInventoryClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInventory;
