export const removeAnObjectFromTheList = (character, list) => {
  const new_queue = list.filter((x) => x.id !== character.id);
  console.log(new_queue);
  return new_queue;
};

export const updateTheList = (newObject, setState) => {
  setState((battleQueue) => {
    return battleQueue.map((object) => {
      return object.id === newObject.id ? newObject : object;
    });
  });
};

export const addItemByType = (list) => {
  // Create an object to hold the arrays for each type
  const itemsByType = [];

  // Iterate over the items using forEach
  list.forEach((item) => {
    const { name } = item;

    // If the type array doesn't exist, create an empty array for it
    if (!itemsByType[name]) {
      itemsByType[name] = [];
    }

    // Push the item into the corresponding type array
    itemsByType[name].push(item);
  });
  return itemsByType;
};
