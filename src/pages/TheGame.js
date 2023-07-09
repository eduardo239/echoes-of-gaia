/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { generateRandomNumber, getRandomItem } from "../helper";
import { PlayerContext } from "../hook/PlayerContext";
import { heroes, enemies, items, bosses } from "../server2";
import { generateRandomMap, randomlyCombineArrays } from "../helper2";
//
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import HeroList from "../components2/HeroList";
import EnemyList from "../components2/EnemyList";
import Container from "react-bootstrap/Container";
import InventoryList from "../components2/InventoryList";
import { BOSS, EMPTY, ENEMY, HERO, ITEM, NOTHING } from "../constants";
import GameStats from "../components2/GameStats";

const TheGame = () => {
  const { inventory, setInventory } = useContext(PlayerContext);
  //
  const [gifts, setGifts] = useState([]);
  //
  const [position, setPosition] = useState(0);
  const [queue, setQueue] = useState([]);
  const [map, setMap] = useState([]);
  const [turn, setTurn] = useState(null);
  const [dice, setDice] = useState(0);
  const [heroList, setHeroList] = useState([]);
  const [log, setLog] = useState([]);
  // modal
  const [modalShop, setModalShop] = useState(false);
  const handleModalShopClose = () => setModalShop(false);
  const handleModalShopShow = () => setModalShop(true);
  //
  const [modalItem, setModalItem] = useState(false);
  const handleModalItemClose = () => setModalItem(false);
  const handleModalItemShow = () => setModalItem(true);

  // play !
  const rollTheDice = () => {
    const randomNumber = generateRandomNumber(1, 6);
    const newPosition = randomNumber + position;
    setDice(randomNumber);
    walkTo(newPosition);
  };
  // move o personagem no mapa
  const walkTo = (newPosition) => {
    // validar se acabou o mapa, se sim
    // move o personagem para última posição
    const isLastLocation = newPosition >= map.length - 1;
    if (isLastLocation) {
      setPosition(map.length - 1);
      checkActualLocal(map.length - 1);
    } else {
      setPosition(newPosition);
      checkActualLocal(newPosition);
    }
  };
  // verifica o local atual
  const checkActualLocal = (local) => {
    const localType = map[local][0].type;
    const localData = map[local];

    // reset o gift e a lista de inimigos
    setGifts([]);

    // verifica o que tem no local
    switch (localType) {
      case ENEMY:
        //
        const newEnemyList = [];
        // cria novos ids para não duplicar
        for (let i = 0; i < localData.length; i++) {
          const newEnemy = { ...localData[i] };
          newEnemy.id = uuidv4();
          newEnemyList.push(newEnemy);
        }
        // mistura a lista de inimigos e heróis
        const battleOrderList = randomlyCombineArrays(heroes, newEnemyList);
        setQueue(battleOrderList);
        whoIsTheFirst(battleOrderList);
        //
        break;
      case ITEM:
        setGifts(localData);
        setModalItem(true);
        break;
      case BOSS:
        //
        break;
      case EMPTY:
        //
        break;
      default:
        break;
    }
  };
  const heroAttackPhysically = () => {
    console.log("");
  };
  const heroMagicalAttack = () => {
    console.log("");
  };

  const characterAttack = (character) => {
    console.log("character attack, turn is " + turn);
    setTimeout(() => {
      // pega o valor da força do herói e gera um dano aleatório
      const strength = queue[0]?.strength;
      const rndDamage = generateRandomNumber(strength, strength + 10);
      // log
      setLog([...log, { info: `${queue[0]?.name} attacking...` }]);
      // remove o hp do inimigo
      const updatedList = changeValueOfAnObject(character.id, "hp", rndDamage);
      // reordenar a lista, mover primeiro para fim da lista
      queueReorder(updatedList);
    }, 300);
  };

  // TOD TOD -- - -- - - -
  const restart = () => {};
  const use = (item) => {
    // // remove o item do inventário
    // const updatedInventory = inventory.filter((x) => x.id !== item.id);
    // setInventory(updatedInventory);
  };
  const get = (item) => {
    // const purchasedItem = { ...item };
    // purchasedItem.id = uuidv4();
    // setInventory([...inventory, purchasedItem]);
    // handleModalItemClose();
  };
  const buy = (item) => {
    // const purchasedItem = { ...item };
    // purchasedItem.id = uuidv4();
    // setInventory([...inventory, purchasedItem]);
  };
  const sell = (item) => {
    // const gold = item.price;
    // // remove o item do inventário
    // const updatedInventory = inventory.filter((x) => x.id !== item.id);
    // setInventory(updatedInventory);
  };

  // check quem é o primeiro
  const whoIsTheFirst = (list) => {
    console.log("who is the first");

    const isHero = list[0].type === HERO;
    const isEnemy = list[0].type === ENEMY;

    if (isHero) setTurn(0);
    else if (isEnemy) setTurn(1);

    if (turn === 1 || isEnemy) {
      const heroesList = list.filter((x) => x.type === HERO);
      const targetHero = getRandomItem(heroesList);
      characterAttack(targetHero);
    }
  };

  // reordenar, primeiro item para última posição
  const queueReorder = (list) => {
    console.log("queue reorder");
    if (list.length <= 1) return;

    const firstItem = list.shift();
    const newList = [...list, firstItem];
    setQueue(newList);
    whoIsTheFirst(newList);
  };

  // alterar status de um objeto
  const changeValueOfAnObject = (id, property, value) => {
    const newList = queue.map((character) => {
      if (character.id === id) {
        return { ...character, [property]: character.hp - value };
      }
      return character;
    });
    return newList;
  };

  // inicia um novo jogo, gera um novo mapa e preenche a lista de heróis
  useEffect(() => {
    const result = generateRandomMap();
    setMap(result);
    setHeroList(heroes);
    return () => {};
  }, []);

  // listas mapeadas
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
  const get_map_list = () => {
    return map.map((local, index) => (
      <li
        key={index}
        className={
          position === index
            ? "map-location active"
            : position - 1 > index
            ? "none"
            : "map-location"
        }
      >
        {index} -{" "}
        {local.length === 1 ? local[0].type : local.map((i) => i.type + " ")}
      </li>
    ));
  };
  // mapeia a lista de inimigos e retorna para o html
  const get_enemy_list = () => {
    if (queue && queue.length > 0) {
      return queue.filter((character) => character.type === ENEMY);
    }
  };
  return (
    <>
      <Container style={{ padding: "1rem" }}>
        <Row>
          <Col md="5" style={{ padding: 0 }}>
            <HeroList
              list={heroList}
              activeHero={(queue && queue[0]) || map[0]?.type !== NOTHING}
              heroAttackPhysically={heroAttackPhysically}
              heroMagicalAttack={heroMagicalAttack}
            />
          </Col>
          <Col md="2" style={{ padding: 0, textAlign: "center" }}>
            <p>Turn: {turn && turn}</p>
            {log.map((x, i) => (
              <p key={i}>
                {i} - {x.info}
              </p>
            ))}
            <GameStats queue={queue} dice={dice} />
          </Col>
          <Col md="5" style={{ padding: 0 }}>
            <EnemyList
              list={get_enemy_list()}
              isHeroAttacking={turn === 0}
              characterAttack={characterAttack}
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
                disabled={turn === 0}
                variant="primary"
                onClick={rollTheDice}
              >
                Play
              </Button>
              <Button
                style={{ borderRadius: 0 }}
                disabled={turn === 0}
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
