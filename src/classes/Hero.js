import { v4 as uuidv4 } from "uuid";
import { Status } from "./Status";

export class Hero {
  constructor(
    name,
    image,
    type,
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
    this.magic = [];
  }

  getMagic() {
    return this.magic;
  }

  setMagic(magic) {
    this.magic = magic;
  }
}
