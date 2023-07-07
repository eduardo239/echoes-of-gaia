import Button from "react-bootstrap/Button";

const HeroList = ({ list = [], hit, magic, active = null, isFighting }) => {
  const get_hero_fight_list = () => {
    return list.map((hero) => (
      <div key={hero.id} className="app-card">
        <img src={hero.image} alt={hero.name} />

        <div className="app-card-body">
          <p className="app-card-title">{hero.name}</p>
          <p>
            Mana: <span id="mana">{hero.mp}</span>
          </p>
          <p>
            HP: <span id="hp">{hero.hp}</span>
          </p>
          <div className="buttons">
            <Button
              className="button"
              onClick={hit}
              disabled={(active && active.id !== hero.id) || !isFighting}
            >
              Attack
            </Button>
            <Button
              className="button"
              onClick={magic}
              disabled={(active && active.id !== hero.id) || !isFighting}
            >
              Magic
            </Button>
          </div>
          <p>
            Level: <span>1</span>
          </p>
        </div>
        <div className="app-card-footer">
          <code>{hero.id}</code>
        </div>
      </div>
    ));
  };

  return (
    <div className="d-flex">
      {list && list.length > 0 && get_hero_fight_list()}
    </div>
  );
};

export default HeroList;
