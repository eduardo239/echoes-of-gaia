import { v4 as uuidv4 } from "uuid";
import { Status } from "./Status";
import { Magic } from "./Magic";
import { FIRE } from "../constants";

export class Hero {
  constructor(
    name,
    image,
    type,
    level,
    _class,
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
    this.status.isAlive = true;
    this.magic = [new Magic("fire", 12, 25, FIRE)];
  }
}
