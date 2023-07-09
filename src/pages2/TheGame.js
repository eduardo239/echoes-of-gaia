import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//
import { heroes, items } from "../server2";
//
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

//
import ModalShop from "../components3/modal/ModalShop";
import MapForItems from "../components3/map/MapForItems";
import MapForList from "../components3/map/MapForList";
import MapForQueue from "../components3/map/MapForQueue";
//
import {
  generateRandomNumber,
  randomlyCombineArrays,
  generateRandomMap,
  chooseRandomItem,
} from "../helper3";
//
import { ENEMY, HERO, ITEM } from "../constants";

/**
 * TODO: remover enable do botão play ao encontrar o inimigo
 * e reabilitar ao final da batalha
 * @returns
 */
const TheGame = () => {
  const [modalShop, setModalShop] = useState(false);
  const handleModalShopClose = () => setModalShop(false);
  const handleModalShopShow = () => setModalShop(true);
  // game
  const [dice, setDice] = useState(0);
  const [position, setPosition] = useState(0);
  const [orderBattle, setOrderBattle] = useState([]);
  const [map, setMap] = useState([]);

  // listas da batalha
  const [enemyList, setEnemyList] = useState([]);
  const [heroList, setHeroList] = useState([]);
  // status da batalha
  const [isFighting, setIsFighting] = useState(false);
  const isEnemyFighting = isFighting && orderBattle[0]?.type === ENEMY;
  //
  const [isPhysicalAttack, setIsPhysicalAttack] = useState(false);
  const [isMagicalAttack, setIsMagicalAttack] = useState(false);
  //
  const [message, setMessage] = useState(0);

  useEffect(() => {
    const result = generateRandomMap(100);
    setMap(result);
    setHeroList(heroes);
    return () => {};
  }, []);

  const reset = () => {
    setIsFighting(false);
    setPosition(0);
    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);
    setOrderBattle([]);
    setEnemyList([]);
  };

  const rollTheDice = (setDice) => {
    // reset status
    setIsFighting(false);
    //
    const result = generateRandomNumber(1, 6);
    setDice(result);
    moveTo(position + result);
  };

  const moveTo = (position) => {
    // validar se o mapa chegou ao fim
    const isLastLocation = position >= map.length - 1;
    if (isLastLocation) {
      setPosition(map.length - 1);
      checkPosition(map.length - 1);
    } else {
      setPosition(position);
      checkPosition(position);
    }
  };

  const checkPosition = (position) => {
    const positionType = map[position][0].type;
    const positionData = map[position];

    switch (positionType) {
      case ENEMY:
        // gerar a ordem de batalha
        const randomOrder = randomlyCombineArrays(positionData, heroList);
        // setEnemyList(positionData);
        setEnemyList(generateNewListWithNewUUID(positionData));
        setOrderBattle(randomOrder);
        // ordem da batalha
        if (randomOrder[0].type === ENEMY) startEnemyTurn(randomOrder);
        // status da batalha
        setIsFighting(true);
        // desabilitar botão shop
        break;
      case ITEM:
        setMessage("item");
        break;
      default:
        break;
    }
  };

  // gerar um novo id para cada inimigo
  const generateNewListWithNewUUID = (list) => {
    const newEnemyList = [];
    for (let i = 0; i < list.length; i++) {
      const newEnemy = { ...list[i] };
      newEnemy.id = uuidv4();
      newEnemyList.push(newEnemy);
    }
    return newEnemyList;
  };

  /**
   * h e h OK
   * h e e h OK
   * e h .... ERROR
   */
  // começo da batalha

  // inimigo atacando
  const startEnemyTurn = (list) => {
    setTimeout(() => {
      // selecionar um herói aleatório
      const rndHero = chooseRandomItem(heroList);
      setMessage("inimigo atacando " + rndHero.name);

      // gerar um dano aleatório
      const str = list[0].strength;
      const rndDamage = generateRandomNumber(str, str + 10);
      setMessage("inimigo provocou " + rndDamage + " de dano");

      // provoca o dano
      rndHero.hp -= rndDamage;
      // atualizar as listas
      const newHeroList = heroList;
      for (let i = 0; i < heroList.length; i++) {
        if (heroList[i].id === rndHero.id) {
          newHeroList[i] = rndHero;
        }
      }

      const newQueue = list;
      for (let y = 0; y < list.length; y++) {
        if (list[y].id === rndHero.id) {
          newQueue[y] = rndHero;
        }
      }

      setHeroList(newHeroList);
      setOrderBattle(newQueue);

      reorderQueue(newQueue);
    }, 1000);
  };

  // ataque mágico
  const magicalAttack = () => {
    setMessage("magicalAttack");
    setIsMagicalAttack(true);
  };
  // ataque físico
  const physicalAttack = () => {
    setMessage("physicalAttack");
    setIsPhysicalAttack(true);
  };

  const selectedTarget = (character) => {
    const hero = orderBattle[0];
    const target = character;
    randomDamage(hero, target, orderBattle);
  };

  const randomDamage = (x, y, list) => {
    let rndPhysicalAttack = 0;
    let rndMagicalAttack = 0;
    setMessage("hero attacking " + y.name);

    setTimeout(() => {
      if (isPhysicalAttack) {
        const str = x.strength;
        rndPhysicalAttack = generateRandomNumber(str, str + 20);
        y.hp -= rndPhysicalAttack;
        setMessage("physical damage " + rndPhysicalAttack);
      }
      if (isMagicalAttack) {
        const intel = x.intelligence;
        rndMagicalAttack = generateRandomNumber(intel, intel + 20);
        y.hp -= rndMagicalAttack;
        setMessage("magical damage " + rndMagicalAttack);
      }

      const newEnemyList = enemyList;
      for (let i = 0; i < enemyList.length; i++) {
        if (enemyList[i].id === y.id) {
          newEnemyList[i] = y;
        }
      }
      const newQueue = list;
      for (let t = 0; t < list.length; t++) {
        if (list[t].id === y.id) {
          newQueue[t] = y;
        }
      }

      setEnemyList(enemyList);
      setIsPhysicalAttack(false);
      setIsMagicalAttack(false);

      setOrderBattle(newQueue);
      reorderQueue(newQueue);
    }, 1000);
  };

  const reorderQueue = (list) => {
    setTimeout(() => {
      const first = list.shift();
      list.push(first);
      setOrderBattle(list);

      if (list[0].type === ENEMY) startEnemyTurn(list);

      setMessage("Fila reordenada");
    }, 1000);
    return list;
  };

  return (
    <>
      <Row>{message && <Alert variant="light">{message}</Alert>}</Row>

      <Row>
        <Col sm="6" md="8">
          <div className="d-flex justify-content-start">
            <div className="d-flex align-content-start flex-wrap">
              {isFighting && heroList && heroList.length > 0 && (
                <MapForItems
                  list={heroList}
                  modalType={HERO}
                  magicalAttack={magicalAttack}
                  physicalAttack={physicalAttack}
                  isEnemyFighting={isEnemyFighting}
                  firstInTheQueue={orderBattle[0]}
                  isPhysicalAttack={isPhysicalAttack}
                  selectedTarget={selectedTarget}
                />
              )}

              {isFighting && enemyList && enemyList.length > 0 && (
                <MapForItems
                  list={enemyList}
                  modalType={ENEMY}
                  isPhysicalAttack={isPhysicalAttack}
                  isMagicalAttack={isMagicalAttack}
                  isEnemyFighting={isEnemyFighting}
                  selectedTarget={selectedTarget}
                />
              )}
            </div>
          </div>
          <ModalShop
            list={items}
            modalType={ITEM}
            modalShop={modalShop}
            handleModalShopClose={handleModalShopClose}
          />
        </Col>
        <Col sm="6" md="4">
          <Button disabled={isFighting} onClick={handleModalShopShow}>
            Shop!
          </Button>
          <Button disabled={isFighting} onClick={() => rollTheDice(setDice)}>
            Play! {dice}
          </Button>
          <Button onClick={() => reset()}>Reset! </Button>

          <br />
          <MapForQueue list={orderBattle} />
          <br />
          <MapForList list={map} position={position} />
        </Col>
      </Row>
    </>
  );
};

export default TheGame;
