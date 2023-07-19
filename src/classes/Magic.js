import { v4 as uuidv4 } from "uuid";
export class Magic {
  constructor(name, value, mp, type) {
    this.id = uuidv4();
    this.name = name;
    this.value = value;
    this.mp = mp;
    this.type = type;
  }
}
