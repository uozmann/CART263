let p5Copy;
class AnimationYuji {
  constructor(animation, x, y, p5){
    this.x = x;
    this.y = y;
    this.animation = animation;
    p5Copy= p5;
  }

  display() {
    // Animate the frames with mouseX
    let index;
    if (p5Copy.mouseX < 0) { //to avoid errors
      index =0;
    } 
    else if (p5Copy.mouseX >= 1190) { //same
      index = 119;
    }
    else { //assign an index to each mouseX position
      index = p5Copy.floor(p5Copy.map(p5Copy.mouseX, 0, 1190, 0, 119));
    }
    //displaying the corresponding image
    p5Copy.image(this.animation[index], this.x, this.y);
  }
}

export default AnimationYuji;