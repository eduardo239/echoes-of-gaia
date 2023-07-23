import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useState } from "react";
import { PlayerContext } from "../hook/PlayerContext";
import GameNavbar from "../components/NavBar";
import HeroList from "../components/map/HeroList";
import {
  CURE,
  ELIXIR,
  ENEMY,
  GIFT,
  HERO,
  ITEM,
  MAGIC,
  MANA,
  POISON,
  REBORN,
} from "../constants";
import { removeAnObjectFromTheList, updateTheList } from "./func";
import GameMenu from "../components/GameMenu";
import MapForQueue from "../components/map/MapForQueue";
import MapForList from "../components/map/MapForList";
import EnemyList from "../components/map/EnemyList";
import { chooseRandomItem } from "../helper";
import ModalShop from "../components/modal/ModalShop";
import ModalInventory from "../components/modal/ModalInventory";
import ModalGift from "../components/modal/ModalGift";
import ModalMagic from "../components/modal/ModalMagic";

const Game = () => {
  const {
    map,
    player,
    inventory,
    setInventory,
    heroList,
    setHeroList,
    enemyList,
    setEnemyList,
    battleQueue,
    setBattleQueue,
  } = useContext(PlayerContext);

  // Modal
  const [modalShop, setModalShop] = useState(false);
  const handleModalShopClose = () => setModalShop(false);
  const handleModalShopShow = () => setModalShop(true);
  //
  const [modalInventory, setModalInventory] = useState(false);
  const handleModalInventoryClose = () => setModalInventory(false);
  const handleModalInventoryShow = () => setModalInventory(true);
  //
  const [modalGift, setModalGift] = useState(false);
  const handleModalGiftClose = () => setModalGift(false);
  const handleModalGiftShow = () => setModalGift(true);
  //
  const [modalMagic, setModalMagic] = useState(false);
  const handleModalMagicClose = () => setModalMagic(false);
  const handleModalMagicShow = () => setModalMagic(true);
  //
  const [modalWinner, setModalWinner] = useState(false);
  const handleModalWinnerClose = () => setModalWinner(false);
  const handleModalWinnerShow = () => setModalWinner(true);
  // Game - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [dice, setDice] = useState(0);
  const [position, setPosition] = useState(0);
  // Status - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [isFighting, setIsFighting] = useState(false);
  const isEnemyFighting = isFighting && battleQueue[0]?.type === ENEMY;
  const [isUsingItem, setIsUsingItem] = useState(false);
  const [isPhysicalAttack, setIsPhysicalAttack] = useState(false);
  const [isMagicalAttack, setIsMagicalAttack] = useState(false);
  //
  const [useItem, setUseItem] = useState(null);
  const [useMagic, setUseMagic] = useState(null);
  //
  const firstInTheQueue = isFighting && battleQueue[0] ? battleQueue[0] : null;

  const selectedTarget = (target) => {
    console.log("selected target");
    const character = battleQueue[0];
    if (isPhysicalAttack) {
      const result = physicalDamage(character, target);
      // check if its alive
      checkIfItsAlive(result);
    } else if (isMagicalAttack) {
      const result = magicalDamage(character, target);
      // check if its alive
      checkIfItsAlive(result);
    }
    // reorderTheQueue(battleQueue);
  };
  const physicalDamage = (character, target) => {
    console.log(character);
    const damage = character.status.strength;
    console.log("physical damage " + damage + " to : " + target.name);
    // cause damage
    target.status.hp -= damage;
    return target;
  };
  const magicalDamage = (character, target) => {
    if (character.status.mp >= useMagic.mp) {
      const damage = useMagic.value * (character.status.intelligence * 0.25);
      console.log(useMagic.name + " damage " + damage + " to : " + target.name);
      // cause damage
      target.status.hp -= damage;
      character.status.mp -= useMagic.mp;

      return target;
    } else {
      console.log("mp insufficient");
      return target;
    }
  };
  const checkIfItsAlive = (character) => {
    console.log("check if its alive");
    let new_queue = battleQueue;
    // validar hp
    if (character.status.hp < 1) {
      console.log("character is dead");
      // remove from queue
      new_queue = removeAnObjectFromTheList(character, new_queue);

      reorderTheQueue(new_queue);
      setBattleQueue(new_queue);
      // validar inimigo
      if (character.type === ENEMY) {
        console.log("enemy is dead");
        const e_list = removeAnObjectFromTheList(character, enemyList);
        setEnemyList(e_list);

        const is_the_list_empty = e_list.length === 0;
        if (is_the_list_empty) battleWon();
        // validar hero
      } else if (character.type === HERO) {
        console.log("hero is dead");
        const h_list = removeAnObjectFromTheList(character, heroList);
        character.status.isAlive = false;

        const is_the_list_empty = h_list.length === 0;
        if (is_the_list_empty) gameOver();
        else updateTheList(character, setHeroList);
      }
    } else {
      console.log("character is alive");
      updateTheList(character, setBattleQueue);
      updateTheList(character, setEnemyList);
      updateTheList(character, setHeroList);
      reorderTheQueue(new_queue);
    }
  };
  const reorderTheQueue = (list) => {
    console.log("reorder the queue");
    const first = list.shift();
    list.push(first);
    setBattleQueue(list);
  };
  const battleWon = () => {
    console.log("battle won");
    console.log("generate random exp");
    console.log("generate random gold");
    console.log("generate random gift");
    resetBattle();
    handleModalWinnerShow();
  };
  const gameOver = () => {
    console.log("game over");
    // reset();
  };
  const nextTurn = () => {
    console.log("next turn");

    startEnemyTurn();
  };
  const startEnemyTurn = () => {
    console.log("start enemy turn");
    // enemy
    console.log(battleQueue);
    const enemy_attacking = battleQueue[0];
    console.log(enemy_attacking);
    // get random hero
    const random_hero = chooseRandomItem(heroList);
    // cause damage
    physicalDamage(enemy_attacking, random_hero);
    // check if its alive
    checkIfItsAlive(random_hero);
    // update list
    // reorder_the_queue(battleQueue);
  };
  const resetBattle = () => {
    setBattleQueue([]);
    setEnemyList([]);
    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);
    setIsUsingItem(false);
    setIsFighting(false);
    setUseItem(null);
  };
  const selectedTargetToUseItem = (hero) => {
    console.log("use item");
    const _item = useItem;

    switchOverItems(_item, hero);
    setIsUsingItem(false);
    reorderTheQueue(battleQueue);
  };
  const switchOverItems = (item, hero) => {
    const itemId = item.id;
    const newInventoryList = inventory.filter((x) => x.id !== itemId);

    switch (item.class) {
      case CURE:
        if (hero.status.hp < 1) {
          console.log("Invalid Character");
        } else {
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
          // FIX reviver durante a batalha e voltar para fila

          console.log("bug");
          if (isFighting) {
            reorderTheQueue([...battleQueue, hero]);
          }
        } else {
          console.log("Invalid Character");
        }
        break;
      default:
        console.log("item not founded");
        break;
    }
  };

  return (
    <>
      <Row>
        <Col>
          <GameNavbar player={player} />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex align-items-start ">
              <HeroList
                firstInTheQueue={firstInTheQueue}
                //
                isEnemyFighting={isEnemyFighting}
                isUsingItem={isUsingItem}
                isFighting={isFighting}
                //
                selectedCharacter={selectedTarget}
                selectedTargetToUseItem={selectedTargetToUseItem}
                //
                setIsMagicalAttack={setIsMagicalAttack}
                setIsPhysicalAttack={setIsPhysicalAttack}
                //
                handleModalMagicShow={handleModalMagicShow}
              />
            </div>
            <div className="d-flex align-items-center p-3">
              <h1>VS</h1>
            </div>
            <div className="d-flex align-items-start ">
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
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm>
          <MapForQueue list={battleQueue} firstInTheQueue={firstInTheQueue} />
        </Col>
        <Col md>
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
            isEnemyFighting={isEnemyFighting}
            //
            setIsFighting={setIsFighting}
            //
            // toastMessage={toastMessage}
            // setToastMessage={setToastMessage}
            // setShow={setShow}
            //
            handleModalGiftShow={handleModalGiftShow}
            handleModalShopShow={handleModalShopShow}
            handleModalInventoryShow={handleModalInventoryShow}
            //
            nextTurn={nextTurn}
          />
        </Col>
        <Col sm>
          <div className="map-container">
            <MapForList list={map?.positions} position={position} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <pre>
            <code>Map Nam: {map && map.name} | </code>
            <code>Map Len: {map && map.length} | </code>
            <code>Map Dif: {map && map.difficulty} | </code>
          </pre>
          <pre>
            <code>Player Nam: {player && player.name} | </code>
            <code>Player Lvl: {player && player.level} | </code>
            <code>Player Dif: {player && player.exp} | </code>
            <code>Player Img: {player && player.image} | </code>
          </pre>
          <pre>
            <code>Her Lst: {heroList && heroList.length} | </code>
          </pre>

          {/*  */}
          <ModalShop
            modalType={ITEM}
            modalShop={modalShop}
            handleModalShopClose={handleModalShopClose}
          />

          <ModalInventory
            modalType={ITEM}
            modalInventory={modalInventory}
            handleModalInventoryClose={handleModalInventoryClose}
            //
            setUseItem={setUseItem}
            setIsUsingItem={setIsUsingItem}
          />

          <ModalGift
            modalType={GIFT}
            modalGift={modalGift}
            handleModalGiftClose={handleModalGiftClose}
          />

          <ModalMagic
            modalType={MAGIC}
            firstInTheQueue={battleQueue ? battleQueue[0] : []}
            modalMagic={modalMagic}
            handleModalMagicClose={handleModalMagicClose}
            setUseMagic={setUseMagic}
            setIsMagicalAttack={setIsMagicalAttack}
            //
            isMagicalAttack={isMagicalAttack}
          />
        </Col>
      </Row>
    </>
  );
};

export default Game;
