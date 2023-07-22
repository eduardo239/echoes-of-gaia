import { useContext } from "react";
import { PlayerContext } from "../../hook/PlayerContext";
import CardTable from "../table/CardTable";
import { ENEMY } from "../../constants";

const EnemyList = ({
  firstInTheQueue,
  isEnemyFighting,
  isPhysicalAttack,
  isMagicalAttack,
  selectedTargetToAttack,
  selectedTargetToUseMagic,
}) => {
  const { enemyList } = useContext(PlayerContext);

  const mapForItems = () => {
    return enemyList.map((item) => (
      <div
        key={item.id}
        className={`app-card `}
        onClick={
          isPhysicalAttack && item.status.isAlive
            ? () => selectedTargetToAttack(item)
            : isMagicalAttack && item.status.isAlive
            ? () => selectedTargetToUseMagic(item)
            : null
        }
      >
        <img src={item.image} alt={item.name} />
        <CardTable modalType={ENEMY} item={item} />
      </div>
    ));
  };

  return <>{enemyList && enemyList.length > 0 && mapForItems()}</>;
};

export default EnemyList;
