/**
The play scene that drives the overall game. Creates sprites representing
the avatar, the thumbs down, and the thumbs ups. Adds keyboard controls
for the avatar. Adds collisions and overlaps to handle physics and thumbs
down collection.
*/

class Play extends Phaser.Scene {

    /**
    Just sets the scene's key name
    */
    constructor() {
      super({
        key: `play`
      });
    }
  
    /**
    Does the lion's share of the work creating sprites and configuring them,
    as well as setting physics handlers and listening to the arrow keys.
    */
    create() {
      // Create the avatar and make it collide with the "walls"
      this.avatar = this.physics.add.sprite(400, 400, `avatar`);
      this.avatar.setCollideWorldBounds(true);
  
      // Create a sadness emoji in a random position
      this.sadness = this.physics.add.sprite(0, 0, `thumbs-down`);
      this.sadness.setCollideWorldBounds(true);
      // Note how we can use RandomRectangle() here if we put the object we want
      // to reposition randomly in an array!
      Phaser.Actions.RandomRectangle([this.sadness], this.physics.world.bounds);
  
      // Create a group of hapiness emojis with some basic
      // physics configuration
      this.happiness = this.physics.add.group({
        // Image key to use
        key: `thumbs-up`,
        // How many
        quantity: 120,
        // Collide with the "walls"
        collideWorldBounds: true,
        // How much to they bounce when they hit something?
        bounceX: 0.5,
        bounceY: 0.5,
        // How quickly do they slow down while moving?
        dragX: 50,
        dragY: 50
      });
      // Position all the members of the group randomly within a rectangle the same
      // dimensions and position as the world's bounds (e.g. the canvas)
      Phaser.Actions.RandomRectangle(this.happiness.getChildren(), this.physics.world.bounds);
  
      // Listen for when the avatar overlaps the thumbs up and handle it,
      // remembering to set "this" so that we can use "this" in the method it calls
      this.physics.add.overlap(this.avatar, this.sadness, this.getSad, null, this);
      this.physics.add.overlap(this.avatar, this.happiness, this.getHappy, null, this);
      // Add colliders between the avatar and the happiness, and the happiness and itself
      // so that we get lots of fun bouncy physics for free!
      this.physics.add.collider(this.avatar, this.happiness);
      this.physics.add.collider(this.happiness, this.happiness);
      this.physics.add.collider(this.happiness, this.sadness);
  
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  
    /**
    Called when the avatar overlaps the sadness, moves the sadness to a new random position.
    */
    getSad(avatar, sadness) {
    points++;
    updatePoints();
    this.avatar.setTint(`0xdd${points}3${points}3`);
      // Note how we can use RandomRectangle() again here if we put the object we want
      // to reposition randomly in an array!
      Phaser.Actions.RandomRectangle([sadness], this.physics.world.bounds);
      //add one point
    }

    //called when the avatar overlaps the happiness
    getHappy(avatar, happiness) {
        this.happiness.setVelocityY(-10);
    }
  
    /**
    Listens for user input
    */
    update() {
      this.handleInput();
    }
  
    /**
    Moves the avatar based on the arrow keys for rotation and thrust
    */
    handleInput() {
      // If either left or right is pressed, rotate appropriately
      if (this.cursors.left.isDown) {
        this.avatar.setAngularVelocity(-150);
        this.sadness.setVelocityX(-50);
      }
      else if (this.cursors.right.isDown) {
        this.avatar.setAngularVelocity(150);
        this.sadness.setVelocityX(50);
      }
      // Otherwise stop rotating
      else {
        this.avatar.setAngularVelocity(0);
      }
  
      // If the up key is pressed, accelerate in the current rotation direction
      if (this.cursors.up.isDown) {
        this.physics.velocityFromRotation(this.avatar.rotation, 200, this.avatar.body.acceleration);
        this.sadness.setVelocityY(100);
      }
      // Otherwise, zero the acceleration
      else {
        this.avatar.setAcceleration(0);
      }

      //For the sadness icon
      if (this.cursors.down.isDown) {
        this.sadness.setVelocityY(-100);
      }
    }
  }