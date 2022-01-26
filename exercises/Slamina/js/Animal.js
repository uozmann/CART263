//This is the class to hold the images and behaviours of the animals

class Animal {
//Create general animal object
  constructor(x, y, vx, image) {
    this.x = x;
    this.y = y;
    this.image = image;

    this.flip = false;
    this.found = false;
    this.overlap = false;

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

//Check if animal overlaps with the ellipse
  checkOverlap() {
    let d = dist(trap.x, trap.y, this.x, this.y);
    if (d<= 75) {
      this.overlap = true;
    }
    else {
      this.overlap = false;
    }
  }

// Checks if this sausage dog was clicked and remembers it was found if so
  mousePressed() {
    if (!this.found && this.overlap) {
      this.found = true;
      this.react();
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