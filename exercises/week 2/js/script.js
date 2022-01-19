"use strict";

let state = `game`;
// The sausage dog
let sausageDog = {
  object: undefined,
  image: undefined,
  x: undefined,
  y: undefined,
  vx: 0,
};
const SAUSAGEDOG_PREFIX = `assets/images/sausage-dog.png`;

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
  sausageDog.image = loadImage(`assets/images/sausage-dog.png`);
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

  sausageDog.x = random(50, 1600);
  sausageDog.y = random(100, 600);
  sausageDog.vx = random(2,5);
  sausageDog.object = new Sausagedog(sausageDog.x, sausageDog.y, sausageDog.vx, sausageDog.image);



  
}

// Display and move the cars
function draw() {
  background(colour);

  if (state === `game`) {
    game();
  }

  else if (state === `ending`) {
    ending();
  }


  
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
  }

  sausageDog.object.display();
  sausageDog.object.move();
  sausageDog.object.wrap();
  sausageDog.object.checkOverlap();
}

function ending() {
  push();
  sausageDog.object.displayRotation();
  sausageDog.object.react();
  pop();

  fill(0);
  textSize(32);
  text(`You got this!`, 150, 300);
}

function mousePressed() {
  sausageDog.object.mousePressed();
  if (sausageDog.object.found) {
    state = `ending`;
  }
  else {
    colour -= 50;
  }
}