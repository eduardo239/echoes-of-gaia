const HeroList = ({ list = [], hit, magic }) => {
  const get_hero_fight_list = () => {
    return list.map((hero) => (
      <div key={hero.id} className="app-card">
        <img src={hero.image} alt="" />

        <div className="app-card-body">
          <p className="app-card-title">{hero.name}</p>
          <p>
            Mana: <span id="mana">{hero.mp}</span>
          </p>
          <p>
            HP: <span id="hp">{hero.hp}</span>
          </p>
          <div className="buttons">
            <button className="button" onClick={hit}>
              Attack
            </button>
            <button className="button" onClick={magic}>
              Magic
            </button>
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
