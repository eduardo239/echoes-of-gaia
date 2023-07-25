import { v4 as uuidv4 } from "uuid";

export class Map_ {
  constructor(name, length, difficulty, image, isAvailable) {
    this.id = uuidv4();
    this.name = name;
    this.length = length;
    this.difficulty = difficulty;
    this.image = image;
    this.positions = [];
    this.isAvailable = isAvailable;
  }

  setPositions(positions) {
    this.positions = positions;
  }

  setIsAvailable(available) {
    this.isAvailable = available;
  }
}
