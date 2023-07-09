import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ITEM } from "../../constants";
import CardTable from "../CardTable";

const ModalShop = ({ modalType, list, modalShop, handleModalShopClose }) => {
  const get_items_list = () => {
    return list.map((item) => (
      <div key={item.id} className="app-card">
        <img src={item.image} alt={item.name} />

        <CardTable modalType={modalType} item={item} />
        {modalType === ITEM && (
          <div className="d-grid gap-2">
            <Button variant="primary" size="sm">
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
        <Modal.Title>Shop Items</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dark">
        <div className="d-flex justify-content-center flex-wrap gap-1">
          {list && list.length > 0 && get_items_list()}
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
