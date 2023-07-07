import { ENEMY, ITEM, EMPTY } from "./constants";
import { bosses, enemies, items, empty } from "./server2";

export function randomlyCombineArrays(array1, array2) {
  var newArray = array1.concat(array2); // Combina as duas arrays em uma nova array
  var result = [];

  while (newArray.length > 0) {
    var randomIndex = Math.floor(Math.random() * newArray.length); // Gera um índice aleatório
    var randomItem = newArray.splice(randomIndex, 1)[0]; // Remove e obtém o item aleatório
    result.push(randomItem); // Adiciona o item aleatório na nova array
  }

  return result;
}

export function chooseRandomItem(list = []) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

export const generateRandomMap = () => {
  //const types = [EMPTY, ENEMY, ENEMY, ITEM];
  const types = [ENEMY];
  const map = [];

  for (let index = 0; index < 120; index++) {
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

export function generateRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export function rearrangeList(list) {
  if (!Array.isArray(list)) {
    throw new Error("O argumento deve ser uma lista.");
  }
  if (list.length < 2) {
    return list;
  }
  const firstItem = list.shift();
  list.push(firstItem);
  return list;
}
