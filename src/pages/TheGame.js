import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlayerContext } from "../hook/PlayerContext";
//
import { player } from "../server";
//
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

//
import ModalShop from "../components/modal/ModalShop";
import ModalInventory from "../components/modal/ModalInventory";
import ModalGift from "../components/modal/ModalGift";
//
import MapForCharacters from "../components/map/MapForCharacters";
import MapForList from "../components/map/MapForList";
import MapForQueue from "../components/map/MapForQueue";
//
import {
  randomNumber,
  randomlyCombineArrays,
  chooseRandomItem,
} from "../helper";
//
import {
  BOSS,
  CURE,
  ELIXIR,
  ENEMY,
  GIFT,
  HERO,
  ITEM,
  MANA,
  POISON,
  GAME_BATTLE_DELAY,
  REBORN,
} from "../constants";

const TheGame = () => {
  const { map, heroList, setHeroList, enemyList, setEnemyList, shopItems } =
    useContext(PlayerContext);
  // shop modal
  const [modalShop, setModalShop] = useState(false);
  const handleModalShopClose = () => setModalShop(false);
  const handleModalShopShow = () => setModalShop(true);
  // inventory modal
  const [modalInventory, setModalInventory] = useState(false);
  const handleModalInventoryClose = () => setModalInventory(false);
  const handleModalInventoryShow = () => setModalInventory(true);
  // inventory gift
  const [modalGift, setModalGift] = useState(false);
  const handleModalGiftClose = () => setModalGift(false);
  const handleModalGiftShow = () => setModalGift(true);
  // game
  const [dice, setDice] = useState(0);
  const [position, setPosition] = useState(0);
  const [battleQueue, setBattleQueue] = useState([]);
  const [inventory, setInventory] = useState([]);
  // status da batalha
  const [isFighting, setIsFighting] = useState(false);
  const isEnemyFighting = isFighting && battleQueue[0]?.type === ENEMY;
  //
  const [isPhysicalAttack, setIsPhysicalAttack] = useState(false);
  const [isMagicalAttack, setIsMagicalAttack] = useState(false);
  //
  const [isUsingItem, setIsUsingItem] = useState(false);
  const [useItem, setUseItem] = useState(null);
  //
  const [message, setMessage] = useState(0);
  // const [log, setLog] = useState([]);
  //
  const [giftList, setGiftList] = useState([]);

  const gameOver = () => {
    setMessage("Game Over!!!");
    reset();
  };

  const winner = () => {
    setIsFighting(false);
    setEnemyList([]);
    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);
    setIsUsingItem(false);
    setBattleQueue([]);
    //
    setTimeout(() => {
      const addedExp = player.exp + 45;
      if (addedExp > player.expToNextLevel) {
        setMessage("Level Up !!");
        const remain = addedExp - player.expToNextLevel;
        player.exp = remain;
      } else {
        player.exp += 45;
        setMessage("Exp added!");
      }
    }, GAME_BATTLE_DELAY);
  };
  const reset = () => {
    setIsFighting(false);
    setPosition(0);
    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);
    setIsUsingItem(false);
    setUseItem(null);
    setBattleQueue([]);
    setEnemyList([]);
    setHeroList([]);
    setInventory([]);
    setGiftList([]);
    setMessage("");
  };
  const rollTheDice = (setDice) => {
    // reset status
    setIsFighting(false);
    // reset list de presentes
    setGiftList([]);
    //
    const result = randomNumber(1, 6);
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

  // validar o tipo de posição
  const checkPosition = (position) => {
    const positionType = map[position][0].type;
    const positionData = map[position];

    // gerar a ordem de batalha
    const _queue = randomlyCombineArrays(positionData, heroList);
    switch (positionType) {
      case ENEMY:
        setMessage("Enemy Founded");
        // gera uma nova lista, cada item com um novo id
        // const _listWithNewId = generateNewId(positionData);
        setEnemyList(positionData);
        setBattleQueue(_queue);
        // ordem da batalha
        if (_queue[0].type === ENEMY) startEnemyTurn(_queue);
        else setMessage("Hero Time");
        // status da batalha
        setIsFighting(true);
        // desabilitar botão shop
        break;
      case ITEM:
        generateNewRandomItem();
        break;
      case BOSS:
        setMessage("Boss Time !!");
        // gera uma nova lista, cada item com um novo id
        // const _bossListWithNewId = generateNewId(positionData);
        // gerar a ordem de batalha
        const _bossQueue = randomlyCombineArrays(positionData, heroList);
        setEnemyList(positionData);
        setBattleQueue(_bossQueue);
        // ordem da batalha
        if (_queue[0].type === BOSS) startEnemyTurn(_queue);
        else setMessage("Hero Time");
        // status da batalha
        setIsFighting(true);
        break;
      default:
        break;
    }
  };

  // -----------------------------------------------------------------------
  const startEnemyTurn = (list) => {
    if (heroList.length <= 0) {
      setMessage("Insufficient Players");
      return;
    }
    setTimeout(() => {
      // selecionar um herói aleatório
      const _her = chooseRandomItem(heroList);
      // gerar um dano aleatório
      const _ene = list[0];
      const _dmg = randomNumber(_ene.status.strength, _ene.status.strength + 3);

      setMessage("Hero attacked");
      // associando as listas
      let newHeroList = heroList;
      let newQueue = list;

      // dano causado ao hero
      _her.status.hp -= _dmg;

      // validar o status de vida
      if (_her.status.hp < 1) {
        // const _newHeroList = newHeroList.filter((x) => x.id !== _her.id);
        const _newQueueList = newQueue.filter((x) => x.id !== _her.id);
        // newHeroList = _newHeroList;
        newQueue = _newQueueList;
        _her.status.isAlive = false;

        // validar se ainda há personagens para continuar
        const hasHeroes = _newQueueList.some((x) => x.type === HERO);
        if (!hasHeroes) {
          gameOver();
          return;
        }

        //
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
      setBattleQueue(newQueue);
      reorderQueue(newQueue);
    }, GAME_BATTLE_DELAY);
  };

  // tipo de ataque
  const magicalAttack = () => {
    setMessage("Magical Attack");
    setIsMagicalAttack(true);
  };
  const physicalAttack = () => {
    setMessage("Physical Attack");
    setIsPhysicalAttack(true);
  };

  const selectedTarget = (character) => {
    damage(battleQueue[0], character, battleQueue);
  };

  // ataque do herói
  const damage = (character, target, list) => {
    // reset os status
    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);
    let physAttack = 0;
    let MagAttack = 0;

    let _ene = { ...target };

    setTimeout(() => {
      let _her = character;
      let newEnemyList = enemyList;
      let newQueue = list;

      if (isPhysicalAttack) {
        physAttack = randomNumber(
          _her.status.strength,
          _her.status.strength + 12
        );
        _ene.status.hp -= physAttack;
      }
      if (isMagicalAttack) {
        MagAttack = randomNumber(
          _her.status.intelligence,
          _her.status.intelligence + 12
        );
        _ene.status.hp -= MagAttack;
      }

      if (_ene.status.hp < 1) {
        setMessage("Enemy is dead!");
        const _newQueue = newQueue.filter((x) => x.id !== _ene.id);

        newQueue = _newQueue;
        _ene.status.isAlive = false;

        // validar se ainda há personagens para continuar
        const hasEnemy = _newQueue.some((x) => x.type === ENEMY);
        if (!hasEnemy) {
          winner();
          return;
        }
        //
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
      setBattleQueue(newQueue);
      reorderQueue(newQueue);
    }, GAME_BATTLE_DELAY);
  };
  // -----------------------------------------------------------------------
  const reorderQueue = (list) => {
    setTimeout(() => {
      const first = list.shift();
      list.push(first);
      // setOrderBattle(list);

      if (list[0].type === ENEMY || list[0].type === BOSS) startEnemyTurn(list);

      setMessage("Reordered Queue");
    }, GAME_BATTLE_DELAY);

    return list;
  };
  const selectedTargetToUseItem = (character) => {
    const _item = useItem;
    const _hero = character;

    if (isFighting) {
      switchOverItems(_item, _hero);
      reorderQueue(battleQueue);
    } else {
      switchOverItems(_item, _hero);
    }
    setIsUsingItem(false);
  };

  // -----------------------------------------------------------------------
  const switchOverItems = (_item, _hero) => {
    const itemId = _item.id;
    const newInventoryList = inventory.filter((x) => x.id !== itemId);

    switch (_item.class) {
      case CURE:
        if (_hero.status.hp + _item.value > _hero.status.maxHp) {
          _hero.status.hp = _hero.status.maxHp;
        } else {
          _hero.status.hp += _item.value;
        }
        setInventory(newInventoryList);
        break;
      case MANA:
        if (_hero.status.mp + _item.value > _hero.status.maxMp) {
          _hero.status.mp = _hero.status.maxMp;
        } else {
          _hero.status.mp += _item.value;
        }
        setInventory(newInventoryList);
        break;
      case ELIXIR:
        if (_hero.status.hp + _item.value > _hero.status.maxHp) {
          _hero.status.hp = _hero.status.maxHp;
        } else {
          _hero.status.hp += _item.value;
        }
        if (_hero.status.mp + _item.value > _hero.status.maxMp) {
          _hero.status.mp = _hero.status.maxMp;
        } else {
          _hero.status.mp += _item.value;
        }
        setInventory(newInventoryList);
        break;
      case POISON:
        _hero.status.strength += _item.value;
        setInventory(newInventoryList);
        break;
      case REBORN:
        if (_hero.status.hp < 1) {
          _hero.status.hp = _item.value;
          _hero.status.isAlive = true;
          setInventory(newInventoryList);
          if (isFighting) {
            setBattleQueue([...battleQueue, _hero]);
          }
        } else {
          setMessage("Invalid Character");
        }
        break;
      default:
        break;
    }
  };
  const handleBuyItem = (item) => {
    const _player = player;

    if (item.price > _player.gold) {
      setMessage("Insufficient gold");
    } else {
      const newItem = { ...item };
      newItem.id = uuidv4();
      setInventory([...inventory, newItem]);
      player.gold -= item.price;
    }
  };
  const generateNewRandomItem = () => {
    setMessage("New item founded");
    const itemList = shopItems;
    const giftItem1 = chooseRandomItem(itemList);
    const giftItem2 = chooseRandomItem(itemList);

    const newGiftItem1 = { ...giftItem1 };
    newGiftItem1.id = uuidv4();
    const newGiftItem2 = { ...giftItem2 };
    newGiftItem2.id = uuidv4();

    setGiftList([...giftList, newGiftItem1, newGiftItem2]);
    handleModalGiftShow();
  };

  return (
    <>
      <Row>
        <Alert style={{ marginBottom: 0 }} variant="dark">
          {message ? message : "Game"}
        </Alert>
      </Row>
      {player && (
        <Row>
          <Alert variant="primary">
            Gold: ${player.gold} | Experience: {player.exp} | Level:
            {player.level}
          </Alert>
        </Row>
      )}
      <Row>
        <Col sm="12" md="8" lg="9" xl="10">
          <div className="d-flex align-content-start flex-wrap">
            {heroList && heroList.length > 0 && (
              <MapForCharacters
                list={heroList}
                modalType={HERO}
                // status da batalha
                isFighting={isFighting}
                isEnemyFighting={isEnemyFighting}
                firstInTheQueue={battleQueue[0]}
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
              <MapForCharacters
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
            list={shopItems}
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
          <ModalGift
            list={giftList}
            setGiftList={setGiftList}
            modalType={GIFT}
            inventory={inventory}
            modalGift={modalGift}
            handleModalGiftClose={handleModalGiftClose}
            setInventory={setInventory}
          />
          {/*  */}
        </Col>
        <Col sm="12" md="4" lg="3" xl="2">
          <div className="d-grid gap-1">
            <Button disabled={isFighting} onClick={() => rollTheDice(setDice)}>
              Play! {dice}
            </Button>

            <Button disabled={isFighting} onClick={handleModalShopShow}>
              Shop!
            </Button>
            <Button onClick={handleModalInventoryShow}>Inventory</Button>
            <Button onClick={() => reset()}>Reset! </Button>
          </div>
          {/*  */}
          <div className="d-grid">
            <MapForQueue list={battleQueue} firstInTheQueue={battleQueue[0]} />
            <br />

            <MapForList list={map} position={position} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TheGame;
