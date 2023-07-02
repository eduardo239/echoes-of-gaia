const CharacterCardFightOptions = ({ turn, hit }) => {
  return (
    <div className="d-flex gap-2">
      <button disabled={turn === 1} className="btn btn-warning" onClick={hit}>
        {turn === 1 ? "Enemy Turn" : "Fight"}
      </button>
      <button
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#inventoryModal"
      >
        Inventory
      </button>
    </div>
  );
};

export default CharacterCardFightOptions;
