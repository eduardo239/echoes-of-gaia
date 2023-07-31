import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ITEM } from "../../helper/constants";
import CardTable from "../table/CardTable";
import { useContext } from "react";
import { PlayerContext } from "../../hook/PlayerContext";
import { addItemByType } from "../../helper";
import { useEffect } from "react";
import { ReactComponent as IconWallet } from "../../assets/icons-b/mingcute_wallet-2-line.svg";

const ModalInventory = ({
  modalType,
  modalInventory,
  handleModalInventoryClose,
  setUseItem = null,
  setIsUsingItem = false,
}) => {
  const { inventory, inventoryByType, setInventoryByType } =
    useContext(PlayerContext);

  const clickUseItem = (item) => {
    setUseItem(item);
    handleModalInventoryClose(true);
    setIsUsingItem(true);
  };

  const loadItemsByType = () => {
    if (inventory) {
      const itemsByType = addItemByType(inventory);

      const _itemsByType = [];
      for (const key in itemsByType) {
        if (Object.hasOwnProperty.call(itemsByType, key)) {
          const element = itemsByType[key];
          _itemsByType.push(element);
        }
      }
      setInventoryByType(_itemsByType);
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
    return inventoryByType.map((item, index) => (
      <div key={index} className="app-card">
        <div className="card-image">
          <img src={item[0].image} alt={item[0].name} />

          <div className="absolute-top-right gold-label">
            <IconWallet /> Quantity: <span>{item.length}</span>
          </div>
        </div>

        <CardTable modalType={modalType} item={item[0]} />
        {modalType === ITEM && (
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => clickUseItem(item[0])}
            >
              Use
            </Button>
          </div>
        )}
      </div>
    ));
  };
  // const getItemList = () => {
  //   return inventory.map((item) => (
  //     <div key={item.id} className="app-card">
  //       <img src={item.image} alt={item.name} />

  //       <CardTable modalType={modalType} item={item} />
  //       {modalType === ITEM && (
  //         <div className="d-grid gap-2">
  //           <Button
  //             variant="primary"
  //             size="sm"
  //             onClick={() => clickUseItem(item)}
  //           >
  //             Use
  //           </Button>
  //         </div>
  //       )}
  //     </div>
  //   ));
  // };

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
