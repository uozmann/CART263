"use strict";

//Initial State
let state = `title`;
// let state = `profileSetting`;

//Distances
let courier = {
  regular: undefined,
  bold: undefined,
  italic: undefined
}

//Buttons
let btn = {
  start: {
    x: undefined, //positions specified under setting()
    y: undefined,
    sizeX: 200,
    sizeY: 50,
    fill: undefined,
    clicked: false
  },
  about: {
    x: undefined,
    y: undefined,
    sizeX: 200,
    sizeY: 50,
    fill: undefined,
    clicked: false
  },
  name: {
    x: undefined,
    y: undefined,
    sizeX: 400,
    sizeY: 50,
    input: `Type Here`,
    clicked: false
  },
  birthGender: {
    x: [],
    y: undefined,
    sizeX: 200,
    sizeY: 50,
    input: ``,
    clicked0: false,
    clicked1: false
  },
  identifiedGender: {
    x:[],
    y: undefined,
    sizeX: 150,
    sizeY: 50,
    input: ``,
    clicked0: false,
    clicked1: false,
    clicked2: false
  },
  sexualOrientation: {
    x: [],
    y: undefined,
    sizeX: 100,
    sizeY: 50,
    input: ``,
    clicked0: false,
    clicked1: false,
    clicked2: false,
    clicked3: false,
  },
  identifiedSpecies: {
    x: [],
    y: undefined,
    sizeX: 200,
    sizeY: 50,
    input: ``,
    clicked0: false,
    clicked1: false
  },
  game: {
    x: undefined,
    y: undefined,
    size: 100,
    clicked: false
  },

  radius: 10,

}

//Images
let visual = {
  bg0: undefined,
  bg1: undefined,
  bg2: undefined,
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


function preload() {
  courier.regular = loadFont(`assets/fonts/Courier/CourierPrime-Regular.ttf`);
  courier.bold = loadFont(`assets/fonts/Courier/CourierPrime-Bold.ttf`);
  courier.italic = loadFont(`assets/fonts/Courier/CourierPrime-Italic.ttf`);
  visual.bg0 = loadImage(`assets/images/bg0.jpg`);
  visual.bg1 = loadImage(`assets/images/bg1.jpg`);
  visual.bg2 = loadImage(`assets/images/bg2.png`);
  for (let i = 0; i < 120; i++) { //images frame for the animation
    let loadedImage;
    if (i< 10) {
      loadedImage = loadImage(`assets/images/comp1/yujiAnim_0000${i}.png`);
    }
    else if (i>= 10 && i< 100) {
      loadedImage = loadImage(`assets/images/comp1/yujiAnim_000${i}.png`);
    }
    else {
      loadedImage = loadImage(`assets/images/comp1/yujiAnim_00${i}.png`);
    }
    visual.animationYuji.push(loadedImage);
  }
  
}

function setup() {
  createCanvas(1280, 720);

  //Locations Settings of buttons
  btn.start.x = width*5/7 +70; //btn start x
  btn.start.y = height*5/8; //btn start y
  btn.about.x = btn.start.x; //btn about x
  btn.about.y = height*5/8 + 100; //btn about y
  btn.game.x = width*7/8;
  btn.game.y = height/8 +50;
  btn.name.x = width/2;
  btn.name.y = height*2/5 - 20;
  for (let i = 0; i<2; i++) { //two buttons planned only
    let x = width/2 + i*(btn.birthGender.sizeX + 25);
    btn.birthGender.x.push(x);
    btn.birthGender.y = height*2/5 + 55;
  }
  for (let i = 0; i<3; i++) { //three buttons planned 
    let x = width/2 + i*(btn.identifiedGender.sizeX + 25);
    btn.identifiedGender.x.push(x);
    btn.identifiedGender.y = height*2/5 + 130;
  }
  for (let i = 0; i<4; i++) { //four buttons planned 
    let x = width/2 + i*(btn.sexualOrientation.sizeX + 25);
    btn.sexualOrientation.x.push(x);
    btn.sexualOrientation.y = height*2/5 + 205;
  }
  for (let i = 0; i<2; i++) { //two buttons planned 
    let x = width/2 + i*(btn.identifiedSpecies.sizeX + 25);
    btn.identifiedSpecies.x.push(x);
    btn.identifiedSpecies.y = height*2/5 + 280;
  }
  
    //Animation 1 for Yuji
    visual.videoYuji = new AnimationYuji(visual.animationYuji, 0, 0);
}

function draw() {
  background(0);
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

    case `game`:
      game();
      break;
  }
  
}

