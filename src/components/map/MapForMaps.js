import Button from "react-bootstrap/Button";
import CardTable from "../table/CardTable";

const MapForMaps = ({ list, selectMap, modalType, selectedMap }) => {
  const mapForItems = () => {
    return list.map((item) => (
      <div
        key={item.id}
        className={`app-card ${
          selectedMap.indexOf(item) !== -1 ? "hero-selected" : ""
        }`}
      >
        <img src={item.image} alt={item.name} />
        <CardTable modalType={modalType} item={item} />

        <div className="d-grid gap-2">
          <Button
            disabled={!item.isAvailable || item.isCompleted}
            size="sm"
            variant={
              !item.isAvailable
                ? "dark"
                : item.isAvailable && item.isCompleted
                ? "dark"
                : "primary"
            }
            onClick={() => selectMap(item)}
          >
            {item.isAvailable && !item.isCompleted
              ? "Select"
              : item.isCompleted && item.isCompleted
              ? "Completed"
              : "Unavailable"}
          </Button>
        </div>
      </div>
    ));
  };
  return <>{list && list.length > 0 && mapForItems()}</>;
};

export default MapForMaps;
