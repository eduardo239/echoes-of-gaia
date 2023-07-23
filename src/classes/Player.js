import { v4 as uuidv4 } from "uuid";

export class Player {
  constructor(name, image) {
    this.id = uuidv4();
    this.name = name;
    this.gold = 1000;
    this.level = 1;
    this.exp = 0;
    this.nextLevel = this.getNextLevel();
    this.image = image;
    this.expEarned = 0;
  }

  setAddExp() {
    const expEarned = (Math.floor(4 * Math.sqrt(this.level)) / 5) * 10;
    const expTotal = expEarned + this.exp;
    this.expEarned = expEarned;

    console.log("exp Earned " + expEarned);
    if (expTotal > this.nextLevel) {
      console.log("level up");
      this.setLevelUp(expTotal);
    } else {
      console.log("exp++");
      this.exp = expTotal;
    }
  }
  setLevelUp(expTotal) {
    const remainExp = expTotal - this.exp;
    this.exp = remainExp;
    this.nextLevel = this.getNextLevel(this.level + 1);
    this.level += 1;
  }
  getNextLevel() {
    // FIX next level 2 vezes no 30, na primeira vez
    console.log("get next level");
    const factor = 0.3;
    return Math.floor(factor * this.level * 100);
  }
  getLevel() {
    return this.level;
  }

  setAddGold(gold) {
    this.gold += gold;
  }

  getExpEarned() {
    return this.expEarned;
  }
}

/**
 * -------------------
 * ax^2 + bx + c
 * a=0.1
 * b=0.5
 * c=1
 * -------------------
 * ax^2 + bx + c
 * a=0.2
 * b=0.4
 * c=1
 * -------------------
 * exp 8      8       10
 * lvl 1      2       3
 * nxt 10     10      20
 *
 *
 */
