import Button from "react-bootstrap/Button";
import CardTable from "../CardTable";
import { ENEMY, HERO, ITEM } from "../../constants";

const MapForItems = ({
  list,
  modalType,
  isEnemyFighting = null,
  firstInTheQueue = null,
  physicalAttack = null,
  magicalAttack = null,
  isPhysicalAttack = false,
  isMagicalAttack = false,
  selectedTarget = null,
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
            : ""
        } app-card ${item.live ? "" : "dead-character"}`}
        onClick={
          modalType === ENEMY && (isPhysicalAttack || isMagicalAttack)
            ? () => selectedTarget(item)
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
              disabled={isEnemyFighting || firstInTheQueue.id !== item.id}
            >
              Attack
            </Button>
            <Button
              size="sm"
              onClick={magicalAttack}
              disabled={isEnemyFighting || firstInTheQueue.id !== item.id}
            >
              Magic
            </Button>
          </div>
        )}

        <div className="app-card-footer">
          <code>{item.id}</code>
        </div>
      </div>
    ));
  };

  return <>{list && list.length > 0 && map_for_items()}</>;
};

export default MapForItems;
