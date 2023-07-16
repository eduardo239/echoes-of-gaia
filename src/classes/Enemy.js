import { v4 as uuidv4 } from "uuid";
import { Status } from "./Status";

export class Enemy {
  constructor(
    name,
    image,
    type,
    _class,
    level,
    strength,
    intelligence,
    hp,
    maxHp,
    mp,
    maxMp,
    weapon
  ) {
    this.id = uuidv4();
    this.name = name;
    this.image = image;
    this.type = type;
    this.class = _class;
    this.level = level;
    this.status = new Status(
      strength,
      intelligence,
      hp,
      maxHp,
      mp,
      maxMp,
      weapon
    );
  }
}
