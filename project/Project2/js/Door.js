//doors at the game state
let p5Copy3;
class Door {
  constructor(x,y, edge, fill, p5) {
    this.x= x; //positions specified under setting()
    this.y= y;
    this.sizeX= 320;
    this.sizeY= 240;
    this.clicked= false;
    p5Copy3= p5;
    this.edge = edge;
    this.fill = fill;
    this.currentFill = this.fill;
  }

  closeDoor() {
    this.currentFill = 0;
  }

  openDoor() {
    this.currentFill = 255;
  }

  display() {
    //Setting up the case for the door
  p5Copy3.push();
  p5Copy3.stroke(this.edge);
  // p5Copy3.noStroke();
  p5Copy3.fill(this.currentFill, 50);
  p5Copy3.rect(this.x, this.y, this.sizeX, this.sizeY);
  p5Copy3.pop();
  }

  choose() {
    this.clicked = p5Copy3.collidePointRect(p5Copy3.mouseX, p5Copy3.mouseY, this.x, this.y, this.sizeX, this.sizeY);
  }

}

export default Door;