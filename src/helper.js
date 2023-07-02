import { enemies, bosses, items } from "./server";

export function rollDice() {
  var sides = 6;
  var randomNumber = Math.floor(Math.random() * sides) + 1;
  return randomNumber;
}

export function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomItem() {
  // const itemTypes = ["enemy", "boss", "potion", "treasure", "nothing"];
  const itemTypes = ["treasure"];
  const randomIndex = Math.floor(Math.random() * itemTypes.length);
  const randomItemType = itemTypes[randomIndex];

  switch (randomItemType) {
    case "enemy":
      const enemy = getRandomItem(enemies);
      return enemy;
    case "boss":
      const boss = getRandomItem(bosses);
      return boss;
    case "potion":
      const item = getRandomItem(items);
      return item;
    case "treasure":
      return {
        type: "treasure",
        name: "Chest",
        value: 50,
        price: 350,

        rewards: ["Gold", "Gem"],
      };
    default:
      return {
        type: "nothing",
        name: "Empty",
      };
  }
}

export const generateRandomItemAndPlaceItems = (customNumberOfItems) => {
  // Generate random items
  const numberOfItems = customNumberOfItems ? customNumberOfItems : 25;
  const items = [];

  for (let i = 0; i < numberOfItems; i++) {
    const randomItem = generateRandomItem();
    items.push(randomItem);
  }

  return items;
};

export function getRandomItem(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