function title() {
  // Tittle texts and animations
  push();
  image(visual.bg0, 0, 0);
  textAlign(CENTER, CENTER);
  textFont(courier.bold);
  textSize(48);
  text(`PaperMan`, btn.start.x + btn.start.sizeX/2, height/3);
  pop();

  visual.videoYuji.display();//display the animation frame

  //Call functionalities of buttons
  buttons();
}

function buttons() {
  //Setting up the buttons
  push();
  //start button
  //Collision checking
  btn.start.clicked = collidePointRect(mouseX, mouseY, btn.start.x, btn.start.y, btn.start.sizeX, btn.start.sizeY);
  //Btn on click
  if (btn.start.clicked) {
    noFill();
  } else {
    stroke(colours.black);
  }
  rect(btn.start.x, btn.start.y, btn.start.sizeX, btn.start.sizeY, btn.radius);
  pop();


  //about button
  push();
  //collision checking
  btn.about.clicked = collidePointRect(mouseX, mouseY, btn.about.x, btn.about.y, btn.about.sizeX, btn.about.sizeY);
  //btn on click
  if (btn.about.clicked) {
    noFill();
  } else {
    stroke(colours.black);
  }
  rect(btn.about.x, btn.about.y, btn.start.sizeX, btn.start.sizeY, btn.radius);
  pop();

  //btn text content
  push();
  textAlign(CENTER, CENTER);
  textFont(courier.regular);
  textSize(32);
  text(`START`, btn.start.x + btn.start.sizeX/2, btn.start.y + btn.start.sizeY/2);
  text(`ABOUT`, btn.about.x + btn.about.sizeX/2, btn.about.y + btn.about.sizeY/2);
  pop();

}

//State
function about() {
  background(100);
}

