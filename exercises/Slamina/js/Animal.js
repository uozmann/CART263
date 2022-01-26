class Animal {
//Create general animal object
  constructor(x, y, vx, image) {
    this.x = x;
    this.y = y;
    this.image = image;

    this.flip = false;

    this.vx = vx;
    this.vy = 0;
  }

//Add movement to the racing animals
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

//Return to initial position
  wrap() {
    if (this.x > width || this.x < 0) {
      this.vx = -this.vx;
      this.flip = !this.flip;
    }
  }

 // Display the animal image
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }
}