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
import { generateRandomMap, randomlyCombineArrays } from "../helper2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// modal
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BOSS, EMPTY, ENEMY, ITEM, NOTHING } from "../constants";
import HeroList from "../components2/HeroList";
import EnemyList from "../components2/EnemyList";
import InventoryList from "../components2/InventoryList";

const TheGame = () => {
  const { character, setCharacter, inventory, setInventory } =
    useContext(PlayerContext);

  // lists
  const [heroList, setHeroList] = useState([]);
  const [enemyList, setEnemyList] = useState([]);
  //
  const [gifts, setGifts] = useState([]);
  //
  const [gameMap, setGameMap] = useState([]);
  const [heroLocation, setHeroLocation] = useState(0);
  const [queue, setQueue] = useState([]);
  const [dice, setDice] = useState(0);
  // enable/disabled
  const [heroPlaying, setHeroPlaying] = useState(true);

  // modal
  const [modalShop, setModalShop] = useState(false);
  const handleModalShopClose = () => setModalShop(false);
  const handleModalShopShow = () => setModalShop(true);

  const [modalItem, setModalItem] = useState(false);
  const handleModalItemClose = () => setModalItem(false);
  const handleModalItemShow = () => setModalItem(true);

  const play = () => {
    const randomNumber = generateRandomNumber(1, 6);
    const newLocal = randomNumber + heroLocation;
    setDice(randomNumber);
    walkTo(newLocal);
  };
  const walkTo = (newLocal) => {
    const isLastLocation = newLocal >= gameMap.length - 1;
    if (isLastLocation) {
      setHeroPlaying(false);
      setHeroLocation(gameMap.length - 1);
      checkActualLocal(gameMap.length - 1);
    } else {
      setHeroLocation(newLocal);
      checkActualLocal(newLocal);
    }
  };
  const checkActualLocal = (local) => {
    const localType = gameMap[local][0].type;
    const localData = gameMap[local];

    // reset
    setGifts([]);
    setEnemyList([]);
    switch (localType) {
      case ENEMY:
        const newEnemyList = [];
        for (let i = 0; i < localData.length; i++) {
          const newEnemy = { ...localData[i] };
          newEnemy.id = uuidv4();
          newEnemyList.push(newEnemy);
        }
        setEnemyList(newEnemyList);
        startFight(heroes, newEnemyList);
        break;
      case ITEM:
        setGifts(localData);
        setModalItem(true);
        break;
      case BOSS:
        setEnemyList(localData);
        break;
      case EMPTY:
        console.log("Empty ok");
        break;
      default:
        break;
    }
  };
  const startFight = (_heroes, _enemyList) => {
    // gera a ordem aleatória dos turnos de batalha
    const versusList = randomlyCombineArrays(_heroes, _enemyList);
    setQueue(versusList);
  };
  const hit = () => {};
  const magic = () => {};
  const restart = () => {};
  const use = (item) => {
    // remove o item do inventário
    const updatedInventory = inventory.filter((x) => x.id !== item.id);
    setInventory(updatedInventory);
  };
  const get = (item) => {
    const purchasedItem = { ...item };
    purchasedItem.id = uuidv4();
    setInventory([...inventory, purchasedItem]);
    handleModalItemClose();
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
  const get_hero_fight_list = () => {
    return heroList.map((hero) => (
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
  const get_enemy_fight_list = () => {
    return enemyList.map((enemy) => (
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
  const get_item_gift_list = () => {
    return gifts.map((gift) => (
      <div key={gift.id} className="app-card">
        <img src={gift.image} alt="" />

        <div className="app-card-body">
          <p className="app-card-title">{gift.name}</p>
          <p>
            Value: <span id="hp">{gift.value}</span>
          </p>

          <p>
            Preço: <span>${gift.price}</span>
          </p>

          <div className="buttons">
            <button className="button" onClick={() => get(gift)}>
              Get
            </button>
          </div>
        </div>
      </div>
    ));
  };
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
    setHeroList(heroes);
    get_hero_fight_list();
    return () => {};
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col style={{ padding: 0 }}>
            <HeroList list={heroList} hit={hit} magic={magic} />
          </Col>
          <Col style={{ padding: 0, textAlign: "center" }} md="1">
            <p>Versus</p>
            <span>Dice: {dice}</span>
            <div>
              {queue &&
                queue.map((x, i) => (
                  <p className="map-turn" key={i}>
                    {x.name}
                  </p>
                ))}
            </div>
          </Col>
          <Col>
            <EnemyList list={enemyList} />
          </Col>
        </Row>
        <Row>
          <Col style={{ padding: 0 }}>
            <InventoryList list={inventory} use={use} sell={sell} />
          </Col>
          <Col style={{ padding: 0 }} md="1">
            <div className="d-grid gap-1">
              <Button
                style={{ borderRadius: 0 }}
                disabled={!heroPlaying}
                variant="primary"
                onClick={play}
              >
                Play
              </Button>
              <Button
                style={{ borderRadius: 0 }}
                variant="primary"
                onClick={handleModalShopShow}
              >
                Shop
              </Button>
              <Button
                style={{ borderRadius: 0 }}
                variant="secondary"
                onClick={restart}
              >
                Restart
              </Button>
            </div>
          </Col>
          <Col className="container-map">
            {heroes && heroes.length > 0 && get_map_list()}
          </Col>
        </Row>
      </Container>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

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

      <Modal size="xl" show={modalShop} onHide={handleModalShopClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shop Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center flex-wrap gap-1">
            {items && items.length > 0 && get_items_list()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalShopClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  */}
      <Modal size="xl" show={modalItem} onHide={handleModalItemClose}>
        <Modal.Header closeButton>
          <Modal.Title>Gift Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center flex-wrap gap-1">
            {items && items.length > 0 && get_item_gift_list()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalItemClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TheGame;
