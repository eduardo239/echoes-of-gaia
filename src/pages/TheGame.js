import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlayerContext } from "../hook/PlayerContext";
//
// import { player } from "../server";
//
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import ButtonGroup from "react-bootstrap/ButtonGroup";
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
import ToastMessage from "../components/ToastMessage";
import GameNavbar from "../components/NavBar";
import GameMenu from "../components/GameMenu";
import HeroList from "../components/map/HeroList";
import EnemyList from "../components/map/EnemyList";

const TheGame = () => {
  const {
    map,
    player,
    heroList,
    setHeroList,
    enemyList,
    setEnemyList,
    inventory,
    setInventory,
    battleQueue,
    setBattleQueue,
    toastMessage,
    setToastMessage,
  } = useContext(PlayerContext);
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
  // status da batalha
  const [isFighting, setIsFighting] = useState(false);
  const isEnemyFighting = isFighting && battleQueue[0]?.type === ENEMY;
  const firstInTheQueue = isFighting && battleQueue[0] ? battleQueue[0] : null;
  //
  const [isPhysicalAttack, setIsPhysicalAttack] = useState(false);
  const [isMagicalAttack, setIsMagicalAttack] = useState(false);
  //
  const [isUsingItem, setIsUsingItem] = useState(false);
  const [useItem, setUseItem] = useState(null);
  //
  const [useMagic, setUseMagic] = useState(null);
  //
  const [message, setMessage] = useState("");

  const [show, setShow] = useState(false);
  const [log, setLog] = useState([]);
  //
  const [giftList, setGiftList] = useState([]);
  //
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
  // Reordenar a fila de batalha ----------------------------------
  const reorder_queue = (list) => {
    setTimeout(() => {
      const first = list.shift();
      list.push(first);
      // FIXME: push do herói após reviver, e o próximo da lista ser um inimigo
      if (list[0].type === ENEMY || list[0].type === BOSS) {
        start_enemy_turn();
        setLog([...log, logManager(`Hero Time!`)]);
      }
      setMessage("Reordered Queue");
    }, GAME_BATTLE_DELAY);
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
  // const buy_item = (item) => {
  //   const _player = player;

  //   if (item.price > _player.gold) {
  //     setMessage("Insufficient gold");
  //   } else {
  //     const newItem = { ...item };
  //     newItem.id = uuidv4();
  //     setInventory([...inventory, newItem]);
  //     player.gold -= item.price;
  //   }
  // };
  // Gerar itens aleatórios para a posição Item -------------------
  // const generate_new_random_item = () => {
  //   setMessage("New item founded");
  //   const itemList = shopItems;
  //   const giftItem1 = chooseRandomItem(itemList);
  //   const giftItem2 = chooseRandomItem(itemList);

  //   const newGiftItem1 = { ...giftItem1 };
  //   newGiftItem1.id = uuidv4();
  //   const newGiftItem2 = { ...giftItem2 };
  //   newGiftItem2.id = uuidv4();
  //   setGiftList([...giftList, newGiftItem1, newGiftItem2]);
  //   handleModalGiftShow();
  // };

  const start_enemy_turn = (list = []) => {
    console.log("start enemy turn");
    // enemy
    console.log(battleQueue);
    const enemy_attacking = battleQueue[0];
    console.log(enemy_attacking);
    // get random hero
    const random_hero = chooseRandomItem(heroList);
    // cause damage
    physical_damage(enemy_attacking, random_hero);
    // check if its alive
    check_if_its_alive(random_hero);
    // update list
    // reorder_the_queue(battleQueue);
  };
  const reorder_the_queue = (list) => {
    console.log("reorder the queue");
    const first = list.shift();
    list.push(first);
    setBattleQueue(list);
  };
  //
  const selectedTarget = (target) => {
    console.log("selected target");
    const character = battleQueue[0];
    if (isPhysicalAttack) {
      const result = physical_damage(character, target);
      // check if its alive
      check_if_its_alive(result);
    } else if (isMagicalAttack) {
      const result = magical_damage(character, target);
      // check if its alive
      check_if_its_alive(result);
    }
    // reorder_the_queue(battleQueue);
  };
  const physical_damage = (character, target) => {
    console.log(character);
    const damage = character.status.strength;
    console.log("physical damage " + damage + " to : " + target.name);
    // cause damage
    target.status.hp -= damage;
    return target;
  };
  const magical_damage = (character, target) => {
    const damage = 120;
    console.log("magical damage " + damage + " to : " + target.name);
    // cause damage
    target.status.hp -= damage;
    return target;
  };
  const check_if_its_alive = (character) => {
    console.log("check if its alive");
    let new_queue = battleQueue;
    // validar hp
    if (character.status.hp < 1) {
      console.log("character is dead");
      // remove from queue
      new_queue = remove_an_object_from_the_list(character, new_queue);
      console.log(new_queue);
      reorder_the_queue(new_queue);
      // FIXME: update queue
      setBattleQueue(new_queue);
      // validar inimigo
      if (character.type === ENEMY) {
        console.log("enemy is dead");
        const e_list = remove_an_object_from_the_list(character, enemyList);
        setEnemyList(e_list);
        console.log(e_list.length);
        const is_the_list_empty = e_list.length === 0;
        if (is_the_list_empty) battle_won();
        // validar hero
      } else if (character.type === HERO) {
        console.log("hero is dead");
        const h_list = remove_an_object_from_the_list(character, heroList);
        setHeroList(h_list);
        console.log(h_list.length);
        const is_the_list_empty = h_list.length === 0;
        if (is_the_list_empty) game_over();
      }
    } else {
      console.log("character is alive");
      update_the_list(character, setBattleQueue);
      update_the_list(character, setEnemyList);
      update_the_list(character, setHeroList);
      reorder_the_queue(new_queue);
    }
  };
  const reset_battle_stats = () => {
    setBattleQueue([]);
    setEnemyList([]);
    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);
    setIsUsingItem(false);
    setIsFighting(false);
    setUseItem(null);
  };
  const battle_won = () => {
    console.log("battle won");
    console.log("generate random exp");
    console.log("generate random gold");
    console.log("generate random gift");
    reset_battle_stats();
    handleModalWinnerShow();
  };
  const game_over = () => {
    console.log("game over");
    reset();
  };
  const update_the_list = (newObject, setState) => {
    setState((battleQueue) => {
      return battleQueue.map((object) => {
        return object.id === newObject.id ? newObject : object;
      });
    });
  };
  const remove_an_object_from_the_list = (character, list) => {
    const new_queue = list.filter((x) => x.id !== character.id);
    console.log(new_queue);
    return new_queue;
  };
  const magical_attack = () => {
    setMessage("Magical Attack");
    setIsPhysicalAttack(false);
    handleModalMagicShow(true);
    // change battle stats
  };
  const physical_attack = () => {
    setMessage("Physical Attack");
    setIsMagicalAttack(false);
    setIsPhysicalAttack(true);
    // change battle stats
  };
  const nextTurn = () => {
    console.log("next turn");
    console.log(battleQueue);
    start_enemy_turn();
  };

  return (
    <>
      <ToastMessage
        title={toastMessage.title}
        message={toastMessage.message}
        show={show}
        setShow={setShow}
      />
      {/* navbar */}
      <Row>
        <Col>
          <GameNavbar player={player} />
        </Col>
      </Row>

      <Row style={{ maxHeight: "40vh", overflowY: "scroll" }}>
        <Col xs={12} md={3} lg={2}>
          <MapForQueue list={battleQueue} firstInTheQueue={firstInTheQueue} />
        </Col>
        <Col>2</Col>
        <Col xs={12} md={3} lg={2}>
          <MapForList list={map} position={position} />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-flex">
            <HeroList
              firstInTheQueue={firstInTheQueue}
              //
              isEnemyFighting={isEnemyFighting}
              isUsingItem={isUsingItem}
              isFighting={isFighting}
              //
              selectedCharacter={selectedTarget}
              //
              setIsMagicalAttack={setIsMagicalAttack}
              setIsPhysicalAttack={setIsPhysicalAttack}
              handleModalMagicShow={handleModalMagicShow}
            />
          </div>
        </Col>
        {/*  */}
        <Col xs={2} md={1} lg={2}>
          <GameMenu
            firstInTheQueue={firstInTheQueue}
            //
            dice={dice}
            setDice={setDice}
            //
            position={position}
            setPosition={setPosition}
            //
            isFighting={isFighting}
            //
            setIsFighting={setIsFighting}
            //
            toastMessage={toastMessage}
            setToastMessage={setToastMessage}
            setShow={setShow}
            //
            handleModalGiftShow={handleModalGiftShow}
            handleModalShopShow={handleModalShopShow}
            handleModalInventoryShow={handleModalInventoryShow}
            //
            nextTurn={nextTurn}
          />
        </Col>
        {/*  */}
        <Col>
          <div className="d-flex">
            <EnemyList
              firstInTheQueue={firstInTheQueue}
              //
              isEnemyFighting={isEnemyFighting}
              isPhysicalAttack={isPhysicalAttack}
              isMagicalAttack={isMagicalAttack}
              //
              selectedTargetToAttack={selectedTarget}
              selectedTargetToUseMagic={selectedTarget}
            />
          </div>
        </Col>
      </Row>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/*  */}
      {/* {heroList && heroList.length > 0 && (
                <MapForCharacters
                  list={heroList}
                  modalType={HERO}
                  //
                  firstInTheQueue={firstInTheQueue}
                  // ataque ao personagem
                  magicalAttack={magical_attack}
                  physicalAttack={physical_attack}
                  //
                  isFighting={isFighting}
                  isEnemyFighting={isEnemyFighting}
                  isPhysicalAttack={isPhysicalAttack}
                  isUsingItem={isUsingItem}
                  //
                  selectedTargetToUseItem={selected_target_to_use_item}
                />
              )} */}
      {/* <div className="d-flex align-content-start flex-wrap">
              {isFighting && enemyList && enemyList.length > 0 && (
                <MapForCharacters
                  list={enemyList}
                  modalType={ENEMY}
                  //
                  isPhysicalAttack={isPhysicalAttack}
                  isMagicalAttack={isMagicalAttack}
                  isEnemyFighting={isEnemyFighting}
                  //
                  selectedTargetToAttack={selectedTarget}
                  selectedTargetToUseMagic={selectedTarget}
                />
              )}
            </div> */}

      <Row>
        <Alert style={{ marginBottom: 0 }} variant="dark">
          {message ? message : "Game"}
        </Alert>
      </Row>
      {player && (
        <Row>
          <Alert variant="primary">
            Gold: ${player.gold} | Experience: {player.exp} | Level:
            {player.level} | Next Level: {player.nextLevel}
          </Alert>
        </Row>
      )}
      <Row>
        <Col sm="12" md="8" lg="9" xl="10">
          {/*  */}
          <ModalShop
            modalType={ITEM}
            modalShop={modalShop}
            handleModalShopClose={handleModalShopClose}
          />
          <ModalGift
            modalType={GIFT}
            modalGift={modalGift}
            handleModalGiftClose={handleModalGiftClose}
          />
          <ModalInventory
            modalType={ITEM}
            modalInventory={modalInventory}
            handleModalInventoryClose={handleModalInventoryClose}
            // lidar com o uso do item
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
            player={player}
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
            {/* <Button
              disabled={
                (firstInTheQueue || !isFighting) &&
                (!isFighting || firstInTheQueue.type === HERO)
              }
              variant="danger"
              onClick={() => nextTurn()}
            >
              Next !
            </Button> */}
            {/* <Button
              disabled={isFighting}
              onClick={() => roll_the_dice(setDice)}
            >
              Play! {dice}
            </Button> */}
            {/* <Button disabled={isFighting} onClick={handleModalShopShow}>
              Shop!
            </Button> */}
            {/* <Button onClick={handleModalInventoryShow}>Inventory</Button> */}

            <Button onClick={() => reset()}>Reset ! </Button>
          </div>
          {/*  */}
          <div className="d-grid">
            <br />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TheGame;
