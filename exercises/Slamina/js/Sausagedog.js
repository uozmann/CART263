class Sausagedog extends Animal {
  constructor(x, y, vx, image) {
    super(x, y, vx, image);

    this.found = false;
    this.overlap = false;
    this.angle = 0;
    this.rotationSpeed = 0.05;
  }

  checkOverlap() {
    let d = dist(trap.x, trap.y, this.x, this.y);
    if (d<= 75) {
      this.overlap = true;
    }
    else {
      this.overlap = false;
    }
  }

  react() {
    
    
  }

  displayRotation() {
    this.angle += this.rotationSpeed;
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
  }

  // Checks if this sausage dog was clicked and remembers it was found if so
  mousePressed() {
    if (!this.found && this.overlap) {
      this.found = true;
      this.react();
    }
  }

}