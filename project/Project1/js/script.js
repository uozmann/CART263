"use strict";

//Initial State
let state = `title`;

//Distances
let d = {
  startButton: undefined,
  aboutButton: undefined,
}

//Buttons
let btn = {
  start: {
    x: undefined, //specified under title()
    y: undefined,
    sizeX: 100,
    sizeY: 100,
    fill: undefined,
  },
  about: {
    x: undefined,
    y: undefined,
    fill: undefined,
  },
}

let colours = {
  yellow: [255,255,75],
  yellowPale: [255,255,150],
}

function preload() {
  
}

function setup() {
  createCanvas(1280, 720);
 
}

function draw() {
  background(1);

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

  //Call functionalities of buttons
  buttons();
}

function buttons() {
  //Setting up the buttons
  // push();
  noStroke();
  rectMode(CENTER, CENTER);
  btn.start.x = width*3/4;
  btn.start.y = height/2;
  btn.about.x = width*3/4;
  btn.about.y = height*2/3;
  btn.start.fill = colours.yellow;
  fill(btn.start.fill);
  rect(btn.start.x, btn.start.y, btn.start.sizeX, btn.start.sizeY);
  btn.about.fill = colours.yellow;
  fill(colours.yellow);
  rect(btn.about.x, btn.about.y, btn.start.sizeX, btn.start.sizeY);
  console.log(btn.start.fill);
 

  //Start Button distance check
  d.startButton = dist(mouseX, mouseY, btn.start.x, btn.start.y);
  if (d.startButton <= btn.start.sizeX/2 && mouseIsPressed){ //** */
    state = `profileSetting`;
  }
  else if (d.startButton <= btn.start.sizeX/2) {
    btn.start.fill = colours.yellowPale;
    btn.start.sizeY = 200;
  }

  //About Button distance check
  d.aboutButton = dist(mouseX, mouseY, btn.about.x, btn.about.y);
  if (d.aboutButton <= btn.start.sizeX/2 && mouseIsPressed){ //** */
    state = `about`;
  }
  else if(d.aboutButton <= btn.start.sizeX/2) {
    btn.about.fill = colours.yellowPale;
    state = `about`;
  }

  // pop();

}

function about() {
  background(100);
}

function profileSetting() {
  background(255);
}

//Prompt question when the user mouse press
function mousePressed() {
  
}

function mouseClicked() {

}
