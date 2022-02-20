"use strict";

//Initial State
let state = `title`;

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

  radius: 10,

}

//Images
let visual = {
  bg0: undefined,
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

  //Locations Settings
  btn.start.x = width*5/7 +70; //btn start x
  btn.start.y = height*5/8; //btn start y
  btn.about.x = btn.start.x; //btn about x
  btn.about.y = height*5/8 + 100; //btn about y

    //Animation 1 for Yuji
    visual.videoYuji = new AnimationYuji(visual.animationYuji, 0, 0);
}

function draw() {
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
  }
  
}

function title() {
  background(1);
  push();
  image(visual.bg0, 0, 0);
  textAlign(CENTER, CENTER);
  textFont(courier.bold);
  textSize(48);
  text(`PaperMan`, btn.start.x + btn.start.sizeX/2, height/3);
  pop();

  visual.videoYuji.display();
  visual.videoYuji.animate();

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
  if (btn.start.clicked === true) {
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
  if (btn.about.clicked === true) {
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

function about() {
  background(100);
}

function profileSetting() {
  background(255);
}

//Prompt question when the user mouse press
function mousePressed() {
  if (btn.start.clicked === true) {
    state = `profileSetting`;
  } else if (btn.about.clicked === true) {
    state = `about`;
  }
}

function mouseClicked() {

}
