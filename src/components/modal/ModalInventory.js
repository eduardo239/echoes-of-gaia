import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ITEM } from "../../constants";
import CardTable from "../table/CardTable";

const ModalInventory = ({
  list,
  modalType,
  modalInventory,
  handleModalInventoryClose,
  setUseItem = null,
  setUsingItem,
}) => {
  const clickUseItem = (item) => {
    setUseItem(item);
    handleModalInventoryClose(true);
    setUsingItem(true);
  };

  const get_items_list = () => {
    return list.map((item) => (
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
    <Modal size="xl" show={modalInventory} onHide={handleModalInventoryClose}>
      <Modal.Header closeButton className="dark">
        <Modal.Title>Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dark">
        <div className="d-flex justify-content-center flex-wrap gap-1">
          {list && list.length > 0 && get_items_list()}
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
