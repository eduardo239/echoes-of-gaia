import Button from "react-bootstrap/Button";
import CardTable from "../table/CardTable";
import { BOSS, ENEMY, HERO, SELECT_HERO } from "../../constants";

const MapForCharacters = ({
  list = [],
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
  isUsingItem = false,
  selectCharacter = null,
  removeCharacter = null,
}) => {
  const map_for_items = () => {
    return list.map((item) => (
      <div
        key={item.id}
        className={`app-card ${
          !isEnemyFighting &&
          modalType === ENEMY &&
          (isPhysicalAttack || isMagicalAttack) &&
          item.status.isAlive
            ? "hero-picking "
            : modalType === HERO && isUsingItem
            ? "hero-picking "
            : " "
        } ${
          (modalType === HERO ||
            modalType === SELECT_HERO ||
            modalType === ENEMY ||
            modalType === BOSS) &&
          item.status.isAlive
            ? " "
            : "dead-character "
        }`}
        onClick={
          modalType === ENEMY &&
          (isPhysicalAttack || isMagicalAttack) &&
          item.status.isAlive
            ? () => selectedTarget(item)
            : modalType === HERO && isUsingItem
            ? () => selectedTargetToUseItem(item)
            : null
        }
      >
        <img src={item.image} alt={item.name} />
        <CardTable modalType={modalType} item={item} />

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

        {modalType === SELECT_HERO && (
          <div className="d-grid gap-2">
            <Button size="sm" onClick={() => selectCharacter(item)}>
              Select
            </Button>

            <Button size="sm" onClick={() => removeCharacter(item)}>
              Remove
            </Button>
          </div>
        )}
      </div>
    ));
  };

  return <>{list && list.length > 0 && map_for_items()}</>;
};

export default MapForCharacters;
