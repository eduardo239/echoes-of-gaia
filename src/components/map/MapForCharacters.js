import Button from "react-bootstrap/Button";
import CardTable from "../table/CardTable";
import { BOSS, ENEMY, HERO, SELECT_HERO } from "../../helper/constants";

const MapForCharacters = ({
  list = [],
  modalType,
  isFighting = false,
  isEnemyFighting = null,
  firstInTheQueue = null,
  physicalAttack = null,
  magicalAttack = null,
  isPhysicalAttack = false,
  isMagicalAttack = true,
  selectedTargetToAttack = null,
  selectedTargetToUseItem = null,
  isUsingItem = false,
  selectCharacter = null,
  selectedCharacter = [],
  removeCharacter = null,
  selectedTargetToUseMagic = null,
}) => {
  const mapForItems = () => {
    return list.map((item) => (
      <div
        key={item.id}
        className={`app-card ${
          !isEnemyFighting &&
          modalType === ENEMY &&
          isPhysicalAttack &&
          item.status.isAlive
            ? "enemy-picking-attack"
            : modalType === HERO && isUsingItem
            ? "hero-picking"
            : modalType === ENEMY && isMagicalAttack
            ? "enemy-picking-magic"
            : ""
        } ${
          (modalType === HERO ||
            modalType === SELECT_HERO ||
            modalType === ENEMY ||
            modalType === BOSS) &&
          item.status.isAlive
            ? ""
            : "dead-character"
        } ${
          modalType === SELECT_HERO && selectedCharacter.indexOf(item) !== -1
            ? "hero-selected"
            : ""
        }`}
        onClick={
          modalType === ENEMY && isPhysicalAttack && item.status.isAlive
            ? () => selectedTargetToAttack(item)
            : modalType === HERO && isUsingItem
            ? () => selectedTargetToUseItem(item)
            : modalType === ENEMY && isMagicalAttack && item.status.isAlive
            ? () => selectedTargetToUseMagic(item)
            : null
        }
      >
        {/* imagem */}
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
            <Button
              size="sm"
              onClick={() => selectCharacter(item)}
              className={`${
                modalType === SELECT_HERO &&
                selectedCharacter.indexOf(item) !== -1
                  ? "none"
                  : ""
              }`}
            >
              Select
            </Button>

            <Button
              size="sm"
              onClick={() => removeCharacter(item)}
              className={`${
                modalType === SELECT_HERO &&
                selectedCharacter.indexOf(item) === -1
                  ? "none"
                  : ""
              }`}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    ));
  };

  return <>{list && list.length > 0 && mapForItems()}</>;
};

export default MapForCharacters;
