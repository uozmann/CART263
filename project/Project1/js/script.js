//P5 Library
import "/js/libraries/p5.min.js" ;
import "/js/libraries/p5.collide2d.min.js";
import "/js/libraries/p5.sound.min.js";
//Classes
import AnimationYuji from "./AnimationYuji.js";
import ChoiceBtn from "./ChoiceBtn.js";
//Annyang Library
import "//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js"; 

"use strict";

//Initial State
// let state = `title`;
let state = `assignID`;

//Distances
let courier = {
  regular: undefined,
  bold: undefined,
  italic: undefined
}

//Buttons
let btn = {
  start: undefined,
  about: undefined,
  name: undefined,
  nameInput: `Type Here`,
  birthGender: [],
  birthGenderInput: [`Female`, `Male`],
  identifiedGender: [],
  identifiedGenderInput: [`F.`, `M`, `Else`],
  sexualOrientation: [],
  sexualOrientationInput: [`Bi`, `F.`, `M`, `Else`],
  identifiedSpecies: [],
  identifiedSpeciesInput: [`Human`, `Other`],
  game: undefined,
}

//p5.images
let visual = {
  bg0: undefined,
  bg1: undefined,
  bg2: undefined,
  bg3: undefined,
  bgX: 0,
  bgY:0,
  animationYuji: [],
  videoYuji: undefined,
}

//colours
let colours = {
  black: 0,
  white: 255,
  yellowPale: [255,255,150],
}

