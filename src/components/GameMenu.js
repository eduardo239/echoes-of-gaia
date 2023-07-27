import { v4 as uuidv4 } from "uuid";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {
  chooseRandomItem,
  randomNumber,
  randomlyCombineArrays,
} from "../helper";
import { BOSS, ENEMY, HERO, ITEM } from "../helper/constants";
import { useContext } from "react";
import { PlayerContext } from "../hook/PlayerContext";

const GameMenu = ({
  firstInTheQueue,

  dice,
  setDice,

  setPosition,
  position,

  isFighting,
  isEnemyFighting,

  setIsFighting,
  setShow,

  handleModalGiftShow,
  handleModalShopShow,
  handleModalInventoryShow,

  nextTurn,
}) => {
  // eslint-disable-next-line no-unused-vars
  const {
    map,
    player,
    heroList,
    setEnemyList,
    setBattleQueue,
    shopItems,
    giftItemList,
    setGiftItemList,
    // toastMessage,
    // setToastMessage,
  } = useContext(PlayerContext);

  // gerar um item aleatório
  const getRandomItems = () => {
    console.log("get random items");
    const itemList = shopItems;
    const giftItem1 = chooseRandomItem(itemList);
    const giftItem2 = chooseRandomItem(itemList);
    //
    const _item1 = { ...giftItem1 };
    _item1.id = uuidv4();
    const _item2 = { ...giftItem2 };
    _item2.id = uuidv4();
    //
    setGiftItemList([...giftItemList, _item1, _item2]);
    handleModalGiftShow();
  };
  // validar o tipo de local em que o personagem chegou
  const checkPosition = (position) => {
    console.log("check position");
    const positionType = map.positions[position][0].type;
    const positionData = map.positions[position];
    // validar os personagens que estão vivos, na heroList
    const _heroList = heroList.filter((x) => x.status.isAlive);
    //
    switch (positionType) {
      case ENEMY:
        console.log("enemy founded");

        const randomlyQueue = randomlyCombineArrays(positionData, _heroList);
        setEnemyList(positionData);
        setBattleQueue(randomlyQueue);
        setIsFighting(true);
        break;
      case ITEM:
        console.log("item founded");

        getRandomItems();
        break;
      case BOSS:
        console.log("boss founded");
        const randomlyBossQueue = randomlyCombineArrays(
          positionData,
          _heroList
        );

        setEnemyList(positionData);
        setBattleQueue(randomlyBossQueue);
        setIsFighting(true);
        break;
      default:
        break;
    }
  };

  // personagem se move no mapa
  const moveTo = (position) => {
    console.log("move to " + position);
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

  // usuário joga o dado
  const rollTheDice = () => {
    const result = randomNumber(1, 6);
    console.log("roll the dice " + result);
    setDice(result);
    moveTo(position + result);
  };

  return (
    <div className="d-flex justify-content-center">
      <ButtonGroup vertical style={{ minWidth: "12rem" }}>
        <div className="dice-container">
          <span className="dice">{dice}</span>
        </div>
        <Button
          disabled={!map || isFighting}
          variant="danger"
          onClick={rollTheDice}
        >
          Play !
        </Button>
        <Button disabled={isFighting || !player} onClick={handleModalShopShow}>
          Shop
        </Button>
        <Button
          disabled={!player || isEnemyFighting}
          onClick={handleModalInventoryShow}
        >
          Inventory
        </Button>

        <Button
          disabled={
            (firstInTheQueue || !isFighting) &&
            (!isFighting || firstInTheQueue.type === HERO)
          }
          onClick={() => nextTurn()}
          variant={
            isFighting &&
            (firstInTheQueue.type === ENEMY || firstInTheQueue.type === BOSS)
              ? "danger"
              : "primary"
          }
        >
          Enemy Turn!
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default GameMenu;
