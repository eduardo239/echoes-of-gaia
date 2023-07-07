/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { generateRandomNumber } from "../helper";
import { PlayerContext } from "../hook/PlayerContext";
import { heroes, enemies, items, bosses } from "../server2";
import {
  rearrangeList,
  generateRandomMap,
  randomlyCombineArrays,
  chooseRandomItem,
} from "../helper2";
//
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import HeroList from "../components2/HeroList";
import EnemyList from "../components2/EnemyList";
import Container from "react-bootstrap/Container";
import InventoryList from "../components2/InventoryList";
import { BOSS, EMPTY, ENEMY, HERO, ITEM } from "../constants";
import GameStats from "../components2/GameStats";

const TheGame = () => {
  const { inventory, setInventory } = useContext(PlayerContext);

  //
  const [heroList, setHeroList] = useState([]);
  const [enemyList, setEnemyList] = useState([]);
  //
  const [gifts, setGifts] = useState([]);
  //
  const [gameMap, setGameMap] = useState([]);
  const [heroLocation, setHeroLocation] = useState(0);
  const [dice, setDice] = useState(0);
  //
  const [turn, setTurn] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isFighting, setIsFighting] = useState(false);
  const [isHeroAttacking, setIsHeroAttacking] = useState(false);
  //

  // modal
  const [modalShop, setModalShop] = useState(false);
  const handleModalShopClose = () => setModalShop(false);
  const handleModalShopShow = () => setModalShop(true);
  //
  const [modalItem, setModalItem] = useState(false);
  const handleModalItemClose = () => setModalItem(false);
  const handleModalItemShow = () => setModalItem(true);
  //

  useEffect(() => {
    if (queue && queue.length > 0) {
      if (queue[0].type === ENEMY) {
        setTurn(1);
        enemyAttack();
      } else if (queue[0].type === HERO) {
        setTurn(0);
      }
    }
    return () => {};
  }, [queue, turn]);

  const attack = () => {
    setIsHeroAttacking(true);
  };
  const enemyAttack = () => {
    setIsHeroAttacking(false);
    const dmg = generateRandomNumber(20, 40);
    const hero = chooseRandomItem(heroList);
    // TODO: buscar um herói aleatório
    setTimeout(() => {
      console.log("inimigo atacando");
    }, 500);
    heroList[0].hp -= dmg;
    const newHeroList = heroList;
    setHeroList(newHeroList);
    // fim do turno
    console.log(queue[1].type);
    if (queue[1].type === HERO) setTurn(0);
    else setTurn(1);
    setQueue(rearrangeList(queue));
  };

  const hit = (enemy) => {
    for (let i = 0; i < enemyList.length; i++) {
      if (enemyList[i].id === enemy.id) {
        const dmg = generateRandomNumber(20, 40);
        enemyList[i].hp -= dmg;
        const newEnemyList = enemyList;
        setEnemyList(newEnemyList);
      }
    }
    // fim do turno
    console.log(queue[1].type);
    if (queue[1].type === HERO) setTurn(0);
    else setTurn(1);
    setQueue(rearrangeList(queue));
  };
  const magic = () => {};
  const restart = () => {};
  const play = () => {
    const randomNumber = generateRandomNumber(1, 6);
    const newLocal = randomNumber + heroLocation;
    setDice(randomNumber);
    walkTo(newLocal);
  };
  const walkTo = (newLocal) => {
    const isLastLocation = newLocal >= gameMap.length - 1;
    if (isLastLocation) {
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
        // inicia a lista
        setEnemyList(newEnemyList);
        const battleOrderList = randomlyCombineArrays(heroes, newEnemyList);
        setQueue(battleOrderList);
        // inicia a luta

        setIsFighting(true);
        break;
      case ITEM:
        setGifts(localData);
        setModalItem(true);
        break;
      case BOSS:
        setEnemyList(localData);
        break;
      case EMPTY:
        //
        break;
      default:
        break;
    }
  };
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
            <button className="button" onClick={attack}>
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
          heroLocation === index
            ? "map-location active"
            : heroLocation - 1 > index
            ? "none"
            : "map-location"
        }
      >
        {index} -{" "}
        {local.length === 1 ? local[0].type : local.map((i) => i.type + " ")}
      </li>
    ));
  };

  useEffect(() => {
    const result = generateRandomMap();
    setGameMap(result);
    setHeroList(heroes);
    // get_hero_fight_list();
    return () => {};
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col md="5" style={{ padding: 0 }}>
            <HeroList
              hit={attack}
              magic={magic}
              list={heroList}
              active={queue[0]}
              isFighting={isFighting}
            />
          </Col>
          <Col md="2" style={{ padding: 0, textAlign: "center" }}>
            <GameStats queue={queue} dice={dice} />
          </Col>
          <Col md="5">
            <EnemyList
              hit={hit}
              list={enemyList}
              isHeroAttacking={isHeroAttacking}
            />
          </Col>
        </Row>
        {/* ---------------------- */}
        <Row>
          <Col md="5" style={{ padding: 0 }}>
            <InventoryList list={inventory} use={use} sell={sell} />
          </Col>
          <Col md="2" style={{ padding: 0 }}>
            <div className="d-grid gap-1">
              <Button
                style={{ borderRadius: 0 }}
                disabled={isFighting}
                variant="primary"
                onClick={play}
              >
                Play
              </Button>
              <Button
                style={{ borderRadius: 0 }}
                disabled={isFighting}
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
          <Col md="5" className="container-map">
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
    </>
  );
};

export default TheGame;
