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
  WINNER,
} from "../constants";
import ModalMagic from "../components/modal/ModalMagic";
import ModalWinner from "../components/modal/ModalWinner";

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
  // winner modal
  const [modalWinner, setModalWinner] = useState(false);
  const handleModalWinnerClose = () => setModalWinner(false);
  const handleModalWinnerShow = () => setModalWinner(true);
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
  // const [isUsingMagic, setIsUsingMagic] = useState(false);
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
  // Atualizar as listas, com novo status de objeto -------------------
  const updateList = (list, char) => {
    let _char = { ...char };
    let _list = list;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === _char.id) {
        _list[i] = _char;
      }
    }
    return _list;
  };
  // Validar se o personagem está vivo ----------------------------------
  const check_if_its_alive = (char, list) => {
    setMessage("Enemy is dead!");
    const _newQueue = list.filter((x) => x.id !== char.id);
    list = _newQueue;
    char.status.isAlive = false;

    // validar se ainda há personagens para continuar
    const hasEnemy = _newQueue.some((x) => x.type === ENEMY);
    if (!hasEnemy) {
      winner();
      return list;
    }
    return list;
  };
  // Dados ---------------------------------------------------------
  const roll_the_dice = (setDice) => {
    // reset status
    setIsFighting(false);
    // reset list de presentes
    setGiftList([]);
    //
    const result = randomNumber(1, 6);
    setLog([...log, logManager(`Dice Result: ${result}`)]);

    setDice(result);
    move_to(position + result);
  };
  // Mover para o novo local e verificar a posição -------------------
  const move_to = (position) => {
    setLog([...log, logManager(`The character went to the site ${position}`)]);
    // validar se o mapa chegou ao fim
    const isLastLocation = position >= map.length - 1;
    if (isLastLocation) {
      setPosition(map.length - 1);
      check_position(map.length - 1);
    } else {
      setPosition(position);
      check_position(position);
    }
  };
  // Validar o tipo de posição ------------------------------
  const check_position = (position) => {
    const positionType = map[position][0].type;
    const positionData = map[position];
    // validar os personagens que estão vivos, na heroList
    const _heroList = heroList.filter((x) => x.status.isAlive);
    //
    switch (positionType) {
      case ENEMY:
        const _queue2 = randomlyCombineArrays(positionData, _heroList);
        setMessage("Enemy Founded");
        setLog([...log, logManager(`Enemy Founded!`)]);
        //
        setEnemyList(positionData);
        setBattleQueue(_queue2);
        // ordem da batalha
        if (_queue2[0].type === ENEMY) start_enemy_turn(_queue2);
        else setMessage("Hero Time");
        // status da batalha
        setIsFighting(true);
        // desabilitar botão shop
        break;
      case ITEM:
        setLog([...log, logManager(`Item Founded`)]);
        generate_new_random_item();
        break;
      case BOSS:
        const _queue1 = randomlyCombineArrays(positionData, _heroList);
        setMessage("Boss Time !!");
        setLog([...log, logManager(`Boss Time !!!!`)]);
        // gerar a ordem de batalha
        setEnemyList(positionData);
        setBattleQueue(_queue1);
        // ordem da batalha
        if (_queue1[0].type === BOSS) start_enemy_turn(_queue1);
        else setMessage("Hero Time");
        // status da batalha
        setIsFighting(true);
        break;
      default:
        break;
    }
  };
  // Turno do inimigo -------------------------------------------------
  const start_enemy_turn = (list) => {
    if (heroList.length <= 0) {
      setMessage("Insufficient Players");
      return;
    }

    // associando as listas
    let _heroList = heroList;
    let _battleQueue = list;

    setLog([...log, logManager(`Enemy Turn!`)]);
    setTimeout(() => {
      // selecionar um herói aleatório
      const _hero = chooseRandomItem(heroList);
      // gerar um dano aleatório
      const _enemy = list[0];
      const damage = randomNumber(
        _enemy.status.strength,
        _enemy.status.strength + 3
      );

      setMessage("Hero attacked");

      setLog([...log, logManager(`${damage} damage deal to hero.`)]);
      // dano causado ao hero
      _hero.status.hp -= damage;
      if (_hero.status.hp < 1) {
        const _newQueueList = _battleQueue.filter((x) => x.id !== _hero.id);
        _battleQueue = _newQueueList;
        _hero.status.isAlive = false;
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
          if (heroList[i].id === _hero.id) {
            _heroList[i] = _hero;
          }
        }
        // TODO: refatorar
        for (let y = 0; y < list.length; y++) {
          if (list[y].id === _hero.id) {
            _battleQueue[y] = _hero;
          }
        }
      }

      setHeroList(_heroList);
      setBattleQueue(_battleQueue);
      reorder_queue(_battleQueue);
    }, GAME_BATTLE_DELAY);
  };
  // Tipo de ataque --------------------------------------
  const magical_attack = () => {
    setMessage("Magical Attack");
    handleModalMagicShow(true);
  };
  const physical_attack = () => {
    setMessage("Physical Attack");
    setIsPhysicalAttack(true);
  };
  // Ataque do herói --------------------------------------
  const selected_target = (character) => {
    damage(battleQueue[0], character, battleQueue);
  };
  // Dano do herói --------------------------------------
  const damage = (character, target, list) => {
    // reset os status
    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);

    let physicAttack = 0;
    let magicalAttack = 0;
    //
    let _enemyList = enemyList;
    let _enemy = { ...target };
    let _hero = character;

    setTimeout(() => {
      // let newEnemyList = enemyList;

      if (isPhysicalAttack) {
        physicAttack = randomNumber(
          _hero.status.strength,
          _hero.status.strength + 12
        );
        _enemy.status.hp -= physicAttack;
        setLog([...log, logManager(`${physicAttack} damage deal to enemy.`)]);
      }
      if (isMagicalAttack) {
        magicalAttack = randomNumber(
          _hero.status.intelligence,
          _hero.status.intelligence + 12
        );
        _enemy.status.hp -= magicalAttack;
        setLog([...log, logManager(`${magicalAttack} damage deal to enemy.`)]);
      }

      if (_enemy.status.hp < 1) {
        list = check_if_its_alive(_enemy, list);
      } else {
        _enemyList = updateList(_enemyList, _enemy);
      }

      // setEnemyList(newEnemyList);
      setEnemyList(_enemyList);
      setBattleQueue(list);
      reorder_queue(list);
    }, GAME_BATTLE_DELAY);
  };
  // Reordenar a fila de batalha ----------------------------------
  const reorder_queue = (list) => {
    setTimeout(() => {
      const first = list.shift();
      list.push(first);
      // FIXME: push do herói após reviver, e o próximo da lista ser um inimigo
      if (list[0].type === ENEMY || list[0].type === BOSS) {
        start_enemy_turn(list);
        setLog([...log, logManager(`Hero Time!`)]);
      }
      setMessage("Reordered Queue");
    }, GAME_BATTLE_DELAY);
  };
  const selected_target_to_use_magic = (enemy) => {
    let _battleQueue = battleQueue;
    let _enemyList = enemyList;
    let _character = battleQueue[0];

    if (_character.status.mp < useMagic.mp) {
      setMessage("Insufficient Mana");
      return;
    }
    switch (useMagic.type) {
      case FIRE:
        setMessage("Fire Attacking");
        enemy.status.hp -= useMagic.value * 15;
        if (enemy.status.hp < 1) {
          _battleQueue = check_if_its_alive(enemy, _battleQueue);
        } else {
          _enemyList = updateList(_enemyList, enemy);
        }
        _character.status.mp -= useMagic.mp;
        setEnemyList(_enemyList);
        setBattleQueue(_battleQueue);
        reorder_queue(_battleQueue);
        break;
      case ICE:
        setMessage("Ice Attacking");
        break;
      default:
        break;
    }
  };
  const selected_target_to_use_item = (hero) => {
    const _item = useItem;

    if (isFighting) {
      switch_over_player_items(_item, hero);
      reorder_queue(battleQueue);
    } else {
      switch_over_player_items(_item, hero);
    }
    setIsUsingItem(false);
  };
  // Usar item -------------------------------------------------
  const switch_over_player_items = (item, hero) => {
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
          const _newOrderBattle = [...battleQueue, hero];
          setBattleQueue(_newOrderBattle);
          reorder_queue(_newOrderBattle);
        } else {
          setMessage("Invalid Character");
        }
        break;
      default:
        break;
    }
  };
  // Comprar item -------------------------------------------------
  const buy_item = (item) => {
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
  const generate_new_random_item = () => {
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

  /**
   * check position
   * if enemy > start_enemy_turn
   */
  // next turn - - - - - - -
  const next_turn = () => {
    console.log("next turn");
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
                //
                firstInTheQueue={battleQueue[0]}
                // ataque ao personagem
                magicalAttack={magical_attack}
                physicalAttack={physical_attack}
                //
                isFighting={isFighting}
                isEnemyFighting={isEnemyFighting}
                isPhysicalAttack={isPhysicalAttack}
                isUsingItem={isUsingItem}
                //
                selectedTarget={selected_target}
                selectedTargetToUseItem={selected_target_to_use_item}
              />
            )}
            {/* - - - - - lista dos inimigos - - - - -  */}
            {isFighting && enemyList && enemyList.length > 0 && (
              <MapForCharacters
                list={enemyList}
                modalType={ENEMY}
                //
                isPhysicalAttack={isPhysicalAttack}
                isMagicalAttack={isMagicalAttack}
                isEnemyFighting={isEnemyFighting}
                //
                selectedTarget={selected_target}
                selectedTargetToUseMagic={selected_target_to_use_magic}
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
            handleBuyItem={buy_item}
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
            setIsMagicalAttack={setIsMagicalAttack}
          />
          <ModalWinner
            list={heroList}
            modalType={WINNER}
            modalWinner={modalWinner}
            handleModalWinnerClose={handleModalWinnerClose}
          />
          {/*  */}
          {log &&
            log.length > 0 &&
            log
              .map((x, i) => (
                <div key={i}>
                  <code>{x.date + " " + x.message}</code>
                </div>
              ))
              .reverse()}
        </Col>
        <Col>
          <div className="d-grid gap-1">
            <Button variant="danger" onClick={() => next_turn()}>
              Next !
            </Button>
            <Button
              disabled={isFighting}
              onClick={() => roll_the_dice(setDice)}
            >
              Play! {dice}
            </Button>
            <Button disabled={isFighting} onClick={handleModalShopShow}>
              Shop!
            </Button>
            <Button onClick={handleModalInventoryShow}>Inventory</Button>

            <Button onClick={() => reset()}>Reset ! </Button>
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
