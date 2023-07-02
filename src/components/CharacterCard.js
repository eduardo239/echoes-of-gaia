const CharacterCard = ({ character, children }) => {
  return (
    <div className="rpg-card">
      <img
        src={character?.avatar}
        alt={character?.description}
        className="card-image"
      />
      <div className="card-content">
        <h2 className="card-title mb-2">
          <b>{character?.name}</b>
        </h2>

        <p
          className={
            character.health <= 20
              ? "card-description text-alert"
              : "card-description"
          }
        >
          Health: {character?.health}/
          {character?.maxHealth ? character.maxHealth : "???"}
        </p>
        <p className="card-description">
          Mana: {character?.mana ? character.mana : "???"}
        </p>
        <p className="card-description">
          Experience: {character?.exp ? character.exp : "???"}
        </p>
        <p className="card-description">Strength: {character?.strength}</p>
        <p className="card-description">
          Gold: {character?.gold ? character.gold : 0}
        </p>
      </div>

      {children}

      <code>
        <small>{character?.id}</small>
      </code>
    </div>
  );
};

export default CharacterCard;
