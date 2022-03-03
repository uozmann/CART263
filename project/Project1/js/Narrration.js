//Bottom text display during special ending
let p5Copy4;
class Narration {
    constructor(p5) {
        this.x = 0;
        this.y = undefined;
        this.longueur = undefined;
        this.largeur = 50;
        this.textX= 50;
        this.textY = undefined;
        p5Copy4 = p5;
    }
  
     // display the clue button in colour
    display(line, currentLine) {
        p5Copy4.push();
        this.y = p5Copy4.height-50;
        this.longueur = p5Copy4.width;
        this.textY = p5Copy4.height-15;
       //Narration line
        p5Copy4.textSize(24);
        p5Copy4.fill(0);
        p5Copy4.rect(this.x, this.y, this.longueur, this.largeur);
        p5Copy4.fill(255);
        p5Copy4.text(line[currentLine], this.textX, this.textY);
        p5Copy4.pop();
    }
}
        
  
  export default Narration;