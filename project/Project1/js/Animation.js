let p5Copy;
class Animation {
  constructor(animation, x, y, frames, p5){
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.frames = frames;
    p5Copy= p5;
  }

  displayAutoAnim() { 
    let indexAuto; 
    indexAuto = 0;
    console.log(indexAuto);
    if (indexAuto <= this.frames) {
      indexAuto += 1;
    } else {
      indexAuto = this.frames;
    }
    //displaying the corresponding image
    p5Copy.image(this.animation[indexAuto], this.x, this.y);
  }


  displayMouseAnim() {
    // Animate the frames with mouseX
    let indexMouse;
    if (p5Copy.mouseX < 0) { //to avoid errors
      indexMouse =0;
    } 
    else if (p5Copy.mouseX >= 1190) { //same
      indexMouse = this.frames;
    }
    else { //assign an index to each mouseX position
      indexMouse = p5Copy.floor(p5Copy.map(p5Copy.mouseX, 0, 1190, 0, this.frames));
    }
    //displaying the corresponding image
    p5Copy.image(this.animation[indexMouse], this.x, this.y);
  }
}

export default Animation;