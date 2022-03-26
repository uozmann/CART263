/**
Desperately Seeking Sadness
CART 263

New elements:
1. Two player game: one player controles the avatar, the other one controles the thumb down in handleInput()
2.  Score count: add a point at getSad() in the Play class
3. Settled the sad emoji to collide with the happiness and game frame.
4. Added a sound effect to the collision with the sad emoji
5. Added a pull-up motion when touches with the avatar touches the thumb up. The motion is stopped when no longer in touch.
*/

"use strict";

// Standard configuration for the game
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: `arcade`
  },
  scene: [Boot, Play]
};

let game = new Phaser.Game(config);


// Dom manipulation

