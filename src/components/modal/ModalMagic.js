import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HERO, MAGIC } from "../../constants";
import CardTable from "../table/CardTable";
import { useEffect, useState } from "react";

const ModalMagic = ({
  list = [],
  character,
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
    return () => {
      if (!!character && character.type === HERO) setMagicList(character.magic);
    };
  }, [character]);

  const getItemList = () => {
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
          {magicList && magicList.length > 0 && getItemList()}
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
