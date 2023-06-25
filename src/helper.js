export function rollDice() {
  var sides = 6;
  var randomNumber = Math.floor(Math.random() * sides) + 1;
  return randomNumber;
}

// generate
export function generateRandomItem() {
  const itemTypes = ["enemy", "boss", "potion", "treasure", "nothing"];
  const randomIndex = Math.floor(Math.random() * itemTypes.length);
  const randomItemType = itemTypes[randomIndex];

  switch (randomItemType) {
    case "enemy":
      return {
        type: "enemy",
        name: "Goblin",
        level: 3,
        health: 50,
        damage: 10,
      };
    case "boss":
      return {
        type: "boss",
        name: "Dragon",
        level: 10,
        health: 500,
        damage: 50,
      };
    case "potion":
      return {
        type: "potion",
        name: "Health Potion",
        healing: 50,
      };
    case "treasure":
      return {
        type: "treasure",
        name: "Chest",
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
