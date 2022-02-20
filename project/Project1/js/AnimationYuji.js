class AnimationYuji {
  constructor(animation, x, y){
    this.x = x;
    this.y = y;
    this.animation = animation;
  }

  animate() {
    
  }

  display() {
    // Animate the frames with mouseX
    let index;
    if (mouseX < 0) { //to avoid errors
      index =0;
    } 
    else if (mouseX >= 1190) { //same
      index = 119;
    }
    else { //assign an index to each mouseX position
      index = floor(map(mouseX, 0, 1190, 0, 119));
    }
    //displaying the corresponding image
    image(this.animation[index], this.x, this.y);
  }
}