import Button from "react-bootstrap/Button";
import { SELECT_MAP } from "../../constants";
import CardTable from "../table/CardTable";

const MapForMaps = ({ list, selectMap, modalType }) => {
  const map_for_items = () => {
    return list.map((item) => (
      <div key={item.id} className={`app-card `}>
        <img src={item.image} alt={item.name} />
        <CardTable modalType={modalType} item={item} />

        {modalType === SELECT_MAP && (
          <div className="d-grid gap-2">
            <Button size="sm" onClick={() => selectMap(item)}>
              Select
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

export default MapForMaps;
