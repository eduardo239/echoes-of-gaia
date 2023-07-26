import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useState } from "react";
import { PlayerContext } from "../hook/PlayerContext";
import GameNavbar from "../components/NavBar";
import HeroList from "../components/map/HeroList";
import {
  BOSS,
  CURE,
  ELIXIR,
  ENEMY,
  GAME_OVER,
  GIFT,
  HERO,
  ITEM,
  MAGIC,
  MANA,
  POISON,
  REBORN,
  WINNER,
} from "../constants";
import { removeAnObjectFromTheList, updateTheList } from "../helper";
import GameMenu from "../components/GameMenu";
import MapForQueue from "../components/map/MapForQueue";
import MapForList from "../components/map/MapForList";
import EnemyList from "../components/map/EnemyList";
import { chooseRandomItem } from "../helper";
import ModalShop from "../components/modal/ModalShop";
import ModalInventory from "../components/modal/ModalInventory";
import ModalGift from "../components/modal/ModalGift";
import ModalMagic from "../components/modal/ModalMagic";
import ModalWinner from "../components/modal/ModalWinner";
import ModalGameOver from "../components/modal/ModalGameOver";

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
    setMap,
    setGiftItemList,
    setPlayer,
    allMaps,
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
  //
  const [modalGameOver, setModalGameOver] = useState(false);
  const handleModalGameOverClose = () => setModalGameOver(false);
  const handleModalGameOverShow = () => setModalGameOver(true);
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
  //
  const selectedTarget = (target) => {
    console.log("selected target");
    const character = battleQueue[0];
    if (isPhysicalAttack) {
      const result = physicalDamage(character, target);
      // check if its alive
      checkIfItsAlive(result);
      setIsPhysicalAttack(false);
    } else if (isMagicalAttack) {
      const result = magicalDamage(character, target);
      // check if its alive
      checkIfItsAlive(result);
      setIsMagicalAttack(false);
    }
    // reorderTheQueue(battleQueue);
  };
  const physicalDamage = (character, target) => {
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
    let newQueue = battleQueue;
    // validar hp
    if (character.status.hp < 1) {
      newQueue = removeAnObjectFromTheList(character, battleQueue);
      console.log("reordered if is dead");
      reorderTheQueue(newQueue);
      // validate if its alive
      if (character.type === ENEMY) {
        console.log("enemy is dead");
        const _enemyList = removeAnObjectFromTheList(character, enemyList);
        setEnemyList(_enemyList);

        const isTheListEmpty = _enemyList.length === 0;
        if (isTheListEmpty) battleWon();
        // validar hero
      } else if (character.type === HERO) {
        console.log("hero is dead");
        character.status.isAlive = false;

        const isThereAHero = battleQueue.some((x) => x.type === HERO);

        if (!isThereAHero) gameOver();
      } else if (character.type === BOSS) {
        console.log("defeated boss");
        // completed map, add more exp, more gifts, more gold
        completedMap();
        // revive dead characters
        // back to map selections
      }
    } else {
      console.log("character is alive");
      updateTheList(character, setBattleQueue);
      updateTheList(character, setEnemyList);
      updateTheList(character, setHeroList);
      console.log("reordered if is alive");
      reorderTheQueue(newQueue);
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

    player.setAddExp();
    resetBattle();
    handleModalWinnerShow();
  };
  const gameOver = () => {
    console.log("game over");

    handleModalGameOverShow();
  };

  const completedMap = () => {
    console.log(map);
    console.log(allMaps);
    console.log(player);

    for (let i = 0; i < allMaps.length - 1; i++) {
      if (allMaps[i].id === map.id) {
        map.isCompleted = true;
        allMaps[i + 1].isAvailable = true;
      }
    }
    console.log(allMaps);
  };

  const nextTurn = () => {
    console.log("next turn");

    startEnemyTurn();
  };
  const startEnemyTurn = () => {
    console.log("start enemy turn");
    const enemy_attacking = battleQueue[0];
    // get random hero
    const random_hero = chooseRandomItem(heroList);
    // cause damage
    physicalDamage(enemy_attacking, random_hero);
    // check if its alive
    checkIfItsAlive(random_hero);
  };
  const resetBattle = () => {
    console.log("reset battle");
    setBattleQueue([]);
    setEnemyList([]);
    setGiftItemList([]);
    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);
    setIsUsingItem(false);
    setIsFighting(false);
    setUseItem(null);
  };
  const resetGame = () => {
    console.log("reset game");
    resetBattle();
    //
    setPlayer(null);
    setHeroList([]);
    setMap(null);
    setInventory([]);
  };
  const selectedTargetToUseItem = (hero) => {
    console.log("use item");
    const _item = useItem;

    switchOverItems(_item, hero);
    setIsUsingItem(false);
  };
  const switchOverItems = (item, hero) => {
    setIsPhysicalAttack(false);
    setIsMagicalAttack(false);

    const itemId = item.id;
    const newInventoryList = inventory.filter((x) => x.id !== itemId);

    switch (item.class) {
      case CURE:
        if (hero.status.hp < 1) {
          console.log("invalid character");
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

          if (isFighting) {
            console.log("reordered with the reborn");
            reorderTheQueue([...battleQueue, hero]);
          }
        } else {
          console.log("Invalid Character");
        }
        break;
      default:
        console.log("[switchOverItems] item not founded");
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
                isPhysicalAttack={isPhysicalAttack}
                //
                // selectedCharacter={selectedTarget}
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
        <Col md className="bg-dark">
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

          <ModalWinner
            player={player}
            list={heroList}
            modalType={WINNER}
            modalWinner={modalWinner}
            handleModalWinnerClose={handleModalWinnerClose}
          />

          <ModalGameOver
            player={player}
            resetGame={resetGame}
            modalType={GAME_OVER}
            modalGameOver={modalGameOver}
            handleModalGameOverClose={handleModalGameOverClose}
          />
        </Col>
      </Row>
    </>
  );
};

export default Game;
