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
  logManager,
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
  MAGIC,
  FIRE,
  ICE,
} from "../constants";
import ModalMagic from "../components/modal/ModalMagic";

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
  //  gift modal
  const [modalGift, setModalGift] = useState(false);
  const handleModalGiftClose = () => setModalGift(false);
  const handleModalGiftShow = () => setModalGift(true);
  // magic modal
  const [modalMagic, setModalMagic] = useState(false);
  const handleModalMagicClose = () => setModalMagic(false);
  const handleModalMagicShow = () => setModalMagic(true);
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
  const [isUsingMagic, setIsUsingMagic] = useState(false);
  const [useMagic, setUseMagic] = useState(null);
  //
  const [message, setMessage] = useState(0);
  const [log, setLog] = useState([]);
  //
  const [giftList, setGiftList] = useState([]);

  const gameOver = () => {
    setMessage("Game Over!");
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
        setMessage("Level Up!");
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
    setLog([...log, logManager(`Dice Result: ${result}`)]);

    setDice(result);
    moveTo(position + result);
  };
  // Mover para o novo local e verificar a posição -------------------
  const moveTo = (position) => {
    setLog([...log, logManager(`The character went to the site ${position}`)]);
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
  // Validar o tipo de posição ------------------------------
  const checkPosition = (position) => {
    const positionType = map[position][0].type;
    const positionData = map[position];
    // gerar a ordem de batalha ------------------------------
    switch (positionType) {
      case ENEMY:
        const _queue2 = randomlyCombineArrays(positionData, heroList);
        setMessage("Enemy Founded");
        setLog([...log, logManager(`Enemy Founded!`)]);
        // const _listWithNewId = generateNewId(positionData);
        setEnemyList(positionData);
        setBattleQueue(_queue2);
        // ordem da batalha
        if (_queue2[0].type === ENEMY) startEnemyTurn(_queue2);
        else setMessage("Hero Time");
        // status da batalha
        setIsFighting(true);
        // desabilitar botão shop
        break;
      case ITEM:
        setLog([...log, logManager(`Item Founded`)]);
        generateNewRandomItem();
        break;
      case BOSS:
        const _queue1 = randomlyCombineArrays(positionData, heroList);
        setMessage("Boss Time !!");
        setLog([...log, logManager(`Boss Time !!!!`)]);
        // gerar a ordem de batalha
        setEnemyList(positionData);
        setBattleQueue(_queue1);
        // ordem da batalha
        if (_queue1[0].type === BOSS) startEnemyTurn(_queue1);
        else setMessage("Hero Time");
        // status da batalha
        setIsFighting(true);
        break;
      default:
        break;
    }
  };
  // Turno do inimigo -------------------------------------------------
  const startEnemyTurn = (list) => {
    if (heroList.length <= 0) {
      setMessage("Insufficient Players");
      return;
    }
    setLog([...log, logManager(`Enemy Turn!`)]);
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
      setLog([...log, logManager(`${_dmg} damage deal to hero.`)]);

      // validar o status de vida
      if (_her.status.hp < 1) {
        const _newQueueList = newQueue.filter((x) => x.id !== _her.id);
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
  // Tipo de ataque --------------------------------------
  const magicalAttack = () => {
    setMessage("Magical Attack");
    handleModalMagicShow(true);
  };
  const physicalAttack = () => {
    setMessage("Physical Attack");
    setIsPhysicalAttack(true);
  };
  // TODO: remover set Is MagicalAttack
  // Ataque do herói --------------------------------------
  const selectedTarget = (character) => {
    damage(battleQueue[0], character, battleQueue);
  };
  const damage = (character, target, list) => {
    // reset os status
    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);
    let physAttack = 0;
    let magAttack = 0;

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
        setLog([...log, logManager(`${physAttack} damage deal to enemy.`)]);
      }
      if (isMagicalAttack) {
        magAttack = randomNumber(
          _her.status.intelligence,
          _her.status.intelligence + 12
        );
        _ene.status.hp -= magAttack;
        setLog([...log, logManager(`${magAttack} damage deal to enemy.`)]);
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
  // Reordenar a fila de batalha ----------------------------------
  const reorderQueue = (list) => {
    setTimeout(() => {
      const first = list.shift();
      list.push(first);
      if (list[0].type === ENEMY || list[0].type === BOSS) {
        startEnemyTurn(list);
        setLog([...log, logManager(`Hero Time!`)]);
      }
      setMessage("Reordered Queue");
    }, GAME_BATTLE_DELAY);
    return list;
  };
  //

  const selectedTargetToUseMagic = (enemy) => {
    console.log("-----------------");
    console.log(enemy);
    console.log(useMagic);
    console.log(useMagic.type);
    switch (useMagic.type) {
      case FIRE:
        setMessage("Fire Attacking");
        break;
      case ICE:
        setMessage("Ice Attacking");
        break;
      default:
        break;
    }
  };

  const selectedTargetToUseItem = (hero) => {
    const _item = useItem;

    if (isFighting) {
      switchOverItems(_item, hero);
      reorderQueue(battleQueue);
    } else {
      switchOverItems(_item, hero);
    }
    setIsUsingItem(false);
  };
  // Usar item -------------------------------------------------
  const switchOverItems = (item, hero) => {
    const itemId = item.id;
    const newInventoryList = inventory.filter((x) => x.id !== itemId);

    switch (item.class) {
      case CURE:
        if (hero.status.hp < 1) {
          setMessage("Invalid Character");
        } else {
          setLog([...log, logManager(`Cure Potion Used!`)]);
          if (hero.status.hp + item.value > hero.status.maxHp) {
            hero.status.hp = hero.status.maxHp;
          } else {
            hero.status.hp += item.value;
          }
          setInventory(newInventoryList);
        }
        break;
      case MANA:
        if (hero.status.mp + item.value > hero.status.maxMp) {
          hero.status.mp = hero.status.maxMp;
        } else {
          hero.status.mp += item.value;
        }
        setInventory(newInventoryList);
        break;
      case ELIXIR:
        if (hero.status.hp + item.value > hero.status.maxHp) {
          hero.status.hp = hero.status.maxHp;
        } else {
          hero.status.hp += item.value;
        }
        if (hero.status.mp + item.value > hero.status.maxMp) {
          hero.status.mp = hero.status.maxMp;
        } else {
          hero.status.mp += item.value;
        }
        setInventory(newInventoryList);
        break;
      case POISON:
        hero.status.strength += item.value;
        setInventory(newInventoryList);
        break;
      case REBORN:
        if (hero.status.hp < 1) {
          hero.status.hp = item.value;
          hero.status.isAlive = true;
          setInventory(newInventoryList);
          if (isFighting) {
            setBattleQueue([...battleQueue, hero]);
          }
        } else {
          setMessage("Invalid Character");
        }
        break;
      default:
        break;
    }
  };
  // Comprar item -------------------------------------------------
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
  // Gerar itens aleatórios para a posição Item -------------------
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
                //
                selectedTarget={selectedTarget}
                //
                isPhysicalAttack={isPhysicalAttack}
                // itens para usar
                isUsingItem={isUsingItem}
                //
                selectedTargetToUseItem={selectedTargetToUseItem}
                // mágica do personagem
              />
            )}
            {/* - - - - - lista dos inimigos - - - - -  */}
            {isFighting && enemyList && enemyList.length > 0 && (
              <MapForCharacters
                list={enemyList}
                modalType={ENEMY}
                isPhysicalAttack={isPhysicalAttack}
                isMagicalAttack={isMagicalAttack}
                isEnemyFighting={isEnemyFighting}
                selectedTarget={selectedTarget}
                //
                selectedTargetToUseMagic={selectedTargetToUseMagic}
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
          <ModalGift
            list={giftList}
            setGiftList={setGiftList}
            modalType={GIFT}
            inventory={inventory}
            modalGift={modalGift}
            handleModalGiftClose={handleModalGiftClose}
            setInventory={setInventory}
          />
          <ModalInventory
            list={inventory}
            modalType={ITEM}
            modalInventory={modalInventory}
            handleModalInventoryClose={handleModalInventoryClose}
            setUseItem={setUseItem}
            setIsUsingItem={setIsUsingItem}
          />
          <ModalMagic
            list={heroList}
            modalType={MAGIC}
            modalMagic={modalMagic}
            handleModalMagicClose={handleModalMagicClose}
            setUseMagic={setUseMagic}
            setIsUsingMagic={setIsUsingMagic}
            setIsMagicalAttack={setIsMagicalAttack}
          />
          {/*  */}
          {log &&
            log.length > 0 &&
            log.map((x, i) => (
              <div key={i}>
                <code>{x.date + " " + x.message}</code>
              </div>
            ))}
        </Col>
        <Col>
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
