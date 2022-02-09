/**

ObjectDetector Framework
Pippin Barr

A skeleton framework for using ml5.js's ObjectDetector feature. Includes a
loading screen followed by a live webcam feed with all recognized objects
outlined and labelled with a name and confidence rating.

*/

/**Recap for object detection
 1. P5: create capture: createCapture(VIDEO/AUDIO, [callback function])
 2. 


*/

"use strict";

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `CocoSsd`;
// ObjectDetector object (using the name of the model for clarify)
let cocossd;
// The current set of predictions made by CocoSsd once it's running
let predictions = [];

/**
Starts the webcam and the ObjectDetector
*/
function setup() {
  // createCanvas(640, 480);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  // video.hide();

}

/**
Handles the two states of the program: loading, running
*/
function draw() {
    running();
}

/**
Displays the webcam.
If there are currently objects detected it outlines them and labels them
with the name and confidence value.
*/
function running() {
  // Display the webcam
  // image(video, 0, 0, width, height);
}