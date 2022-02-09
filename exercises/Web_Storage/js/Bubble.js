//This is the class to hold the images and behaviours of the bubbles

class Bubble {
//Create general bubble object
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = 1;
    this.vy = 1;
  }

//Add movement to the bubble
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > width || this.x < 0) {
      this.vx = -this.vx;
    }
  }

//Clear bubble once it reaches the bottom
  clear() {
    if (this.y > height) {
      bubble.bottom = true;
    }
  }

//Check if bubble overlaps with the needle
  checkOverlap() {
    let d = dist(indexX, indexY, this.x, this.y);
    if (d<= 100) {
      bubble.overlap = true;
      bubble.found = true;
    }
    else {
      bubble.overlap = false;
    }
    // Checks if the bubble was clicked and remembers it was found
    // if (!bubble.found && bubble.overlap) {
      
    // }
  }


  mousePressed() {
  }

 // Display the bubble shape
  display() {
    push();
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}