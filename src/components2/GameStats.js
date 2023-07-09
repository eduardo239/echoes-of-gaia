const GameStats = ({ queue, dice }) => {
  return (
    <>
      <h3>Versus</h3>
      <span>Dice: {dice}</span>
      <br />
      <br />
      <div style={{ textAlign: "left" }}>
        {queue &&
          queue.length > 0 &&
          queue.map((x, i) => (
            <p className="map-turn" key={i}>
              {i} - {x.name}
            </p>
          ))}
      </div>
    </>
  );
};

export default GameStats;