//Buttons
function buttons1() {
  
  //Setting up the buttons
  push();
  //Collision checking
  btn.game.clicked = collidePointRect(mouseX, mouseY, btn.game.x, btn.game.y, btn.game.size, btn.game.size);
  //Btn on click
  if (btn.game.clicked) {
    noFill();
  } else {
    stroke(colours.black);
  }
  ellipse(btn.game.x, btn.game.y, btn.game.size);
  pop();

  push();
  //Collision checking
  btn.name.clicked = collidePointRect(mouseX, mouseY, btn.name.x, btn.name.y, btn.name.sizeX, btn.name.sizeY);
  console.log(`btn clicked: ${btn.name.clicked}`);
  //Btn on click
  if (btn.name.clicked) {
    noFill();
  } else {
    stroke(colours.black);
  }
  rect(btn.name.x, btn.name.y, btn.name.sizeX, btn.name.sizeY, btn.radius);
  pop();

  //BIRTH GENDER BUTTON
  push();
  //Collision checking
  btn.birthGender.clicked0 = collidePointRect(mouseX, mouseY, btn.birthGender.x[0], btn.birthGender.y, btn.birthGender.sizeX, btn.birthGender.sizeY);
  btn.birthGender.clicked1 = collidePointRect(mouseX, mouseY, btn.birthGender.x[1], btn.birthGender.y, btn.birthGender.sizeX, btn.birthGender.sizeY);
  //Female and Male button choices
  for (let i = 0; i<2; i++) {
    rect(btn.birthGender.x[i], btn.birthGender.y, btn.birthGender.sizeX, btn.birthGender.sizeY, btn.radius);
  }
  pop();

  //IDENTIFIED GENDER BUTTON
  push();
  //Collision checking
  btn.identifiedGender.clicked0 = collidePointRect(mouseX, mouseY, btn.identifiedGender.x[0], btn.identifiedGender.y, btn.identifiedGender.sizeX, btn.identifiedGender.sizeY);
  btn.identifiedGender.clicked1 = collidePointRect(mouseX, mouseY, btn.identifiedGender.x[1], btn.identifiedGender.y, btn.identifiedGender.sizeX, btn.identifiedGender.sizeY);
  btn.identifiedGender.clicked2 = collidePointRect(mouseX, mouseY, btn.identifiedGender.x[2], btn.identifiedGender.y, btn.identifiedGender.sizeX, btn.identifiedGender.sizeY);
  //Female and Male button choices
  for (let i = 0; i<3; i++) {
    rect(btn.identifiedGender.x[i], btn.identifiedGender.y, btn.identifiedGender.sizeX, btn.identifiedGender.sizeY, btn.radius);
  }
  pop();

  //SEXUAL ORIENTATION BUTTON
  push();
  //Collision checking
  btn.sexualOrientation.clicked0 = collidePointRect(mouseX, mouseY, btn.sexualOrientation.x[0], btn.sexualOrientation.y, btn.sexualOrientation.sizeX, btn.sexualOrientation.sizeY);
  btn.sexualOrientation.clicked1 = collidePointRect(mouseX, mouseY, btn.sexualOrientation.x[1], btn.sexualOrientation.y, btn.sexualOrientation.sizeX, btn.sexualOrientation.sizeY);
  btn.sexualOrientation.clicked2 = collidePointRect(mouseX, mouseY, btn.sexualOrientation.x[2], btn.sexualOrientation.y, btn.sexualOrientation.sizeX, btn.sexualOrientation.sizeY);
  btn.sexualOrientation.clicked3 = collidePointRect(mouseX, mouseY, btn.sexualOrientation.x[3], btn.sexualOrientation.y, btn.sexualOrientation.sizeX, btn.sexualOrientation.sizeY);
  //Female and Male button choices
  for (let i = 0; i<4; i++) {
    rect(btn.sexualOrientation.x[i], btn.sexualOrientation.y, btn.sexualOrientation.sizeX, btn.sexualOrientation.sizeY, btn.radius);
  }
  pop();

  //IDENTIFIED SPECIE BUTTON
  push();
  //Collision checking
  btn.identifiedSpecies.clicked0 = collidePointRect(mouseX, mouseY, btn.identifiedSpecies.x[0], btn.identifiedSpecies.y, btn.identifiedSpecies.sizeX, btn.identifiedSpecies.sizeY);
  btn.identifiedSpecies.clicked1 = collidePointRect(mouseX, mouseY, btn.identifiedSpecies.x[1], btn.identifiedSpecies.y, btn.identifiedSpecies.sizeX, btn.identifiedSpecies.sizeY);
  //Female and Male button choices
  for (let i = 0; i<2; i++) {
    rect(btn.identifiedSpecies.x[i], btn.identifiedSpecies.y, btn.identifiedSpecies.sizeX, btn.identifiedSpecies.sizeY, btn.radius);
  }
  pop();

  push();
  textAlign(CENTER, CENTER);
  textFont(courier.regular);
  textSize(24);
  text(`Next`, btn.game.x, btn.game.y);
  text(btn.name.input, btn.name.x + btn.name.sizeX/2, btn.name.y + btn.name.sizeY/2);
  text(`Female`, btn.birthGender.x[0] + btn.birthGender.sizeX/2, btn.birthGender.y + btn.birthGender.sizeY/2);
  text(`Male`, btn.birthGender.x[1] + btn.birthGender.sizeX/2, btn.birthGender.y + btn.birthGender.sizeY/2);
  text(`F.`, btn.identifiedGender.x[0] + btn.identifiedGender.sizeX/2, btn.identifiedGender.y + btn.identifiedGender.sizeY/2);
  text(`M.`, btn.identifiedGender.x[1] + btn.identifiedGender.sizeX/2, btn.identifiedGender.y + btn.identifiedGender.sizeY/2);
  text(`Else`, btn.identifiedGender.x[2] + btn.identifiedGender.sizeX/2, btn.identifiedGender.y + btn.identifiedGender.sizeY/2);
  text(`Bi`, btn.sexualOrientation.x[0] + btn.sexualOrientation.sizeX/2, btn.sexualOrientation.y + btn.sexualOrientation.sizeY/2);
  text(`F.`, btn.sexualOrientation.x[1] + btn.sexualOrientation.sizeX/2, btn.sexualOrientation.y + btn.sexualOrientation.sizeY/2);
  text(`M.`, btn.sexualOrientation.x[2] + btn.sexualOrientation.sizeX/2, btn.sexualOrientation.y + btn.sexualOrientation.sizeY/2);
  text(`None`, btn.sexualOrientation.x[3] + btn.sexualOrientation.sizeX/2, btn.sexualOrientation.y + btn.sexualOrientation.sizeY/2);
  text(`Human`, btn.identifiedSpecies.x[0] + btn.identifiedSpecies.sizeX/2, btn.identifiedSpecies.y + btn.identifiedSpecies.sizeY/2);
  text(`Else`, btn.identifiedSpecies.x[1] + btn.identifiedSpecies.sizeX/2, btn.identifiedSpecies.y + btn.identifiedSpecies.sizeY/2);
  pop();

}

