const EnemyList = ({ list = [], isHeroAttacking, characterAttack }) => {
  const get_enemy_fight_list = () => {
    return list.map((enemy) => (
      <div
        key={enemy.id}
        onClick={isHeroAttacking ? () => characterAttack(enemy) : null}
        className={`app-card app-card__enemy ${
          isHeroAttacking ? "is-hero-attacking" : ""
        }`}
      >
        <img src={enemy.image} alt={enemy.name} />

        <div className="app-card-body">
          <p className="app-card-title">{enemy.name}</p>
          <p>
            HP: <span id="hp">{enemy.hp}</span>
          </p>

          <p>
            Level: <span>{enemy.level}</span>
          </p>
        </div>
        <div className="app-card-footer">
          <code>{enemy.id}</code>
        </div>
      </div>
    ));
  };

  return (
    <div className="d-flex">
      {list && list.length > 0 && get_enemy_fight_list()}
    </div>
  );
};

export default EnemyList;
