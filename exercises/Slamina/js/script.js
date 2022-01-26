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

let otherDogs = {
  images: [],
  objects: [],
  x: 50,
  y: 100,
  vy: 150,
  vx: 0,
};
const OTHER_DOGS_NUM = 10;
const OTHER_DOGS_PREFIX = `assets/images/animal`;

let colour = 200;

function preload() {
  for(let i=0; i < OTHER_DOGS_NUM; i++) {
    let otherDog = loadImage(`${OTHER_DOGS_PREFIX}${i}.png`);
    otherDogs.images.push(otherDog);
  }
}

// Set up the canvas and the animal objects
function setup() {
  createCanvas(1600, 600);
  
  //Create random dogs moving left and right
  for (let i=0; i< OTHER_DOGS_NUM; i++) {
    // otherDogs.y += otherDogs.vy;
    otherDogs.y = random(100, 600);
    otherDogs.x = random(50, 1600);
    otherDogs.vx = random(2,5);
    let otherDogImg = random(otherDogs.images);
    let otherDogObject = new Animal(otherDogs.x, otherDogs.y, otherDogs.vx, otherDogImg);
    otherDogs.objects.push(otherDogObject);
  } 
}

// Display and move the cars
function draw() {
  background(colour);

  if (state === `title`) {
    title();
  }

  if (state === `game`) {
    game();
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
  stroke(0);
  noFill();
  let dx = mouseX - trap.x;
  trap.x += dx * trap.easing;
  let dy = mouseY - trap.y;
  trap.y += dy * trap.easing;
  ellipse(trap.x, trap.y, trap.size);

  for (let i=0; i< otherDogs.objects.length; i++) {
    otherDogs.objects[i].display();
    otherDogs.objects[i].move();
    otherDogs.objects[i].wrap();
    otherDogs.objects[i].checkOverlap();
  }
}

function ending() {
  push();
  fill(0);
  textSize(32);
  text(`You got this!`, 150, 300);
  pop();
}

function mousePressed() {
  otherDogs.objects[0].mousePressed();
  if (otherDogs.objects[0].found) {
    state = `ending`;
  }
  else {
    colour -= 50;
  }
}