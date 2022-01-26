"use strict";
//Slamina plus Game version
//Man Zou

//Mouseclick on the named animal
//Press any key to change animal

//begin with the title page
let state = `title`;

let trap = {
  x: 800,
  y: 75,
  size: 150,
  easing: 0.05,
}

let animals = {
  images: [],
  objects: [],
  x: 50,
  y: 100,
  vy: 150,
  vx: 0,
};
const ANIMAL_NUM = 10;
const ANIMAL_PREFIX = `assets/images/animal`;
const ANIMAL_NAMES = [
  "lion",
  "hyena",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
];

//Text appearance
const QUESTION_DELAY = 2000;
// The current answer to display (we use it initially to display the click instruction)
let currentAnswer = `Click to begin.`;
// The current animal name the user is trying to guess
let currentAnimal = ``;

let colour = 200;

function preload() {
  //load the images of the animals in a loop
  for(let i=0; i < ANIMAL_NUM; i++) {
    let animal = loadImage(`${ANIMAL_PREFIX}${i}.png`);
    animals.images.push(animal);
  }
}

// Set up the canvas and the animal objects
function setup() {
  createCanvas(1600, 600);
  
  //Create random animals moving left and right
  for (let i=0; i< ANIMAL_NUM; i++) {
    // otherDogs.y += otherDogs.vy;
    animals.y = random(100, 600);
    animals.x = random(50, 1600);
    animals.vx = random(2,5);
    let animalImg = animals.images[i];
    let animalObject = new Animal(animals.x, animals.y, animals.vx, animalImg);
    animals.objects.push(animalObject);
  } 

  //Speech recognition
  if (annyang) {
    // Create the guessing command
    let commands = {
      'I think it is *animal': guess,
      'hello': function() {
        alert(`Hi there!`);
      },
    };
    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
  }
}

// general game structures
function draw() {
  background(colour);

  if (state === `title`) {
    title();
  }

  if (state === `game`) {
    game();
  }

  if (state === `guess`) {
    guess();
  }

  else if (state === `ending`) {
    ending();
  } 
}

function title() {
  push();
  fill(0);
  textSize(32);
  text(`Press any key to start!`, 150, 300);
  pop();

}

function game() {
  //Setting up an easing for the ellipse
  stroke(0);
  noFill();
  let dx = mouseX - trap.x;
  trap.x += dx * trap.easing;
  let dy = mouseY - trap.y;
  trap.y += dy * trap.easing;
  ellipse(trap.x, trap.y, trap.size);

  //animating the animals
  for (let i=0; i< animals.objects.length; i++) {
    animals.objects[i].display();
    animals.objects[i].move();
    animals.objects[i].wrap();
    animals.objects[i].checkOverlap();
  }

  //
}

// guessing state
function guess() {
  // currentAnswer = animal.toLowerCase();
  displaySpeech();
}

function ending() {
  push();
  fill(0);
  textSize(32);
  text(`You got this!`, 150, 300);
  pop();
}

//Display the text version of the speech input
function displaySpeech() {
  if (currentAnswer === currentAnimal) {
    fill(0, 255, 0);
    text(`Correct Guess!`, width / 2, height*2 / 3);
  }
  else {
    fill(255, 0, 0);
    text(`Wrong Guess!`, width / 2, height*2 / 3);
  }
  text(currentAnswer, width / 2, height / 2);
}

//Clear out current answer
function nextQuestion() {
  currentAnswer = ``;
  currentAnimal = random(ANIMAL_NAMES);
  responsiveVoice.speak(currentAnimal);
}

function mousePressed() {
  animals.objects[0].mousePressed();
  if (animals.objects[0].found) {
    state = `guess`;
  }
  else {
    nextQuestion();
  }
}

function keyPressed() {
  if (state === `title`) {
    state = `game`;
  }
}