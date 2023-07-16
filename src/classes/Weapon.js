import { v4 as uuidv4 } from "uuid";

export class Weapon {
  constructor(name, type) {
    this.id = uuidv4();
    this.name = name;
    this.type = type;
  }
}
