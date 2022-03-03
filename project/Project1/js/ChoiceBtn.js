//All clickable buttons
let p5Copy2;
class ChoiceBtn {
  constructor(x,y,sizeX,sizeY, colour, font, text, p5) {
    this.x= x; //positions specified under setting()
    this.y= y;
    this.sizeX= sizeX;
    this.sizeY= sizeY;
    this.clicked= false;
    this.radius = 10;
    p5Copy2= p5;
    this.colour = colour;
    this.font = font;
    this.text= text;
  }

  display() {
    //Setting up the buttons
  p5Copy2.push();
  //start button
  //Collision checking
  this.clicked = p5Copy2.collidePointRect(p5Copy2.mouseX, p5Copy2.mouseY, this.x, this.y, this.sizeX, this.sizeY);
  //Btn on click
  if (this.clicked) {
    p5Copy2.noFill();
  } else {
    p5Copy2.stroke(this.colour);
  }
  p5Copy2.rect(this.x, this.y, this.sizeX, this.sizeY, this.radius);
  p5Copy2.pop();

  p5Copy2.push();
  p5Copy2.textAlign(p5Copy2.CENTER, p5Copy2.CENTER);
  p5Copy2.textFont(this.font);
  p5Copy2.textSize(32);
  p5Copy2.text(this.text, this.x + this.sizeX/2, this.y + this.sizeY/2);
  p5Copy2.pop();
  }

}

export default ChoiceBtn;