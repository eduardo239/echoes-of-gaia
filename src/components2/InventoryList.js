const InventoryList = ({ list = [], use, sell }) => {
  const get_inventory_list = () => {
    return list.map((item) => (
      <div key={item.id} className="app-card">
        <img src={item.image} alt="" />
        <div className="app-card-body">
          <p className="app-card-title">{item.name}</p>
          <p>
            Value: <span id="hp">{item.value}</span>
          </p>
          <p>
            Preço: <span>${item.price}</span>
          </p>
          <div className="buttons">
            <button className="button" onClick={() => use(item)}>
              Use
            </button>
            <button className="button" onClick={() => sell(item)}>
              Sell
            </button>
          </div>
        </div>
        <div className="app-card-footer">
          <code>{item.id}</code>
        </div>
      </div>
    ));
  };

  return (
    <div className="d-flex">
      {list && list.length > 0 && get_inventory_list()}
    </div>
  );
};

export default InventoryList;
