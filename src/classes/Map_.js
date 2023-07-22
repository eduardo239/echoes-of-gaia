import { v4 as uuidv4 } from "uuid";

export class Map_ {
  constructor(name, length, difficulty, image) {
    this.id = uuidv4();
    this.name = name;
    this.length = length;
    this.difficulty = difficulty;
    this.image = image;
    this.positions = [];
  }

  setPositions(positions) {
    this.positions = positions;
  }
}
