import { BOSS, ENEMY, ITEM, NOTHING } from "./constants";
import { bosses, enemies, items, heroes } from "./server2";

export function chooseRandomItem(list = []) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

export const generateRandomMap = () => {
  const types = [NOTHING, ENEMY, ITEM, BOSS];
  const map = [];

  for (let index = 0; index < 35; index++) {
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
    } else if (randomObject === BOSS) {
      const boss = chooseRandomItem(bosses);
      map.push([boss]);
    } else {
      map.push([{ name: "Nothing", type: "empty" }]);
    }
  }
  map[0] = [{ name: "Start", type: "start" }];
  const boss = chooseRandomItem(bosses);
  map[map.length - 1] = [boss];
  return map;
};
