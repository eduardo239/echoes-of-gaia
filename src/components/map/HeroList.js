import Button from "react-bootstrap/Button";
import CardTable from "../table/CardTable";
import { HERO } from "../../helper/constants";
import { useContext } from "react";
import { PlayerContext } from "../../hook/PlayerContext";
import { ReactComponent as IconSword } from "../../assets/icons/mingcute_sword-line.svg";
import { ReactComponent as IconMagic } from "../../assets/icons/mingcute_react-line.svg";

const HeroList = ({
  firstInTheQueue,
  isEnemyFighting,
  isUsingItem,
  isFighting,
  isPhysicalAttack,
  // selectedCharacter,
  // selectCharacter,
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
          <div className="card-image">
            <img src={hero.image} alt={hero.name} />
            <div className="absolute-bottom-left hero-strength">
              <IconSword /> <span>{hero.status.strength}</span>
            </div>

            <div className="absolute-bottom-right hero-intelligence">
              <IconMagic /> <span>{hero.status.intelligence}</span>
            </div>
          </div>

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
                variant={
                  firstInTheQueue?.id === hero.id && isPhysicalAttack
                    ? "danger"
                    : "primary"
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
