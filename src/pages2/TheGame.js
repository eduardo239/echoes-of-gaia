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
  const [log, setLog] = useState([]);

  useEffect(() => {
    const result = generateRandomMap(100);
    setMap(result);
    setHeroList(heroes);
    return () => {};
  }, []);

  const reset = () => {
    setLog([]);
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
        setMessage("Enemy Founded");
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
        setMessage("Item Founded");
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
   * e h OK
   */
  // começo da batalha

  // inimigo atacando
  const startEnemyTurn = (list) => {
    setTimeout(() => {
      // selecionar um herói aleatório
      const _her = chooseRandomItem(heroList);

      // gerar um dano aleatório
      const _en = list[0];
      const _dmg = generateRandomNumber(_en.strength, _en.strength + 30);

      setMessage(_en.name + " enemy deals " + _dmg + " damage to " + _her.name);

      // provocando o dano
      _her.hp -= _dmg;
      if (_her.hp < 1) _her.live = false;

      // atualizar as listas
      const newHeroList = heroList;
      for (let i = 0; i < heroList.length; i++) {
        if (heroList[i].id === _her.id) {
          newHeroList[i] = _her;
        }
      }

      const newQueue = list;
      for (let y = 0; y < list.length; y++) {
        if (list[y].id === _her.id) {
          newQueue[y] = _her;
        }
      }

      setOrderBattle(newQueue);
      setHeroList(newHeroList);

      reorderQueue(newQueue);
    }, 800);
  };

  // ataque mágico
  const magicalAttack = () => {
    setMessage("Magical Attack");
    setIsMagicalAttack(true);
  };
  // ataque físico
  const physicalAttack = () => {
    setMessage("Physical Attack");
    setIsPhysicalAttack(true);
  };

  const selectedTarget = (character) => {
    const _her = orderBattle[0];
    const _target = character;
    randomDamage(_her, _target, orderBattle);
  };

  const randomDamage = (hero, _ene, list) => {
    let physAttack = 0;
    let MagAttack = 0;

    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);

    setTimeout(() => {
      const _her = hero;
      if (isPhysicalAttack) {
        physAttack = generateRandomNumber(_her.strength, _her.strength + 30);
        _ene.hp -= physAttack;

        setMessage(
          hero.name + " hero deals " + physAttack + " damage to " + _ene.name
        );
      }
      if (isMagicalAttack) {
        MagAttack = generateRandomNumber(
          _her.intelligence,
          _her.intelligence + 10
        );
        _ene.hp -= MagAttack;
        setMessage(
          hero.name + " hero deals " + MagAttack + " damage to " + _ene.name
        );
      }

      let newQueue = list;
      let newEnemyList = enemyList;

      for (let i = 0; i < enemyList.length; i++) {
        if (enemyList[i].id === _ene.id) {
          if (_ene.hp < 1) {
            console.log("enemy morreu");
            _ene.live = false;
          }
          newEnemyList[i] = _ene;
        }
      }
      for (let t = 0; t < list.length; t++) {
        if (list[t].id === _ene.id) {
          newQueue[t] = _ene;
        }
      }

      // TODO: validar se o personagem está vivo, e atualizar as listas
      // if (!_ene.live) {
      //   const t = newEnemyList.filter((x) => x.live === true);
      //   console.log(t);
      // }

      setEnemyList(newEnemyList);

      setOrderBattle(newQueue);
      reorderQueue(newQueue);
    }, 800);
  };

  const reorderQueue = (list) => {
    setTimeout(() => {
      const first = list.shift();
      list.push(first);
      setOrderBattle(list);

      if (list[0].type === ENEMY) startEnemyTurn(list);

      setMessage("Reordered Queue");
    }, 800);
    return list;
  };

  return (
    <>
      <Row>
        <Alert variant="light">{message ? message : "Game"}</Alert>
      </Row>

      <Row>
        <Col sm="6" md="8">
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

          <div>
            {log &&
              log.length > 0 &&
              log.map((x, i) => (
                <p key={i}>
                  {i} - {x}
                </p>
              ))}
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
