import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//
import { heroes, items, player } from "../server2";
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
import {
  CURE,
  ELIXIR,
  ENEMY,
  GAME_BATTLE_DELAY,
  HERO,
  ITEM,
  MANA,
  POISON,
} from "../constants";
import ModalInventory from "../components3/modal/ModalInventory";

const TheGame = () => {
  // shop modal
  const [modalShop, setModalShop] = useState(false);
  const handleModalShopClose = () => setModalShop(false);
  const handleModalShopShow = () => setModalShop(true);
  // inventory modal
  const [modalInventory, setModalInventory] = useState(false);
  const handleModalInventoryClose = () => setModalInventory(false);
  const handleModalInventoryShow = () => setModalInventory(true);
  // game
  const [dice, setDice] = useState(0);
  const [position, setPosition] = useState(0);
  const [orderBattle, setOrderBattle] = useState([]);
  const [map, setMap] = useState([]);
  const [inventory, setInventory] = useState([]);
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
  const [isUsingItem, setIsUsingItem] = useState(false);
  const [useItem, setUseItem] = useState(null);
  //
  const [message, setMessage] = useState(0);
  const [log, setLog] = useState([]);

  useEffect(() => {
    const result = generateRandomMap(100);
    setMap(result);
    setHeroList(heroes);
    return () => {};
  }, []);

  const gameOver = () => {
    setMessage("Game Over!!!");
    reset();
  };

  function getExp(level) {
    return level * Math.round(Math.sqrt(level));
  }

  const getNexLevel = (level, nextLevel) => {
    return Math.sqrt(getExp(level) / nextLevel);
  };

  const winner = () => {
    setLog([]);
    setIsFighting(false);
    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);
    setOrderBattle([]);
    setEnemyList([]);

    setTimeout(() => {
      setMessage("Exp added!");
      const exp = getExp(10);
      console.log(exp);
    }, GAME_BATTLE_DELAY);
  };

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
        const generatedNewList = generateNewListWithNewUUID(positionData);
        const randomOrder = randomlyCombineArrays(generatedNewList, heroList);
        // gera uma nova lista, cada item com novo id
        setEnemyList(generatedNewList);
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
      const _ene = list[0];
      const _dmg = generateRandomNumber(_ene.strength, _ene.strength + 30);

      setMessage(
        _ene.name + " enemy deals " + _dmg + " damage to " + _her.name
      );

      // associando as listas
      let newHeroList = heroList;
      let newQueue = list;

      // dano causado ao hero
      _her.hp -= _dmg;
      // atualizar as listas
      if (_her.hp < 1) {
        setMessage("Hero is dead!");
        const _newHeroList = newHeroList.filter((x) => x.id !== _her.id);
        const _newQueueList = newQueue.filter((x) => x.id !== _her.id);
        newHeroList = _newHeroList;
        newQueue = _newQueueList;
        _her.live = false;
        if (newHeroList.length === 0) {
          gameOver();
          return;
        }
      } else {
        // atualizar as listas
        for (let i = 0; i < heroList.length; i++) {
          if (heroList[i].id === _her.id) {
            newHeroList[i] = _her;
          }
        }

        for (let y = 0; y < list.length; y++) {
          if (list[y].id === _her.id) {
            newQueue[y] = _her;
          }
        }
      }

      setHeroList(newHeroList);
      setOrderBattle(newQueue);
      reorderQueue(newQueue);
    }, GAME_BATTLE_DELAY);
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

  const randomDamage = (hero, enemy, list) => {
    let physAttack = 0;
    let MagAttack = 0;
    const _ene = enemy;

    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);

    setTimeout(() => {
      let _her = hero;
      let newEnemyList = enemyList;
      let newQueue = list;

      if (isPhysicalAttack) {
        physAttack = generateRandomNumber(_her.strength, _her.strength + 30);
        _ene.hp -= physAttack;
      }
      if (isMagicalAttack) {
        MagAttack = generateRandomNumber(
          _her.intelligence,
          _her.intelligence + 10
        );
        _ene.hp -= MagAttack;
      }

      if (_ene.hp < 1) {
        setMessage("Enemy is dead!");

        const _newEnemyList = newEnemyList.filter((x) => x.id !== _ene.id);
        const _newQueue = newQueue.filter((x) => x.id !== _ene.id);

        newEnemyList = _newEnemyList;
        newQueue = _newQueue;
        _ene.live = false;

        if (newEnemyList.length === 0) {
          winner();
          return;
        }
      } else {
        for (let i = 0; i < enemyList.length; i++) {
          if (enemyList[i].id === _ene.id) {
            newEnemyList[i] = _ene;
          }
        }
        for (let t = 0; t < list.length; t++) {
          if (list[t].id === _ene.id) {
            newQueue[t] = _ene;
          }
        }
      }

      setEnemyList(newEnemyList);
      setOrderBattle(newQueue);
      reorderQueue(newQueue);
    }, GAME_BATTLE_DELAY);
  };

  const reorderQueue = (list) => {
    setTimeout(() => {
      const first = list.shift();
      list.push(first);
      // setOrderBattle(list);

      if (list[0].type === ENEMY) startEnemyTurn(list);

      setMessage("Reordered Queue");
    }, GAME_BATTLE_DELAY);

    return list;
  };

  const selectedTargetToUseItem = (character) => {
    const _item = useItem;
    const _hero = character;

    if (isFighting) {
      switchOverItems(_item, _hero);
      reorderQueue(orderBattle);
    } else {
      switchOverItems(_item, _hero);
    }
    setIsUsingItem(false);
  };

  const switchOverItems = (_item, _hero) => {
    switch (_item.class) {
      case CURE:
        if (_hero.hp + _item.value > _hero.maxHp) {
          _hero.hp = _hero.maxHp;
        } else {
          _hero.hp += _item.value;
        }
        break;
      case MANA:
        if (_hero.mp + _item.value > _hero.maxMp) {
          _hero.mp = _hero.maxMp;
        } else {
          _hero.mp += _item.value;
        }
        break;
      case ELIXIR:
        if (_hero.hp + _item.value > _hero.maxHp) {
          _hero.hp = _hero.maxHp;
        } else {
          _hero.hp += _item.value;
        }
        if (_hero.mp + _item.value > _hero.maxMp) {
          _hero.mp = _hero.maxMp;
        } else {
          _hero.mp += _item.value;
        }
        break;
      case POISON:
        _hero.strength += _item.value;
        break;
      default:
        break;
    }
  };

  const handleBuyItem = (item) => {
    const _player = player;
    console.log(_player);
    console.log(item);
    if (item.price > _player.gold) {
      setMessage("Insufficient gold");
    } else {
      const newItem = { ...item };
      newItem.id = uuidv4();
      setInventory([...inventory, newItem]);
      player.gold -= item.price;
    }
    handleModalShopClose();
  };

  return (
    <>
      <Row>
        <Alert variant="light">{message ? message : "Game"}</Alert>
      </Row>

      <Row>
        <Col sm="6" md="8">
          <div className="d-flex align-content-start flex-wrap">
            {heroList && heroList.length > 0 && (
              <MapForItems
                list={heroList}
                modalType={HERO}
                // status da batalha
                isFighting={isFighting}
                isEnemyFighting={isEnemyFighting}
                firstInTheQueue={orderBattle[0]}
                // ataque ao personagem
                magicalAttack={magicalAttack}
                physicalAttack={physicalAttack}
                selectedTarget={selectedTarget}
                isPhysicalAttack={isPhysicalAttack}
                // itens para usar
                isUsingItem={isUsingItem}
                selectedTargetToUseItem={selectedTargetToUseItem}
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
          {/*  */}
          <ModalShop
            gold={player?.gold ? player.gold : "Balance not found"}
            list={items}
            modalType={ITEM}
            modalShop={modalShop}
            handleModalShopClose={handleModalShopClose}
            handleBuyItem={handleBuyItem}
          />
          <ModalInventory
            list={inventory}
            modalType={ITEM}
            modalInventory={modalInventory}
            handleModalInventoryClose={handleModalInventoryClose}
            setUseItem={setUseItem}
            setUsingItem={setIsUsingItem}
          />
          {/*  */}
        </Col>
        <Col sm="6" md="4">
          <Button disabled={isFighting} onClick={handleModalShopShow}>
            Shop!
          </Button>
          <Button disabled={isFighting} onClick={() => rollTheDice(setDice)}>
            Play! {dice}
          </Button>
          <Button onClick={handleModalInventoryShow}>Inventory</Button>
          <Button onClick={() => reset()}>Reset! </Button>
          {/*  */}
          <div className="d-grid">
            <MapForQueue list={orderBattle} />
            <MapForList list={map} position={position} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TheGame;
