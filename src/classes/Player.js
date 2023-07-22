import { v4 as uuidv4 } from "uuid";

export class Player {
  constructor(name, image) {
    this.id = uuidv4();
    this.name = name;
    this.gold = 1000;
    this.level = 1;
    this.exp = 0;
    this.nextLevel = 100;
    this.image = image;
  }
}
