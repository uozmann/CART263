class Otherdog extends Animal {
  constructor(x, y) {
    super(x, y, vx, image);
    this.vx = random(2,5);
  }

  display() {
    super.display();
  }
}