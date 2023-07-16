export class Status {
  constructor(strength, intelligence, hp, maxHp, mp = null, maxMp = null) {
    this.strength = strength;
    this.intelligence = intelligence;
    this.hp = hp;
    this.maxHp = maxHp;
    this.mp = mp;
    this.maxMp = maxMp;
    this.isAlive = true;
  }
}
