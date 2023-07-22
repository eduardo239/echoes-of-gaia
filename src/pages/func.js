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
