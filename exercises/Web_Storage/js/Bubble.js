//This is the class to hold the images and behaviours of the animals

class Bubble {
//Create general animal object
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = 1;
    this.vy = 1;
    this.found = false;
  }

//Add movement to the racing animals
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > width || this.x < 0) {
      this.vx = -this.vx;
    }
  }

//Return to initial position
  clear() {
    if (this.y > height) {
      bubble.bottom = true;
    }
  }

//Check if animal overlaps with the ellipse
  checkOverlap() {
    let d = dist(indexX, indexY-100, this.x, this.y);
    if (d<= 75) {
      this.overlap = true;
    }
    else {
      this.overlap = false;
    }
  }

// Checks if the animal was clicked and remembers it was found if so
  mousePressed() {
    if (!this.found && this.overlap) {
      this.found = true;
    }
  }

 // Display the animal image
  display() {
    push();
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}