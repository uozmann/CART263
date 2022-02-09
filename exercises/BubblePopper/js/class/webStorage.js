//Questions:
//1. name.function(); how does it work?
//2. >= function

// Track clicks
let clicks = 0;
// A place to store the game data
let gameData = {
  highScore: 0 // Start the high score at 0 by default
};

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Try to load the game data (remembering to parse it first)
  let data = JSON.parse(localStorage.getItem(`game-data`));
  // Check if there's anything there
  if (data !== null) {
    // There is data! So replace our default game data with the save data
    gameData = data;
  }
}

function draw() {
  background(0);

  // Display score
  push();
  textSize(64);
  textAlign(CENTER);
  textStyle(BOLD);
  fill(255, 255, 0);
  text(clicks, width / 2, height / 2);
  pop();

  // Display high score
  push();
  textSize(32);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  fill(255, 255, 0);
  text(`High score: ${gameData.highScore}`, 0, 0);
  pop();
}

function mousePressed() {
  // They clicked!
  clicks++;
  // Check if this beats the current high score...
  if (clicks > gameData.highScore) {
    // Set the new high score
    gameData.highScore = clicks;
    // Save the game data to remember for next time, remembering to stringify the data first
    localStorage.setItem(`game-data`, JSON.stringify(gameData));
  }
}