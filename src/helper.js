import { Enemy } from "./classes/Enemy";
import { Item } from "./classes/Item";
import { ENEMY, ITEM, EMPTY } from "./constants";
import { bosses, enemies, items, empty, start } from "./server";
import { v4 as uuidv4 } from "uuid";

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomlyCombineArrays(array1, array2) {
  var newArray = array1.concat(array2);
  var result = [];

  while (newArray.length > 0) {
    var randomIndex = Math.floor(Math.random() * newArray.length);
    var randomItem = newArray.splice(randomIndex, 1)[0];
    result.push(randomItem);
  }

  return result;
}

export function chooseRandomItem(list = []) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

export const generateRandomMap = (quantity = 20) => {
  const types = [EMPTY, ENEMY, ENEMY, ITEM, ENEMY, EMPTY, EMPTY];

  const map = [];

  for (let index = 0; index < quantity; index++) {
    const randomNumber = Math.floor(Math.random() * types.length);
    const randomObject = types[randomNumber];

    if (randomObject === ENEMY) {
      const numEnemies = Math.floor(Math.random() * 3) + 1;
      const multipleEnemies = [];
      for (let x = 1; x <= numEnemies; x++) {
        const x = chooseRandomItem(enemies);

        const _newCharacter = new Enemy(
          x.name,
          x.image,
          x.type,
          x.class,
          x.level,
          x.strength,
          x.intelligence,
          x.hp,
          x.maxHp,
          x.mp,
          x.maxMp,
          x.weapon
        );

        multipleEnemies.push(_newCharacter);
      }
      map.push(multipleEnemies);
    } else if (randomObject === ITEM) {
      const x = chooseRandomItem(items);

      const _newItem = new Item(
        x.name,
        x.image,
        x.type,
        x.class,
        x.value,
        x.price
      );

      map.push([_newItem]);
    } else if (randomObject === EMPTY) {
      let newEmpty = empty;

      const _newEmpty = { ...newEmpty };
      _newEmpty.id = uuidv4();

      map.push([_newEmpty]);
    }
  }
  map[0] = [start];
  const x = chooseRandomItem(bosses);
  const _newBoss = new Enemy(
    x.name,
    x.image,
    x.type,
    x.class,
    x.level,
    x.strength,
    x.intelligence,
    x.hp,
    x.maxHp,
    x.mp,
    x.maxMp,
    x.weapon
  );
  map[map.length - 1] = [_newBoss];
  return map;
};

export const generateNewId = (list) => {
  const _newList = [];
  for (let i = 0; i < list.length; i++) {
    const _newCharacter = { ...list[i] };
    _newCharacter.id = uuidv4();
    _newList.push(_newCharacter);
  }
  return _newList;
};
