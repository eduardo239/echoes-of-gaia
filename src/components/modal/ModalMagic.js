import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MAGIC } from "../../constants";
import CardTable from "../table/CardTable";
import { useEffect, useState } from "react";

const ModalMagic = ({
  list,
  modalType,
  modalMagic,
  handleModalMagicClose,
  setUseMagic = null,
  setIsMagicalAttack = false,
}) => {
  const [magicList, setMagicList] = useState([]);
  const clickUseMagic = (item) => {
    setUseMagic(item);
    handleModalMagicClose(true);
    setIsMagicalAttack(true);
  };

  useEffect(() => {
    if (list && list.length > 0 && list[0].magic) {
      setMagicList(list[0].magic);
    }

    return () => {};
  }, [list]);

  const get_items_list = () => {
    return magicList.map((item) => (
      <div key={item.id} className="app-card">
        {/* <img src={item.image} alt={item.name} /> */}
        <CardTable modalType={modalType} item={item} />
        {modalType === MAGIC && (
          <div className="d-grid gap-2">
            <Button
              size="lg"
              variant="danger"
              onClick={() => clickUseMagic(item)}
            >
              {item.name} - MP: {item.mp}
            </Button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <Modal size="xl" show={modalMagic} onHide={handleModalMagicClose}>
      <Modal.Header closeButton className="dark">
        <Modal.Title>Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body className="dark">
        <div className="d-flex justify-content-center flex-wrap gap-1">
          {list && list.length > 0 && get_items_list()}
        </div>
      </Modal.Body>
      <Modal.Footer className="dark">
        <Button variant="primary" onClick={handleModalMagicClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMagic;
