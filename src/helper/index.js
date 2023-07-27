import { Enemy } from "../classes/Enemy";
import { Item } from "../classes/Item";
import {
  ENEMY,
  ITEM,
  EMPTY,
  HEALING_BIG_POTION,
  HEALING_POTION,
  MANA_POTION,
  MANA_BIG_POTION,
  POISON_BIG_POTION,
  POISON_POTION,
  REBORN_RARE_POTION,
  REBORN_POTION,
} from "../helper/constants";
import { bosses, enemies, items, empty, start } from "../helper/server";
import { v4 as uuidv4 } from "uuid";

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
  const itemsByType = [];
  list.forEach((item) => {
    const { name } = item;
    if (!itemsByType[name]) {
      itemsByType[name] = [];
    }
    itemsByType[name].push(item);
  });
  return itemsByType;
};

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
  // const types = [EMPTY, ENEMY, ENEMY, ITEM, ENEMY, EMPTY, EMPTY];
  //const types = [EMPTY];
  const types = [ENEMY, ENEMY, ENEMY, ITEM];
  // const types = [ITEM];

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

  const _startLocation = { ...start };
  _startLocation.id = uuidv4();

  map[0] = [_startLocation];
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

export function formateDate(data) {
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear().toString().slice(-2); // Pegar apenas os dois últimos dígitos do ano
  const hora = data.getHours().toString().padStart(2, "0");
  const minuto = data.getMinutes().toString().padStart(2, "0");
  const segundo = data.getSeconds().toString().padStart(2, "0");

  return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
}

export const logManager = (message) => {
  const _date = formateDate(new Date());
  return { date: _date, message: ` # ${message}` };
};
