"use strict";

let mouthShape = `O`;
let playerName = ``;
let colour = 50;
let qNum = 0;
let sentence;
let content = "";
let tarot;

function preload() {
  tarot = loadJSON("assets/data/zodiac.json"); 
}
function setup() {
  createCanvas(1400, 800);
  // Check if annyang is available
  if (annyang) {
    // Create commands
    let commands = {
      'My name is *name': setName,
      'My skin colour is *skinColour': setColour,
      'My sexe is *sexe': setSexe,
    }
    // Add the commands and start annyang
    annyang.addCommands(commands);
    annyang.start();
  }
}

function draw() {
  background(200);
  robot();
}

function robot() {
  push();
  fill(255-colour,230-colour,190-colour);
  ellipse(width/2, height/2, 400);
  fill(0);
  ellipse(width/2 - 100, height/2, 50);
  ellipse(width/2 + 100, height/2, 50);
  textAlign(CENTER, CENTER);
  textSize(100);
  text(mouthShape, width/2, height/2 + 100);
  text(playerName, width/2, height/2 + 300);
  pop();
  
}

function askQuestion() {
  sentence = `what is your ${content}?`;

  if (qNum === 0) {
    content = "name";
  }
  else if (qNum === 1) {
    content = "skin colour, is it white, beige, brown or black";
  }
  else if (qNum === 2) {
    content = "sexe";
  }

  responsiveVoice.speak(sentence, "UK English Female", {
    onstart: speaking,
    onend: function(){qNum++;}
  });
}

function speaking() {
  if (mouthShape === `o`) { 
    setTimeout(function (){mouthShape = `O`;}, 1000);
  }
  else if (mouthShape === `O`) { 
    setTimeout(function (){mouthShape = `o`;}, 1000);
  }
}

function setName(name) {
  playerName = name;
  qNum +=1;
  console.log(playerName);
}

function setColour(skinColour) {
  if (skinColour === 'white') {
    colour = 0;
  }
  else if (skinColour === 'beige') {
    colour = 20;
  }
  else if (skinColour === 'brown') {
    colour = 50;
  }
  else if (skinColour === 'black') {
    colour = 100;
  }
  qNum+=1;
}

function setSexe(sexe) {
  if (sexe === 'male') {
    colour = 0;
  }
  else if (skinColour === 'female') {
    colour = 20;
  }
}

function mousePressed() {
  askQuestion();
}