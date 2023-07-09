import { ENEMY, ITEM, EMPTY } from "./constants";
import { bosses, enemies, items, empty } from "./server2";

export function generateRandomNumber(min, max) {
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
  //const types = [EMPTY, ENEMY, ENEMY, ITEM];
  const types = [ENEMY];
  const map = [];

  for (let index = 0; index < quantity; index++) {
    const randomNumber = Math.floor(Math.random() * types.length);
    const randomObject = types[randomNumber];

    if (randomObject === ENEMY) {
      const numEnemies = Math.floor(Math.random() * 3) + 1;
      const multipleEnemies = [];
      for (let x = 1; x <= numEnemies; x++) {
        const enemy = chooseRandomItem(enemies);
        multipleEnemies.push(enemy);
      }
      map.push(multipleEnemies);
    } else if (randomObject === ITEM) {
      const item = chooseRandomItem(items);
      map.push([item]);
    } else if (randomObject === EMPTY) {
      map.push([empty[0]]);
    }
  }
  map[0] = [{ name: "Start", type: "start" }];
  const boss = chooseRandomItem(bosses);
  map[map.length - 1] = [boss];
  return map;
};
