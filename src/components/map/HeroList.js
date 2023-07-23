import Button from "react-bootstrap/Button";
import CardTable from "../table/CardTable";
import { HERO } from "../../constants";
import { useContext } from "react";
import { PlayerContext } from "../../hook/PlayerContext";

const HeroList = ({
  firstInTheQueue,
  isEnemyFighting,
  isUsingItem,
  isFighting,
  selectedCharacter,
  selectCharacter,
  selectedTargetToUseItem,
  setIsMagicalAttack,
  setIsPhysicalAttack,
  handleModalMagicShow,
}) => {
  const { heroList } = useContext(PlayerContext);

  const physicalAttack = () => {
    console.log("Physical Attack");
    setIsMagicalAttack(false);
    setIsPhysicalAttack(true);
  };
  const magicalAttack = () => {
    console.log("Magical Attack");
    setIsPhysicalAttack(false);
    handleModalMagicShow(true);
  };

  const mapForItems = () => {
    return (
      heroList &&
      heroList.map((hero) => (
        <div
          key={hero.id}
          className={`app-card ${isUsingItem ? "hero-picking" : ""} ${
            hero.status.hp < 1 ? "dead-character" : ""
          } ${firstInTheQueue?.id === hero.id ? "hero-active" : ""}`}
          onClick={isUsingItem ? () => selectedTargetToUseItem(hero) : null}
        >
          <div className="absolute-top-left hero-strength">
            <span>{hero.status.strength}</span>
          </div>

          <div className="absolute-top-right hero-intelligence">
            <span>{hero.status.intelligence}</span>
          </div>

          <img src={hero.image} alt={hero.name} />

          <CardTable modalType={HERO} item={hero} />

          {firstInTheQueue && (
            <div className="d-grid gap-2">
              <Button
                size="sm"
                onClick={physicalAttack}
                disabled={
                  isEnemyFighting ||
                  firstInTheQueue.id !== hero.id ||
                  !isFighting
                }
              >
                Attack
              </Button>
              <Button
                size="sm"
                onClick={magicalAttack}
                disabled={
                  isEnemyFighting ||
                  firstInTheQueue.id !== hero.id ||
                  !isFighting
                }
              >
                Magic
              </Button>
            </div>
          )}
        </div>
      ))
    );
  };

  return <>{heroList && heroList.length > 0 && mapForItems()}</>;
};

export default HeroList;
