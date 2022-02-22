//P5 Library
import "/js/libraries/p5.min.js" ;
import "/js/libraries/p5.collide2d.min.js";
import "/js/libraries/p5.sound.min.js";
//Classes
import AnimationYuji from "./AnimationYuji.js";
import ChoiceBtn from "./ChoiceBtn.js";
import Door from "./Door.js";
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

let q = {
  x: undefined,
  y: undefined,
  colour: 0,
  num: [0,1,2,3,4,5],
  content: [`Are you willing to be a man?`, `Are you willing to marry a man?`, `Are you willing to act like a woman?`, `Are you willing to be owned by a man?`, `Are you willing to...`],
  description: [`To work in the Paper world, you should be a male gender.`, `To work in your dream job you should marry a man.`, `To work in your dream job you should act like a woman.`, `To protect your loved ones you should be owned by a man.`, `To have the role you want you should...`],
  current: 0,
  responses: [],
}

let doors = {
  objects: [],
  edge: 0,
  fill: 255,
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
  doors: [],
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

  // Doors at the game state
  for (let i = 0; i<4; i++) { 
    for (let j = 0; j<3; j++) {
      let x = i*320;
      let y = j*240;
      let colour = 100;
      colours.doors.push(colour);
      q.responses.push(``);
      let doorObject= new Door(x, y, colours.black, colours.doors[i*j], p5);
      doors.objects.push(doorObject);
    } 
  };  

  // Question Position at the game state
  q.x= p5.width/8;
  q.y= p5.height/8;
  
    //Animation 1 for Yuji
    visual.videoYuji = new AnimationYuji(visual.animationYuji, 0, 0, p5);

    //Annyang
    if (window.annyang) {
      // Create commands
      let commands = {
        'Question zero *answer': setAnswer0,
        'Question one *answer': setAnswer1,
        'Question two *answer': setAnswer2,
        'Question three *answer': setAnswer3,
        'Question four *answer': setAnswer4,
        'Question five *answer': setAnswer5,
        'Question six *answer': setAnswer6,
        'Question seven *answer': setAnswer7,
        'Question eight *answer': setAnswer8,
        'Question nine *answer': setAnswer9,
        'Question ten *answer': setAnswer10,
        'Question eleven *answer': setAnswer11,
        'Question twelve *answer': setAnswer12,
      }
      // Add the commands and start annyang
      window.annyang.addCommands(commands);
      window.annyang.start();
    }

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

  for (let prop in doors.objects) {
    if (q.responses[prop] === `yes`) {
      doors.objects[prop].openDoor();
    } else if (q.responses[prop] === `no`) {
      doors.objects[prop].closeDoor();
    }
    doors.objects[prop].display();
  }

  //header
  q.y +=1;
  p5.textFont(courier.bold);
  p5.textSize(48);
  p5.textWrap(p5.WORD);
  q.colour = 128 + 128 * p5.sin(p5.millis() / 1000);
  p5.fill(q.colour);
  p5.text(`Q${q.num[q.current]}: ${q.content[q.current]}`, q.x, q.y, p5.width*7/8);
  p5.textFont(courier.regular);
  p5.textSize(24);
  p5.text(q.description[q.current], q.x, q.y +100);


  p5.pop();

}

function setAnswer0(answer) {
  if (answer) {
    q.responses[0] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
  

}

function setAnswer1(answer) {
  if (answer) {
    q.responses[1] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
}

function setAnswer2(answer) {
  if (answer) {
    q.responses[2] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
}

function setAnswer3(answer) {
  if (answer) {
    q.responses[3] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
}

function setAnswer4(answer) {
  if (answer) {
    q.responses[4] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
}

function setAnswer5(answer) {
  if (answer) {
    q.responses[5] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
}

function setAnswer6(answer) {
  if (answer) {
    q.responses[6] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
}

function setAnswer7(answer) {
  if (answer) {
    q.responses[7] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
}

function setAnswer8(answer) {
  if (answer) {
    q.responses[8] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
}

function setAnswer9(answer) {
  if (answer) {
    q.responses[9] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
}

function setAnswer10(answer) {
  if (answer) {
    q.responses[10] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
}

function setAnswer11(answer) {
  if (answer) {
    q.responses[11] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
}

function setAnswer12(answer) {
  if (answer) {
    q.responses[12] = answer;
    q.current +=1;
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
    q.y = p5.height/8;
  }
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

  if (btn.game.clicked && state === `profileSetting`) {
    state = `assignID`;
  } else if (btn.game.clicked && state === `assignID`) {
    state = `game`;
    } 
  
  if (q.current === 0) {
    window.responsiveVoice.speak(`Question${q.num[q.current]}: ${q.content[q.current]}`);
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