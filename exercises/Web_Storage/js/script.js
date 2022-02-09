/**

Handpose Framework
Pippin Barr

A skeleton framework for using ml5.js's Handpose feature. Includes a
loading screen followed by a live webcam feed with a circle drawn at
the tip of the user's index finger.

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
  group:[],
  x: 0,
  y: 0,
  size: undefined,
  current: 0,
  bottom: false,
  overlap: false,
  found: false,
}
let bubbleNum = 10;

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
    fill(0, 0, 255);
    let bubbleX = random(0, width);
    let bubbleSize = random(25,100);
    let individualBubble = new Bubble(bubbleX, bubble.y, bubbleSize);
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
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
  background(255);

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
  bubbleDisplay();
}

/**
Provided with a detected hand it highlights the tip of the index finger
*/
function highlightHand(hand) {
  // Display a circle at the tip of the index finger
  index = hand.annotations.indexFinger[3];
  indexX = index[0];
  indexY = index[1];
  push();
  fill(255, 255, 0);
  noStroke();
  ellipse(indexX, indexY, 50);
  stroke(255, 255, 0);
  line(indexX, indexY, indexX, indexY-100);
  pop();
}

function bubbleDisplay() {
  if (bubble.group.length >0) {
    for (let i=0; i < bubble.group.length; i++) {
      bubble.group[i].display();
      
      bubble.group[bubble.current].move();
      bubble.group[bubble.current].checkOverlap();
      bubble.group[i].clear();
      if (bubble.bottom === true || bubble.found === true) {
        bubble.group.shift();
        bubble.bottom = false;
        bubble.found = false;
      }
    } 
  }
  
  console.log(`Bubble found ` + bubble.found);
}
