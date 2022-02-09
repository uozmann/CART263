/**

Bubble Popping Game
Man Zou

Use your index finger to touch the bubbles and pop them.
Each popped bubble corresponds to 1 point.

*/

"use strict";

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `Handpose`;
// Handpose object (using the name of the model for clarity)
let handpose;
// The current set of predictions made by Handpose once it's running
let predictions = [];
// The current index position
let index;
let indexX;
let indexY;
// Falling Bubbles
let bubble = {
  group:[], //array containing the bubbles
  x: 0, //starting position
  y: 0, //starting position
  size: undefined, //size of bubble
  current: 0, //counting the current bubble falling
  bottom: false, //see if bubble reached the bottom
  overlap: false, //check if bubble is touching with the finger
  found: false, //bubble not yet popped
  foundNum: 0, //score
}
let bubbleNum = 10; //total number of bubbles

//for colours
let full = 255;
let none = 0;

/**
Starts the webcam and the Handpose
*/
function setup() {
  createCanvas(640, 480);
  loading();

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // Start the Handpose model and switch to our running state when it loads
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    // Switch to the running state
    state = `running`;
  });

  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
  handpose.on(`predict`, function(results) {
    predictions = results;
  });

  // Set an initial random x position for the bubbles
  for (let i=0; i < bubbleNum; i++) {
    noStroke();
    fill(none, none, full);
    let bubbleX = random(0, width);
    let bubbleSize = random(25,100);
    let individualBubble = new Bubble(bubbleX, bubble.y, bubbleSize); //add the class into the script
    bubble.group.push(individualBubble);
  } 
}

/**
Handles the two states of the program: loading, running
*/
function draw() {
  if (state === `loading`) {
    loading();
  }
  else if (state === `running`) {
    running();
  }
  else if (state === `ending`) {
    ending();
  }
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
  background(255);

  //text saying loading
  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

/**
Displays the webcam.
If there is a hand it outlines it and highlights the tip of the index finger
*/
function running() {
  // Display the webcam with reveresd image so it's a mirror
  let flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0, width, height);

  // Check if there currently predictions to display
  if (predictions.length > 0) {
    // Technically there will only be ONE because it only detects ONE hand
    // Get the hand predicted
    let hand = predictions[0];
    // Highlight it on the canvas
    highlightHand(hand);
  }
  // display the bubbles
  bubbleDisplay();
}

/**
Provided with a detected hand it highlights the tip of the index finger
*/
function highlightHand(hand) {
  // Display a circle and a tiny line at the tip of the index finger
  index = hand.annotations.indexFinger[3];
  indexX = index[0];
  indexY = index[1];
  push();
  fill(255, 255, 0);
  noStroke();
  ellipse(indexX, indexY, 50);
  stroke(0, 0, 255);
  line(indexX, indexY, indexX, indexY-25);
  pop();
}

//Animating the bubbles and displaying them
function bubbleDisplay() {
  if (bubble.group.length >0) { //if there are still bubbles 
    for (let i=0; i < bubble.group.length; i++) {
      bubble.group[i].display(); //display the ellipse
      bubble.group[bubble.current].move(); //move the ellipse
      bubble.group[bubble.current].checkOverlap(); //check if the bubble has been touched
      bubble.group[i].clear(); //clear the bubble when it reaches the bottom
      //delete the cleared bubble from the array
      if (bubble.bottom === true || bubble.found === true) {
        bubble.group.shift();
        bubble.bottom = false;
        bubble.found = false;
      }
    } 
  } else if (bubble.group.length === 0) { //if there is no more bubble go to ending
    state = `ending`;
  }
  console.log(`Array length ` + bubble.group.length);
}

//State when all bubbles are gone
function ending() {
  push();
  //add a white rectangle
  fill(full);
  rect(0, 0, width, height);
  //add title text
  fill(none,none,full);
  textAlign(CENTER, CENTER);
  textSize(72);
  text(`ENDING`, width/2, height/2);
  //add score text
  textSize(32);
  text(`Score: ` + bubble.foundNum, width/2, height*2/3);
  pop();
}
