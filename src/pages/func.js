export const removeAnObjectFromTheList = (character, list) => {
  const new_queue = list.filter((x) => x.id !== character.id);
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
  const itemsByType = {};
  list.forEach((item) => {
    const { name } = item;
    if (!itemsByType[name]) {
      itemsByType[name] = [];
    }
    itemsByType[name].push(item);
  });
  return itemsByType;
};
