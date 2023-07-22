import { PLAYER } from "../../constants";
import CardTable from "../table/CardTable";

const PlayerList = ({ player }) => {
  if (player)
    return (
      <div key={player.id} className={`app-card`}>
        <img src={player.image} alt={player.name} />
        <CardTable modalType={PLAYER} item={player} />

        <div className="d-grid gap-2">
          {/* <Button size="sm" onClick={() => selectMap(item)}>
      Select
    </Button> */}
        </div>
      </div>
    );
  return null;
};

export default PlayerList;
