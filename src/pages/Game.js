import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useState } from "react";
import { PlayerContext } from "../hook/PlayerContext";
import GameNavbar from "../components/NavBar";
import HeroList from "../components/map/HeroList";
import { ENEMY } from "../constants";
import { nextTurn, selectedTarget } from "./func";
import GameMenu from "../components/GameMenu";
import MapForQueue from "../components/map/MapForQueue";
import MapForList from "../components/map/MapForList";
import EnemyList from "../components/map/EnemyList";

const Game = () => {
  const { map, player, heroList, battleQueue } = useContext(PlayerContext);

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
  const firstInTheQueue = isFighting && battleQueue[0] ? battleQueue[0] : null;
  console.log(map);
  return (
    <>
      <Row>
        <Col>
          <GameNavbar player={player} />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-start">
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
            <div className="d-flex align-items-center p-3">VS</div>
            <div className="d-flex align-items-start">
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
          <MapForList list={map.positions} position={position} />
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
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Cards</p>
        </Col>
      </Row>
    </>
  );
};

export default Game;
