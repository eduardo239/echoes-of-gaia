import { v4 as uuidv4 } from "uuid";

export class Item {
  constructor(name, image, type, _class, value, price) {
    this.id = uuidv4();
    this.name = name;
    this.image = image;
    this.type = type;
    this.class = _class;
    this.value = value;
    this.price = price;
  }
}