//imported p5, all the rest of the codes are inside this anonymous function
new p5(function(p5){

//Loading images and fonts
p5.preload = function() {
  //fonts
  courier.regular = p5.loadFont(`assets/fonts/Courier/CourierPrime-Regular.ttf`);
  courier.bold = p5.loadFont(`assets/fonts/Courier/CourierPrime-Bold.ttf`);
  courier.italic = p5.loadFont(`assets/fonts/Courier/CourierPrime-Italic.ttf`);
  //visuals
  visual.bg0 = p5.loadImage(`assets/images/bg0.jpg`);
  visual.bg1 = p5.loadImage(`assets/images/bg1.jpg`);
  visual.bg2 = p5.loadImage(`assets/images/bg2.png`);
  visual.bg3 = p5.loadImage(`assets/images/bg3.png`);
  for (let i = 0; i < 120; i++) { //images frame for the animation
    let loadedImage;
    if (i< 10) {
      loadedImage = p5.loadImage(`assets/images/comp1/yujiAnim_0000${i}.png`);
    }
    else if (i>= 10 && i< 100) {
      loadedImage = p5.loadImage(`assets/images/comp1/yujiAnim_000${i}.png`);
    }
    else {
      loadedImage = p5.loadImage(`assets/images/comp1/yujiAnim_00${i}.png`);
    }
    visual.animationYuji.push(loadedImage);
  }
  
}

//Canvas, buttons, animation, annyang
p5.setup = function() {
  p5.createCanvas(1280, 720);
  //Buttons
  btn.start= new ChoiceBtn(p5.width*5/7 +70, p5.height*5/8, 200, 50, colours.black, courier.regular, `START`, p5);
  btn.about= new ChoiceBtn(p5.width*5/7 +70, p5.height*5/8 + 100, 200, 50, colours.black, courier.regular, `ABOUT`, p5);
  btn.game= new ChoiceBtn(p5.width*7/8, p5.height/10, 100, 100, colours.black, courier.regular, `NEXT`, p5);
  btn.name= new ChoiceBtn(p5.width/2, p5.height*2/5 - 20, 400, 50, colours.black, courier.regular, btn.nameInput, p5);
  for (let i = 0; i<2; i++) { //birth gender buttons
    let x = p5.width/2 + i*(200 + 25);
    let btnObject= new ChoiceBtn(x, p5.height*2/5 + 55, 200, 50, colours.black, courier.regular, btn.birthGenderInput[i], p5);
    btn.birthGender.push(btnObject);
  };

  for (let i = 0; i<3; i++) { //identified gender buttons
    let x = p5.width/2 + i*(150 + 25);
    let btnObject= new ChoiceBtn(x, p5.height*2/5 + 130, 150, 50, colours.black, courier.regular, btn.identifiedGenderInput[i], p5);
    btn.identifiedGender.push(btnObject);
  };

  for (let i = 0; i<4; i++) { //sexual orientation buttons
    let x = p5.width/2 + i*(150 + 25);
    let btnObject= new ChoiceBtn(x, p5.height*2/5 + 205, 100, 50, colours.black, courier.regular, btn.sexualOrientationInput[i], p5);
    btn.sexualOrientation.push(btnObject);
  };

  for (let i = 0; i<2; i++) { //specie buttons
    let x = p5.width/2 + i*(200 + 25);
    let btnObject= new ChoiceBtn(x, p5.height*2/5 + 280, 200, 50, colours.black, courier.regular, btn.identifiedSpeciesInput[i], p5);
    btn.identifiedSpecies.push(btnObject);
  };  
  
    //Animation 1 for Yuji
    visual.videoYuji = new AnimationYuji(visual.animationYuji, 0, 0, p5);

    // //Annyang
    // if (window.annyang) {
    //   // Create commands
    //   let commands = {
    //     'My name is *name': setName,
    //   }
    //   // Add the commands and start annyang
    //   window.annyang.addCommands(commands);
    //   window.annyang.start();
    // }

    // //Responsice voice
    // window.responsiveVoice.speak("Hello");
}

function setName(name) {
  console.log(name);
}

p5.draw = function() {
  p5.background(0);
  switch (state) {
    case `title`:
      title();
      break;
  
    case `profileSetting`:
      profileSetting();
      break;
  
    case `about`:
      about();
      break;

    case `assignID`:
      assignID();
      break;

    case `game`:
      game();
      break;
  }

  console.log(state);
  
}

function title() {
  // Tittle texts and animations
  p5.push();
  p5.image(visual.bg0, 0, 0);
  p5.textAlign(p5.CENTER, p5.CENTER);
  p5.textFont(courier.bold);
  p5.textSize(48);
  p5.text(`PaperMan`, p5.width*5/7 +70 + 100, p5.height/3);
  p5.pop();

  visual.videoYuji.display();//display the animation frame

  //Call functionalities of buttons
  btn.start.display();
  btn.about.display();
}

//State
function about() {
  
}

//State
function profileSetting() {
  p5.push();
  p5.image(visual.bg1, 0, 0);
  p5.textAlign(p5.CENTER, p5.CENTER);

  //header
  p5.textFont(courier.bold);
  p5.textSize(48);
  p5.text(`Profile Setting`, p5.width/2, p5.height/8);
  p5.textFont(courier.regular);
  p5.textSize(24);
  p5.text(`Click on the choices to set your profile`, p5.width/2, p5.height/8 +50);
  
  //prompt table
  p5.textAlign(p5.LEFT);
  p5.textFont(courier.bold);
  p5.text(`NAME`, p5.width/5, p5.height*2/5);
  p5.text(`BIRTH GENDER`, p5.width/5, p5.height*2/5 + 75);
  p5.text(`IDENTIFIED GENDER`, p5.width/5, p5.height*2/5 + 150);
  p5.text(`SEXUAL ORIENTATION`, p5.width/5, p5.height*2/5 + 225);
  p5.text(`IDENTIFIED SPECIE`, p5.width/5, p5.height*2/5 + 300);
  p5.textFont(courier.regular);
  p5.textSize(18);
  p5.text(`Recorded Answer: ${btn.birthGender.input}`, p5.width/5, p5.height*2/5 + 100);
  p5.text(`Recorded Answer: ${btn.identifiedGender.input}`, p5.width/5, p5.height*2/5 + 175);
  p5.text(`Recorded Answer: ${btn.sexualOrientation.input}`, p5.width/5, p5.height*2/5 + 250);
  p5.text(`Recorded Answer: ${btn.identifiedSpecies.input}`, p5.width/5, p5.height*2/5 + 325);

  // //Display the buttons for the page
  btn.game.display();
  btn.name.display();
  for (let prop in btn.birthGender) {
    btn.birthGender[prop].display();
  }
  for (let prop in btn.identifiedGender) {
    btn.identifiedGender[prop].display();
  }
  for (let prop in btn.sexualOrientation) {
    btn.sexualOrientation[prop].display();
  }
  for (let prop in btn.identifiedSpecies) {
    btn.identifiedSpecies[prop].display();
  }

  //Animation
  visual.bgX -= 10;
  if (visual.bgX <= -1280) {
    visual.bgX = -1280;
  }
  p5.image(visual.bg2, visual.bgX, visual.bgY);
  p5.pop();

  
}

function assignID() {
  p5.push();
  p5.image(visual.bg1, 0, 0);
  p5.textAlign(p5.CENTER, p5.CENTER);

  //header
  p5.textFont(courier.bold);
  p5.textSize(48);
  p5.text(`Your Assigned ID`, p5.width/2, p5.height/8);
  p5.textFont(courier.regular);
  p5.textSize(24);
  p5.text(`Before entering the paper world, you should obtain a valid ID`, p5.width/2, p5.height/8 +50);

  p5.image(visual.bg3,  p5.width/5 -70, p5.height*2/5 - 75);
  //Prompt Table
  p5.textAlign(p5.LEFT);
  p5.textFont(courier.bold);
  p5.text(`NAME`, p5.width/5, p5.height*2/5);
  p5.text(`BIRTH GENDER`, p5.width/5, p5.height*2/5 + 75);
  p5.text(`IDENTIFIED GENDER`, p5.width*3/5, p5.height*2/5 + 75);
  p5.text(`SEXUAL ORIENTATION`, p5.width/5, p5.height*2/5 + 150);
  p5.text(`IDENTIFIED SPECIE`, p5.width*3/5, p5.height*2/5 + 150);
  //Details
  p5.textFont(courier.regular);
  p5.text(`Paper Man`, p5.width/5 + 100, p5.height*2/5);
  p5.text(`Male`, p5.width/5, p5.height*2/5 + 105);
  p5.text(`Female`, p5.width*3/5, p5.height*2/5 + 105);
  p5.text(`Men`, p5.width/5, p5.height*2/5 + 180);
  p5.text(`Human`, p5.width*3/5, p5.height*2/5 + 180);

  //

  btn.game.display(); //button to switch to game state

  p5.pop();
}

function game() {
  p5.push();
  p5.image(visual.bg1, 0, 0);
  p5.pop();
}

//Prompt question when the user mousepress
p5.mousePressed = function() {
  console.log(btn.name.clicked);
  if (btn.start.clicked) {
    state = `profileSetting`;
  } else if (btn.about.clicked) {
    state = `about`;
  } 

  if (btn.name.clicked) {
    btn.nameInput = ``;
    state = `title`;
  } else if (btn.birthGender[0].clicked) {
    btn.birthGender.input = `Female`;
  } else if (btn.birthGender[1].clicked) {
    btn.birthGender.input = `Male`;
  } else if (btn.identifiedGender[0].clicked) {
    btn.identifiedGender.input = `Female`;
  } else if (btn.identifiedGender[1].clicked) {
    btn.identifiedGender.input = `Male`;
  } else if (btn.identifiedGender[2].clicked) {
    btn.identifiedGender.input = `Non-binary`;
  } else if (btn.sexualOrientation[0].clicked) {
    btn.sexualOrientation.input = `Bi-sexual`;
  } else if (btn.sexualOrientation[1].clicked) {
    btn.sexualOrientation.input = `Female (women)`;
  } else if (btn.sexualOrientation[2].clicked) {
    btn.sexualOrientation.input = `Male (men)`;
  } else if (btn.sexualOrientation[3].clicked) {
    btn.sexualOrientation.input = `Not mentioned`;
  } else if (btn.identifiedSpecies[0].clicked) {
    btn.identifiedSpecies.input = `Human`;
  } else if (btn.identifiedSpecies[1].clicked) {
    btn.identifiedSpecies.input = `Interesting!`;
  } 

  if (btn.game.clicked) {
      if (state === `profileSetting`) {
        state = `assignID`;
      } else if (state === `assignID`) {
        state = `game`;
      } 
  }
}

p5.keyTyped = function() {
  //Add a place for input
  if (btn.name.clicked) {
    btn.nameInput += p5.key;
    if (p5.keyCode === p5.BACKSPACE) {
      // Remove the last character in a string!
      btn.nameInput = btn.nameInput.slice(0, btn.nameInput.length - 1);
    }
  }
  
}

p5.keyPressed = function() {
  if (btn.name.clicked && p5.keyCode === p5.BACKSPACE) {
      // Remove the last character in a string!
      btn.nameInput = btn.nameInput.slice(0, btn.nameInput.length - 1);
  }
}

p5.mouseClicked = function() {

}

});