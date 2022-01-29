"use strict";
//Slamina plus Game version
//Man Zou

//Mouseclick on the named animal
//Press any key to change animal

//begin with the title page
let state = `title`;

//A circle to choose the animal
let trap = {
  x: 800,
  y: 75,
  size: 150,
  easing: 0.05,
}

//Arrays of animals moving horizontally
let animals = {
  images: [],
  objects: [],
  name: ``,
  x: 50,
  y: 100,
  vy: 150,
  vx: 0,
};
const ANIMAL_NUM = 10; //Total amount of animal
const ANIMAL_PREFIX = `assets/images/animal`; //Path to load the animal images
const ANIMAL_NAMES = [ //Strings associated to each animal image in order
  "wolf",
  "cat",
  "lion",
  "dog",
  "lynx",
  "leopard",
  "hyena",
  "bear",
  "polar bear",
  "panda",
];

// The current answer 
let currentAnswer = ``;
// The current animal name the user is trying to guess
let currentAnimal = ``;

// For background
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
      animals.y = random(100, 600);
      animals.x = random(50, 1600);
      animals.vx = random(2,5);
      animals.name = ANIMAL_NAMES[i]; // Associate the animal name with its object
      let animalImg = animals.images[i]; // Associate the animal image with its object
      let animalObject = new Animal(animals.x, animals.y, animals.vx, animalImg, animals.name);
      animals.objects.push(animalObject);
  } 

  //Speech recognition
  if (annyang) {
    // Create the guessing command
    let commands = {
      'Yes': function() {
        state = 'game';
      },
      'hello': function() {
        alert(`Hi there!`);
      }, //To test if annyang works
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

//Welcome page
function title() {
  push();
  fill(0);
  textSize(32);
  text(`Press any key to start!`, 150, 300);
  pop();
}

//Game page
function game() {
  stroke(0);
  noFill();
  //Setting up an easing for the ellipse
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
    animals.objects[i].mousePressed()
  }
}

// guessing state
function guess() {
  push();
  fill(0);
  textSize(32);
  text(`Would you like to have another chance? (Respond yes if you do)`, 150, 300);
  pop();
  displaySpeech();
}

// triggered when the guess is successful
function ending() {
  push();
  fill(0);
  textSize(32);
  text(`You got this!`, 150, 300);
  pop();
}

//Display the text version of the speech input
function displaySpeech(animal) {
  currentAnswer = animal;
  push();
    fill(255, 0, 0);
    text(`Wrong Guess!`, 150, 200);
  pop();
}

//Clear out current answer and say another animal's name
function nextQuestion() {
  currentAnswer = ``;
  currentAnimal = random(ANIMAL_NAMES);
  responsiveVoice.speak(currentAnimal);
}

//Mouse Pressed Commands
function mousePressed() {
  // check if correct animal is pressed
  console.log(currentAnimal);
  for (let i=0; i< animals.objects.length; i++) {
    animals.objects[i].mousePressed();
    // >>>>>>>>This is my original script, where things get buggy
    // >>>>>>>>What happen on the console.log(animals.objects[i].name) is that there is always 3-7 names named one afteranother, which renders the currentAnimal's value faulty
    // if (animals.objects[i].found && animals.objects[i].name === currentAnimal) {
    //   state = `ending`;
      
    // }
    // else if (animals.objects[i].found && animals.objects[i].name !== currentAnimal){
    //   state = `guess`;
    //   console.log(animals.objects[i].name);
    // }

    // So I have to do it one by one to check if the right animal is selected
    if (animals.objects[0].found && animals.objects[0].name === currentAnimal) {
      state = `ending`;
    }
    else if (animals.objects[1].found && animals.objects[1].name === currentAnimal) {
      state = `ending`;
    }
    else if (animals.objects[2].found && animals.objects[2].name === currentAnimal) {
      state = `ending`;
    }
    else if (animals.objects[3].found && animals.objects[3].name === currentAnimal) {
      state = `ending`;
    }
    else if (animals.objects[4].found && animals.objects[4].name === currentAnimal) {
      state = `ending`;
    }
    else if (animals.objects[5].found && animals.objects[5].name === currentAnimal) {
      state = `ending`;
    }
    else if (animals.objects[6].found && animals.objects[6].name === currentAnimal) {
      state = `ending`;
    }
    else if (animals.objects[7].found && animals.objects[7].name === currentAnimal) {
      state = `ending`;
    }
    else if (animals.objects[8].found && animals.objects[8].name === currentAnimal) {
      state = `ending`;
    }
    else if (animals.objects[9].found && animals.objects[9].name === currentAnimal) {
      state = `ending`;
    }
    else if (animals.objects[i].found && animals.objects[i].name !== currentAnimal){
      console.log(animals.objects[i].name);
        state = `guess`;
        console.log(animals.objects[i].name);
      }
  }
  
}

function keyPressed() {
  if (state === `title`) {
    state = `game`;
  }

  if (state === `game`) {
    nextQuestion();
  }
}