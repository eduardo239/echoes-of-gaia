import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GIFT } from "../../constants";
import CardTable from "../table/CardTable";

const ModalWinner = ({
  list,
  modalType,
  modalWinner,
  handleModalWinnerClose,
}) => {
  const handleGetItem = (item) => {
    console.log(item);
  };

  const get_items_list = () => {
    return list.map((item) => (
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
        <Modal.Title>Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dark">
        <div className="d-flex justify-content-center flex-wrap gap-1">
          {list && list.length > 0 && get_items_list()}
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