//State
function profileSetting() {
  push();
  image(visual.bg1, 0, 0);
  textAlign(CENTER, CENTER);
  //header
  textFont(courier.bold);
  textSize(48);
  text(`Profile Setting`, width/2, height/8);
  textFont(courier.regular);
  textSize(24);
  text(`Click on the choices to set your profile`, width/2, height/8 +50);
  
  //table
  textAlign(LEFT);
  textFont(courier.bold);
  text(`NAME`, width/5, height*2/5);
  text(`BIRTH GENDER`, width/5, height*2/5 + 75);
  text(`IDENTIFIED GENDER`, width/5, height*2/5 + 150);
  text(`SEXUAL ORIENTATION`, width/5, height*2/5 + 225);
  text(`IDENTIFIED SPECIE`, width/5, height*2/5 + 300);
  textFont(courier.regular);
  textSize(18);
  text(`Recorded Answer: ${btn.birthGender.input}`, width/5, height*2/5 + 100);
  text(`Recorded Answer: ${btn.identifiedGender.input}`, width/5, height*2/5 + 175);
  text(`Recorded Answer: ${btn.sexualOrientation.input}`, width/5, height*2/5 + 250);
  text(`Recorded Answer: ${btn.identifiedSpecies.input}`, width/5, height*2/5 + 325);

  //Display the buttons for the page
  buttons1();

  //Animation
  visual.bgX -= 10;
  if (visual.bgX <= -1280) {
    visual.bgX = -1280;
  }
  image(visual.bg2, visual.bgX, visual.bgY);
  pop();

  
}

function game() {
  push();
  image(visual.bg1, 0, 0);
  pop();
}

//Prompt question when the user mousepress
function mousePressed() {
  if (btn.start.clicked) {
    state = `profileSetting`;
  } else if (btn.about.clicked) {
    state = `about`;
  } 
  if (btn.name.clicked) {
    btn.name.input = ``;
  } else if (btn.birthGender.clicked0) {
    btn.birthGender.input = `Female`;
  } else if (btn.birthGender.clicked1) {
    btn.birthGender.input = `Male`;
  } else if (btn.identifiedGender.clicked0) {
    btn.identifiedGender.input = `Female`;
  } else if (btn.identifiedGender.clicked1) {
    btn.identifiedGender.input = `Male`;
  } else if (btn.identifiedGender.clicked2) {
    btn.identifiedGender.input = `Non-binary`;
  } else if (btn.sexualOrientation.clicked0) {
    btn.sexualOrientation.input = `Bi-sexual`;
  } else if (btn.sexualOrientation.clicked1) {
    btn.sexualOrientation.input = `Female (women)`;
  } else if (btn.sexualOrientation.clicked2) {
    btn.sexualOrientation.input = `Male (men)`;
  } else if (btn.sexualOrientation.clicked3) {
    btn.sexualOrientation.input = `Not mentioned`;
  } else if (btn.identifiedSpecies.clicked0) {
    btn.identifiedSpecies.input = `Human`;
  } else if (btn.identifiedSpecies.clicked1) {
    btn.identifiedSpecies.input = `Interesting!`;
  } else if (btn.game.clicked) {
    state = `game`;
  }
}

function keyTyped() {
  //Add a place for input
  if (btn.name.clicked) {
    btn.name.input += key;
    if (keyCode === BACKSPACE) {
      // Remove the last character in a string!
      btn.name.input = btn.name.input.slice(0, btn.name.input.length - 1);
    }
  }
  
}

function keyPressed() {
  if (btn.name.clicked && keyCode === BACKSPACE) {
      // Remove the last character in a string!
      btn.name.input = btn.name.input.slice(0, btn.name.input.length - 1);
  }
}

function mouseClicked() {

}
