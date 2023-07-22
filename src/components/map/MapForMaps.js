import Button from "react-bootstrap/Button";
import CardTable from "../table/CardTable";

const MapForMaps = ({ list, selectMap, modalType, selectedCharacter }) => {
  const mapForItems = () => {
    return list.map((item) => (
      <div
        key={item.id}
        className={`app-card ${
          selectedCharacter.indexOf(item) !== -1 ? "hero-selected" : ""
        }`}
      >
        <img src={item.image} alt={item.name} />
        <CardTable modalType={modalType} item={item} />

        <div className="d-grid gap-2">
          <Button size="sm" onClick={() => selectMap(item)}>
            Select
          </Button>
        </div>
      </div>
    ));
  };
  return <>{list && list.length > 0 && mapForItems()}</>;
};

export default MapForMaps;
