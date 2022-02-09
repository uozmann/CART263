"use strict";

//Player attributes
let mouthShape = `O`;
let playerName = ``;
let colour = 50;
let transparency = 0;

//Questions and answers
let qNum = 0;
let sentence;
let content = "";
let adj = ``;
let noun = ``;

//Json
let zodiac;
let playerWZodiac = ``;
let playerEZodiac = ``;


function preload() {
  //load the zodiac data
  zodiac = loadJSON("assets/data/zodiac.json"); 
}
function setup() {
  createCanvas(1400, 800);
  // Check if annyang is available
  if (annyang) {
    // Create commands
    let commands = {
      'My name is *name': setName,
      'My skin colour is *skinColour': setColour,
      'My western zodiac is *wZodiac': setWZodiac,
      'My eastern zodiac is *eZodiac': setEZodiac,
    }
    // Add the commands and start annyang
    annyang.addCommands(commands);
    annyang.start();
  }
}

function draw() {
  background(200);
  robot(); //draw the player's face
  conversationText(); //add the texts
  console.log(qNum);
}

//create the face of the player
function robot() {
  push();
  fill(255-colour,230-colour,190-colour, transparency); //varying depending on the player's answer
  ellipse(width/4, height/2, 400); //head
  fill(0);
  ellipse(width/4 - 100, height/2, 50); //eye
  ellipse(width/4 + 100, height/2, 50);
  textAlign(CENTER, CENTER);
  textSize(100);
  text(mouthShape, width/4, height/2 + 100); //mouth
  text(playerName, width/4, height/2 + 300); //text displaying the player's name
  pop();
}

function conversationText() {
  //instruction texts
  push();
  fill(0);
  textSize(32);
  text("Your Secret Profile (mousepress to play)", width/2, height/4);
  textSize(18);
  text(`Answer the "what is your" with complete sentence. `, width/2, height/3);
  text(`Ex. My name is XXX.`, width/2, height/3 + 25);
  text(`You may proceed to the next question only if you answered the previous one.`, width/2, height/3 + 50);
  text(`Note that the machine is very very dumb. You may need to repeat yourself.`, width/2, height/3 + 75);
  pop();

  //display the player's secret profile based on the given answers
  if (qNum === 5) {
  push();
  textSize(18);
  text(`You are a very ` + playerWZodiac.keywords + ` ` + adj + ` ` + noun, width/2, height/3 + 175);
  text(`You now live in ` + playerEZodiac.element + ` because you are born in ` + playerWZodiac.ruling_body_modern, width/2, height/3 + 200);
  text(`You are the ` + playerWZodiac.gloss + ` of the ` + playerEZodiac.direction, width/2, height/3 + 225);
  text(`Your mysterious surname is ` + playerEZodiac.unicode_symbol + `儿`, width/2, height/3 + 250);
  text(`You are very likely to adopt an elf on the ` + playerEZodiac.trine + ` of the coming ` + playerEZodiac.season, width/2, height/3 + 275);
  pop();
  } 
}

function askQuestion() {
  // Ask different questions depending on the question number
  if (qNum === 0) {
    content = "name";
    // qNum = 1;
  }
  else if (qNum === 1) {
    content = "skin colour, is it white, beige, brown or black";
    // qNum = 2;
  }
  else if (qNum === 2) {
    content = "western zodiac";
    // qNum = 3;
  }
  else if (qNum === 3) {
    content = "eastern zodiac";
    // qNum = 4;
  }
  else if (qNum === 4) {
    content = "profile, now let's see";
    qNum =5;
  }

  //Sentence the computer will say
  sentence = `what is your ${content}?`;
  responsiveVoice.speak(sentence, "UK English Female", {
    onstart: speaking, //add mouth animation
    onend: notSpeaking //stop mouth animation
  });
}

//mouth animation
function speaking() {
  if (mouthShape === `o`) { 
    setTimeout(function (){mouthShape = `O`;}, 1000);
  }
  else if (mouthShape === `O`) { 
    setTimeout(function (){mouthShape = `o`;}, 1000);
  }
}

//freeze mouth animation
function notSpeaking() {
  mouthShape = `O`;
}

//annyang detecting answer to question
function setName(name) {
  playerName = name;
  qNum =1;
  console.log(playerName);
}

//annyang detecting answer to question
function setColour(skinColour) {
  qNum =2;
  //set skin colour as an adjective for a sentence
  adj = skinColour;

  //colour the player's face
  transparency = 255;
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
}

//annyang detecting answer to question
function setWZodiac(wZodiac) {
  qNum =3;
  //detecting player's western zodiac sign
  playerWZodiac = zodiac.western_zodiac[wZodiac];
  console.log(wZodiac);
}

//annyang detecting answer to question
function setEZodiac(eZodiac) {
  qNum =4;
  console.log(eZodiac);
  noun = eZodiac; // set the zodiac as a noun for a sentence

  //determining the player's eastern zodiac sign
  if (eZodiac === 'rat' || eZodiac === 'mouse') {
    playerEZodiac = zodiac.eastern_zodiac.rat;
  }
  else if (eZodiac === 'ox' || eZodiac === 'bull' || eZodiac === 'cow') {
    playerEZodiac = zodiac.eastern_zodiac.ox;
  }
  else if (eZodiac === 'goat' || eZodiac === 'sheep') {
    playerEZodiac = zodiac.eastern_zodiac.goat;
  }
  else if (eZodiac === 'rooster' || eZodiac === 'chicken' || eZodiac === 'cock' || eZodiac === 'hen') {
    playerEZodiac = zodiac.eastern_zodiac.rooster;
  }
  else {
    playerEZodiac = zodiac.eastern_zodiac[eZodiac];
  }
}

//Prompt question when the user mouse press
function mousePressed() {
  askQuestion();
}
