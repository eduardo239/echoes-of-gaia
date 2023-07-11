export const heroes = [
  {
    id: "5231e313-4865-43fb-8abf-1cbesf7eb811",
    name: "Mary",
    class: "Warrior",
    level: 1,
    exp: 0,
    strength: 75,
    live: true,
    intelligence: 60,
    weapon: "Sword",
    hp: 100,
    maxHp: 100,
    mp: 10,
    maxMp: 100,
    gold: 0,
    type: "Hero",
    image: "./assets/japanese.png",
  },
  {
    id: "5231e313-4865-43fb-8abf-1cab1f7eb811",
    name: "Prix",
    class: "Sorceress",
    level: 1,
    exp: 0,
    strength: 75,
    live: true,
    intelligence: 35,
    weapon: "Staff",
    hp: 100,
    maxHp: 100,
    mp: 45,
    maxMp: 45,
    gold: 0,
    type: "Hero",
    image: "./assets/red_rid.png",
  },
];
export const heroes2 = [
  {
    id: "5231e313-4865-43fb-8abf-1be1faeb811",
    name: "Amy Iris",
    class: "Mage",
    level: 1,
    exp: 0,
    strength: 12,
    live: true,
    intelligence: 3,
    weapon: "Magic Stone",
    hp: 100,
    maxHp: 100,
    mp: 55,
    maxMp: 55,
    gold: 0,
    type: "Hero",
    image: "./assets/blond.png",
  },
];
export const enemies = [
  {
    id: "86511949-bba4-44bf-a7c9-405r965e75b7",
    name: "Goblinet",
    class: "Normal",
    type: "Enemy",
    level: 2,
    intelligence: 0,
    hp: 40,
    strength: 4,
    live: true,
    image: "../assets/goblin1.png",
  },
  {
    id: "86501319-bba4-44bf-a7c9-4055d965e7b7",
    name: "Goblinight",
    class: "Normal",
    type: "Enemy",
    level: 1,
    intelligence: 0,
    hp: 30,
    strength: 3,
    live: true,
    image: "../assets/goblin2.png",
  },
  {
    id: "84401949-bba4-44bf-a7c9-05s5965e75b7",
    name: "Goblinho",
    class: "Normal",
    type: "Enemy",
    level: 3,
    intelligence: 0,
    hp: 50,
    strength: 5,
    live: true,
    image: "../assets/goblin3.png",
  },

  {
    id: "84401aa9-bba4-44xf-a7c9-05s5965e7547",
    name: "Caterpillar",
    class: "Medium",
    type: "Enemy",
    level: 5,
    intelligence: 0,
    hp: 60,
    strength: 12,
    live: true,
    image: "../assets/caterpillar.png",
  },
  {
    id: "84401aa9-bba4-44xf-a7c9-05s21357547",
    name: "Undead",
    class: "Hard",
    type: "Enemy",
    level: 6,
    intelligence: 0,
    hp: 70,
    strength: 10,
    live: true,
    image: "../assets/undead.png",
  },
];
export const items = [
  {
    id: "82a0344c-ae51-44fb-87e-f704f80e3de6",
    name: "Healing Potion",
    value: 80,
    price: 50,
    type: "Item",
    class: "Cure",
    image: "../assets/red.png",
  },
  {
    id: "2a0344c-ae51-44fb-87e-f704f80e3de6",
    name: "Mana Potion",
    value: 50,
    price: 35,
    type: "Item",
    class: "Mana",
    image: "../assets/blue.png",
  },
  {
    id: "82a0344c-ae1-44fb-87e-f704f80e3de6",
    name: "Poison Potion",
    value: 40,
    price: 5,
    type: "Item",
    class: "Poison",
    image: "../assets/green.png",
  },
  {
    id: "82a034c-ae51-44fb-87e-f704f80e3de6",
    name: "Elixir Potion",
    value: 200,
    price: 200,
    type: "Item",
    class: "Elixir",
    image: "../assets/white.png",
  },
];
export const bosses = [
  {
    id: "cfa22ba6-0c0-4dac-9bde-c1eb5154408",
    name: "Evil Dragon",
    strength: 55,
    live: true,
    intelligence: 14,
    type: "Boss",
    level: 40,
    hp: 1000,
    image: "../assets/dragon.png",
  },
];
export const empty = [{ name: "Empty", type: "Empty" }];
