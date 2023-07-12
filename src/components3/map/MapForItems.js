import Button from "react-bootstrap/Button";
import CardTable from "../CardTable";
import { ENEMY, HERO, ITEM } from "../../constants";

const MapForItems = ({
  list,
  modalType,
  isFighting = false,
  isEnemyFighting = null,
  firstInTheQueue = null,
  physicalAttack = null,
  magicalAttack = null,
  isPhysicalAttack = false,
  isMagicalAttack = false,
  selectedTarget = null,
  selectedTargetToUseItem = null,
  isUsingItem,
}) => {
  const map_for_items = () => {
    return list.map((item) => (
      <div
        key={item.id}
        className={`${
          !isEnemyFighting &&
          modalType === ENEMY &&
          (isPhysicalAttack || isMagicalAttack)
            ? "hero-picking"
            : modalType === HERO && isUsingItem
            ? "hero-picking"
            : ""
        } app-card ${item.live ? "" : "dead-character"}`}
        onClick={
          modalType === ENEMY && (isPhysicalAttack || isMagicalAttack)
            ? () => selectedTarget(item)
            : modalType === HERO && isUsingItem
            ? () => selectedTargetToUseItem(item)
            : null
        }
      >
        <img src={item.image} alt={item.name} />
        <CardTable modalType={modalType} item={item} />

        {modalType === ITEM && (
          <div className="d-grid gap-2">
            <Button variant="primary" size="sm">
              Buy
            </Button>
          </div>
        )}
        {firstInTheQueue && modalType === HERO && (
          <div className="d-grid gap-2">
            <Button
              size="sm"
              onClick={physicalAttack}
              disabled={
                isEnemyFighting || firstInTheQueue.id !== item.id || !isFighting
              }
            >
              Attack
            </Button>
            <Button
              size="sm"
              onClick={magicalAttack}
              disabled={
                isEnemyFighting || firstInTheQueue.id !== item.id || !isFighting
              }
            >
              Magic
            </Button>
          </div>
        )}

        {/* <div className="app-card-footer">
          <code>{item.id}</code>
        </div> */}
      </div>
    ));
  };

  return <>{list && list.length > 0 && map_for_items()}</>;
};

export default MapForItems;
