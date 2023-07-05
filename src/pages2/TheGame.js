/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  generateRandomItemAndPlaceItems,
  generateRandomNumber,
  getRandomItem,
  rollDice,
} from "../helper";
import { PlayerContext } from "../hook/PlayerContext";
import { useNavigate } from "react-router-dom";
import { heroes, enemies, items, bosses } from "../server2";
import CharacterCard from "../components/CharacterCard";
import ModalItems from "../components/ModalItems";
import CharacterCardFightOptions from "../components/CharacterCardFightOptions";
import StartGameOptions from "../components/StartGameOptions";
import StartGamePlaceItems from "../components/StartGamePlaceItems";
import { generateRandomMap } from "../helper2";

// modal
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const TheGame = () => {
  const { character, setCharacter, inventory, setInventory } =
    useContext(PlayerContext);

  const [gameMap, setGameMap] = useState([]);
  const [heroLocation, setHeroLocation] = useState(0);

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const hit = () => {};
  const magic = () => {};
  const use = (item) => {
    // remove o item do inventário
    const updatedInventory = inventory.filter((x) => x.id !== item.id);
    setInventory(updatedInventory);
  };
  const buy = (item) => {
    const purchasedItem = { ...item };
    purchasedItem.id = uuidv4();
    setInventory([...inventory, purchasedItem]);
  };
  const sell = (item) => {
    // TODO: add ouro ao total
    const gold = item.price;
    // remove o item do inventário
    const updatedInventory = inventory.filter((x) => x.id !== item.id);
    setInventory(updatedInventory);
  };
  //
  const get_heroes_list = () => {
    return heroes.map((hero) => (
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
      </div>
    ));
  };
  //
  const get_enemies_list = () => {
    return enemies.map((enemy) => (
      <div key={enemy.id} className="app-card">
        <img src={enemy.image} alt="" />

        <div className="app-card-body">
          <p className="app-card-title">{enemy.name}</p>
          <p>
            HP: <span id="hp">{enemy.hp}</span>
          </p>

          <p>
            Level: <span>{enemy.level}</span>
          </p>
        </div>
      </div>
    ));
  };
  //
  const get_items_list = () => {
    return items.map((item) => (
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
            <button className="button" onClick={() => buy(item)}>
              Buy
            </button>
          </div>
        </div>
      </div>
    ));
  };
  //
  const get_bosses_list = () => {
    return bosses.map((boss) => (
      <div key={boss.id} className="app-card">
        <img src={boss.image} alt="" />

        <div className="app-card-body">
          <p className="app-card-title">{boss.name}</p>
          <p>
            HP: <span id="hp">{boss.hp}</span>
          </p>

          <p>
            Level: <span>{boss.level}</span>
          </p>
        </div>
      </div>
    ));
  };

  // map
  const get_map_list = () => {
    return gameMap.map((local, index) => (
      <li
        key={index}
        className={
          heroLocation === index ? "map-location active" : "map-location"
        }
      >
        {index} -{" "}
        {local.length === 1 ? local[0].type : local.map((i) => i.type + " ")}
      </li>
    ));
  };

  // inventory
  const get_inventory_list = () => {
    return inventory && inventory.length > 0 ? (
      inventory.map((item) => (
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
      ))
    ) : (
      <div>Empty list</div>
    );
  };

  useEffect(() => {
    const result = generateRandomMap();
    setGameMap(result);
    return () => {};
  }, []);

  return (
    <div>
      <h5>Layout</h5>

      <div className="container text-center">
        <div className="row">
          <div className="col">heroes</div>
          <div className="col-3">vs</div>
          <div className="col">enemies</div>
        </div>
        <div className="row">
          <div className="col">inventory</div>
          <div className="col-3">options</div>
          <div className="col">map</div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      <h5>Game - Inventory</h5>
      <div className="d-flex justify-content-center flex-wrap gap-2">
        {inventory && inventory.length > 0 && get_inventory_list()}
      </div>

      <h5>Game - Menu</h5>
      <div className="d-grid gap-2">
        <Button variant="primary">Play</Button>
        <Button variant="primary" onClick={handleShow}>
          Shop
        </Button>
        <Button variant="secondary">Restart</Button>
      </div>

      <h5>Map</h5>
      <div className="d-grid flex-wrap">
        {heroes && heroes.length > 0 && get_map_list()}
      </div>

      <h5>Cards - Heroes</h5>
      <div className="d-flex justify-content-center flex-wrap gap-2">
        {heroes && heroes.length > 0 && get_heroes_list()}
      </div>

      <h5>Cards - Enemies</h5>
      <div className="d-flex justify-content-center flex-wrap gap-2">
        {enemies && enemies.length > 0 && get_enemies_list()}
      </div>

      <h5>Cards - Items</h5>
      <div className="d-flex justify-content-center flex-wrap gap-2">
        {items && items.length > 0 && get_items_list()}
      </div>

      <h5>Cards - Bosses</h5>
      <div className="d-flex justify-content-center flex-wrap gap-2">
        {bosses && bosses.length > 0 && get_bosses_list()}
      </div>

      <h5>Modal - Shop</h5>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shop Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center flex-wrap gap-2">
            {items && items.length > 0 && get_items_list()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TheGame;
