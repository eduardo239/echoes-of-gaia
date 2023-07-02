const StartGameOptions = ({ isFighting, rollTheDice, dice, gift = null }) => {
  return (
    <div className="d-inline-flex gap-3">
      <button
        disabled={isFighting}
        className="btn btn-info mb-3"
        onClick={rollTheDice}
      >
        Roll The Dice {dice}
      </button>
      <button
        disabled={isFighting}
        type="button"
        className="btn btn-info mb-3"
        data-bs-toggle="modal"
        data-bs-target="#shopModal"
      >
        Shop
      </button>
      <button
        disabled={isFighting}
        type="button"
        className="btn btn-info mb-3"
        data-bs-toggle="modal"
        data-bs-target="#inventoryModal"
      >
        Inventory
      </button>

      {gift && gift.length > 0 && (
        <button
          disabled={isFighting}
          type="button"
          className="btn btn-info mb-3"
          data-bs-toggle="modal"
          data-bs-target="#giftModal"
        >
          Gift
        </button>
      )}
    </div>
  );
};

export default StartGameOptions;
