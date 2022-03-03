//P5 Library
import "./libraries/p5.min.js" ;
import "./libraries/p5.collide2d.min.js";
import "./libraries/p5.sound.min.js";
//Classes
// import AnimationYuji from "./AnimationYuji.js";
import Animation from "./Animation.js";
import ChoiceBtn from "./ChoiceBtn.js";
import Door from "./Door.js";
import q from "./questions.js"
import Narration from "./Narrration.js";
import narratives from "./narratives.js";
//Annyang Library
import "//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js"; 

"use strict";

//Initial State
// let state = `title`;
let state = `endingOfficer`;

//Distances
let courier = {
  regular: undefined,
  bold: undefined,
  italic: undefined
}

//Buttons
let btn = {
  start: undefined,
  about: undefined,
  name: undefined,
  nameInput: `Type Here`,
  birthGender: [],
  birthGenderInput: [`Female`, `Male`],
  identifiedGender: [],
  identifiedGenderInput: [`F.`, `M.`, `Else`],
  sexualOrientation: [],
  sexualOrientationInput: [`Bi.`, `F.`, `M.`, `Else`],
  identifiedSpecies: [],
  identifiedSpeciesInput: [`Human`, `Other`],
  game: undefined,
  assignID: [],
  assignIDInput: [`Yes`,`No`],
  messageBox: undefined,
  messageBoxInput: `Type Here`,
  choiceActor: [],
  choiceActorInput: [`a long sigh`, `a banana`, `the lamp`, `the horse`, `the past`, `the chocolate`, `next life`, `heaven`],
}

let doors = {
  objects: [],
  edge: 0,
  fill: 255,
}

//p5.images
let visual = {
  bg0: undefined,
  bg1: undefined,
  bg2: undefined,
  bg3: undefined,
  bg4: undefined,
  bg5: undefined,
  bgX: 0,
  bgY:0,
  index: undefined,
  animationYuji: [],
  videoYuji: undefined,
  animationPaper: [],
  videoPaper: undefined,
  animationDoor0: [],
  videoDoor0: undefined,
  animationDoor1: [],
  videoDoor1: undefined,
  animationDoor2: [],
  videoDoor2: undefined,
  animationDoor3: [],
  videoDoor3: undefined,
  animationDoorEnding: [],
  videoDoorEnding: [undefined, undefined, undefined, undefined],
  animationDoorBadEnding: [],
  videoDoorBadEnding: [undefined, undefined, undefined, undefined],
  characterDancer: undefined,
  characterActor: undefined,
  characterOfficer: undefined,
  characterStudent: undefined,
  //texts associated with each character
  texts: [undefined, undefined, undefined, undefined],
}

//colours
let colours = {
  black: 0,
  white: 255,
  doors: [],
}

//imported p5, all the rest of the codes are inside this anonymous function
new p5(function(p5){

//Loading images and fonts
p5.preload = function() {
  //fonts
  courier.regular = p5.loadFont(`assets/fonts/Courier/CourierPrime-Regular.ttf`);
  courier.bold = p5.loadFont(`assets/fonts/Courier/CourierPrime-Bold.ttf`);
  courier.italic = p5.loadFont(`assets/fonts/Courier/CourierPrime-Italic.ttf`);
  //visuals
  visual.bg0 = p5.loadImage(`assets/images/bg0.jpg`);
  visual.bg1 = p5.loadImage(`assets/images/bg1.jpg`);
  visual.bg2 = p5.loadImage(`assets/images/bg2.png`);
  visual.bg3 = p5.loadImage(`assets/images/bg3.png`);
  visual.bg4 = p5.loadImage(`assets/images/bg4.png`);
  visual.bg5 = p5.loadImage(`assets/images/bg5.jpg`);
  //images frame for the animation Yuji
  for (let i = 0; i < 300; i++) { 
    let loadedImage;
    if (i< 10) {
      loadedImage = p5.loadImage(`assets/images/comp2/yujiAnim_0000${i}.png`);
    }
    else if (i>= 10 && i< 100) {
      loadedImage = p5.loadImage(`assets/images/comp2/yujiAnim_000${i}.png`);
    }
    else {
      loadedImage = p5.loadImage(`assets/images/comp2/yujiAnim_00${i}.png`);
    }
    visual.animationYuji.push(loadedImage);
  }
  //images frame for the Paper animation
  for (let i = 0; i < 60; i++) { 
    let loadedImage;
    if (i< 10) {
      loadedImage = p5.loadImage(`assets/images/comp3/paperAnim_0000${i}.png`); 
    }
    else {
      loadedImage = p5.loadImage(`assets/images/comp3/paperAnim_000${i}.png`);
    }
    visual.animationPaper.push(loadedImage);
  }
  //images frame for the Door animations (all four of them)
  for (let i = 0; i < 89; i++) { 
    let loadedImage0;
    let loadedImage1;
    let loadedImage2;
    let loadedImage3;
    if (i< 10) {
      loadedImage0 = p5.loadImage(`assets/images/comp4/doorAnim1_0000${i}.png`); 
      loadedImage1 = p5.loadImage(`assets/images/comp5/doorAnim2_0000${i}.png`); 
      loadedImage2 = p5.loadImage(`assets/images/comp6/doorAnim3_0000${i}.png`); 
      loadedImage3 = p5.loadImage(`assets/images/comp7/doorAnim4_0000${i}.png`); 
    }
    else {
      loadedImage0 = p5.loadImage(`assets/images/comp4/doorAnim1_000${i}.png`);
      loadedImage1 = p5.loadImage(`assets/images/comp5/doorAnim2_000${i}.png`);
      loadedImage2 = p5.loadImage(`assets/images/comp6/doorAnim3_000${i}.png`);
      loadedImage3 = p5.loadImage(`assets/images/comp7/doorAnim4_000${i}.png`);
    }
    visual.animationDoor0.push(loadedImage0);
    visual.animationDoor1.push(loadedImage1);
    visual.animationDoor2.push(loadedImage2);
    visual.animationDoor3.push(loadedImage3);
  }
  //image frames for the normal ending door animations
  for (let i = 0; i< 5; i++) {
    let loadedImageEnding;
    let loadedImageBadEnding;
    loadedImageEnding = p5.loadImage(`assets/images/comp8/doorAnimEnding_0000${i}.png`); 
    loadedImageBadEnding = p5.loadImage(`assets/images/comp9/doorAnimBadEnding_0000${i}.png`); 
    visual.animationDoorEnding.push(loadedImageEnding);
    visual.animationDoorBadEnding.push(loadedImageBadEnding);
  }

  //Character images in special endings
  visual.characterDancer = p5.loadImage(`assets/images/chara0.png`); 
  visual.characterActor = p5.loadImage(`assets/images/chara3.png`); 
  visual.characterOfficer = p5.loadImage(`assets/images/chara2.png`); 
  visual.characterStudent = p5.loadImage(`assets/images/chara1.png`); 
}

//Canvas, buttons, animation, annyang
p5.setup = function() {
  p5.createCanvas(1280, 720);
  //Buttons
  btn.start= new ChoiceBtn(p5.width*5/7 +70, p5.height*5/8, 200, 50, colours.black, courier.regular, `START`, p5);
  btn.about= new ChoiceBtn(p5.width*5/7 +70, p5.height*5/8 + 100, 200, 50, colours.black, courier.regular, `RECORD`, p5);
  btn.game= new ChoiceBtn(p5.width*7/8, p5.height/10, 100, 100, colours.black, courier.regular, `NEXT`, p5);
  btn.name= new ChoiceBtn(p5.width/2, p5.height*2/5 - 20, 400, 50, colours.black, courier.regular, ``, p5);
  for (let i = 0; i<2; i++) { //birth gender buttons
    let x = p5.width/2 + i*(200 + 25);
    let btnObject= new ChoiceBtn(x, p5.height*2/5 + 55, 200, 50, colours.black, courier.regular, btn.birthGenderInput[i], p5);
    btn.birthGender.push(btnObject);
  }

  for (let i = 0; i<3; i++) { //identified gender buttons
    let x = p5.width/2 + i*(150 + 25);
    let btnObject= new ChoiceBtn(x, p5.height*2/5 + 130, 150, 50, colours.black, courier.regular, btn.identifiedGenderInput[i], p5);
    btn.identifiedGender.push(btnObject);
  }

  for (let i = 0; i<4; i++) { //sexual orientation buttons
    let x = p5.width/2 + i*(150 + 25);
    let btnObject= new ChoiceBtn(x, p5.height*2/5 + 205, 100, 50, colours.black, courier.regular, btn.sexualOrientationInput[i], p5);
    btn.sexualOrientation.push(btnObject);
  }

  for (let i = 0; i<2; i++) { //specie buttons
    let x = p5.width/2 + i*(200 + 25);
    let btnObject= new ChoiceBtn(x, p5.height*2/5 + 280, 200, 50, colours.black, courier.regular, btn.identifiedSpeciesInput[i], p5);
    btn.identifiedSpecies.push(btnObject);
  } 
  for (let i = 0; i<2; i++) { //assignID state buttons
    let x = p5.width/5 -70 + i*(150 + 25);
    let btnObject= new ChoiceBtn(x, p5.height*4/5 + 55, 150, 50, colours.black, courier.regular, btn.assignIDInput[i], p5);
    btn.assignID.push(btnObject);
  }
  btn.messageBox= new ChoiceBtn(p5.width/8, p5.height/2 +100, p5.width*6/8, 200, colours.black, courier.regular, ``, p5); //text box input field

  for (let i = 0; i< 8; i++) { //endingActor buttons
    let y;
    if (i <= 1) {
      y = p5.height/2 + i*(50 + 25);
    } else if (i <= 3) {
      y = p5.height/2 + i*(50 + 25) - 150;
    } else if (i <= 5) {
      y = p5.height/2 + i*(50 + 25) - 300;
    } else if (i <= 7) {
      y = p5.height/2 + i*(50 + 25) - 450;
    }
    let btnObject= new ChoiceBtn(p5.width/8, y, 400, 50, colours.black, courier.regular, btn.choiceActorInput[i], p5);
    btn.choiceActor.push(btnObject);
  } 
  console.log(btn.choiceActor.length);

  // Doors at the game state
  for (let i = 0; i<4; i++) { 
    for (let j = 0; j<3; j++) {
      let x = i*320;
      let y = j*240;
      let colour = 100;
      colours.doors.push(colour);
      // q.responses.push(``); 
      let doorObject= new Door(x, y, colours.black, colours.doors[i*j], p5);
      doors.objects.push(doorObject);
    } 
  }

  // Question Position at the game state
  q.x= p5.width/8;
  q.y= p5.height/8;

  // Sanity Level Position
  q.sanityLevel.content = 100;
  q.sanityLevel.x = p5.width*7/8;
  q.sanityLevel.y = p5.height/10;
  
  //Animation 1 for Yuji
  visual.videoYuji = new Animation(visual.animationYuji, 0, 0, 299, p5);
  //Animation 2 for Paper
  visual.videoPaper = new Animation(visual.animationPaper, -10, 25, 59, p5);
  //Animation 3 for Doors
  visual.videoDoor0 = new Animation(visual.animationDoor0, doors.objects[2].x, doors.objects[2].y, 88, p5);
  visual.videoDoor1 = new Animation(visual.animationDoor1, doors.objects[4].x, doors.objects[4].y, 88, p5);
  visual.videoDoor2 = new Animation(visual.animationDoor2, doors.objects[9].x, doors.objects[9].y, 88, p5);
  visual.videoDoor3 = new Animation(visual.animationDoor3, doors.objects[8].x, doors.objects[8].y, 88, p5);
  visual.videoDoorEnding[0] = new Animation(visual.animationDoorEnding, doors.objects[1].x, doors.objects[1].y, 4, p5);
  visual.videoDoorEnding[1] = new Animation(visual.animationDoorEnding, doors.objects[3].x, doors.objects[3].y, 4, p5);
  visual.videoDoorEnding[2] = new Animation(visual.animationDoorEnding, doors.objects[5].x, doors.objects[5].y, 4, p5);
  visual.videoDoorEnding[3] = new Animation(visual.animationDoorEnding, doors.objects[0].x, doors.objects[0].y, 4, p5);
  visual.videoDoorBadEnding[0] = new Animation(visual.animationDoorBadEnding, doors.objects[6].x, doors.objects[6].y, 4, p5);
  visual.videoDoorBadEnding[1] = new Animation(visual.animationDoorBadEnding, doors.objects[7].x, doors.objects[7].y, 4, p5);
  visual.videoDoorBadEnding[2] = new Animation(visual.animationDoorBadEnding, doors.objects[10].x, doors.objects[10].y, 4, p5);
  visual.videoDoorBadEnding[3] = new Animation(visual.animationDoorBadEnding, doors.objects[11].x, doors.objects[11].y, 4, p5);

  //Narrations for the special endings
  visual.texts[0] = new Narration(p5); //endingDancer
  visual.texts[1] = new Narration(p5); //endingActor
  visual.texts[2] = new Narration(p5); //endingOfficer
  visual.texts[3] = new Narration(p5); //endingStudent

  //Game for endingDancer
  for (let i = 0; i < narratives.endingDancerGame.num; i++) {
    narratives.endingDancerGame.x.push(i);
    narratives.endingDancerGame.y.push(i);
  }
  

  //Annyang
    if (window.annyang) {
      // Create commands
      let commands = {
        'Paper *answer': setDancerY,
        'I want to *answer': setOfficerDesicion,
        'My answer is *answer': function(answer){
          if (q.current < 6) {
            setAnswer(answer);
          }
      }    
    }
      // Add the commands and start annyang
      window.annyang.addCommands(commands);
      window.annyang.start();
    }

    // //Responsice voice
    // window.responsiveVoice.speak("Hello");
}

p5.draw = function() {
  p5.background(0);
  switch (state) {
    case `title`:
      title();
      break;
  
    case `profileSetting`:
      profileSetting();
      break;
  
    case `about`:
      about();
      break;

    case `assignID`:
      assignID();
      break;

    case `instruction`:
      instruction();
      break;

    case `game`:
      game();
      break;

    case `ending`:
      ending();
      break;
    
    case `badEnding`:
      badEnding();
      break;

    case `endingActor`:
      endingActor();
      break;

    case `endingDancer`:
      endingDancer();
      break;

    case `endingOfficer`:
      endingOfficer();
      break;

    case `endingStudent`:
      endingStudent();
      break;
  }
}

function title() {
  // Tittle texts and animations
  p5.push();
  p5.image(visual.bg0, 0, 0);
  p5.textAlign(p5.CENTER, p5.CENTER);
  p5.textFont(courier.bold);
  p5.textSize(48);
  p5.text(`PaperMan`, p5.width*5/7 +70 + 100, p5.height/3);
  p5.pop();

  visual.videoYuji.displayMouseAnim();//display the animation frame

  //Call functionalities of buttons
  btn.start.display();
  btn.about.display();
}

//State
function about() {
  p5.push();
  p5.image(visual.bg5, 0, 0);

  p5.textAlign(p5.CENTER, p5.CENTER);
  //Header texts
  p5.textFont(courier.bold);
  p5.textSize(48);
  p5.text(`Previous Messages`, p5.width/2, p5.height/8);

  p5.textAlign(p5.LEFT);
  p5.textFont(courier.regular);
  p5.textSize(24);
  p5.text(`Here is a recording of the messages you left previously`, p5.width/8, p5.height*3/8 - 50);
  p5.text(btn.messageBoxInput, p5.width/8, p5.height*3/8, p5.width*6/8 -50);

  //Go back to title page
  btn.game.display(); 


  p5.pop();
}

//State
function profileSetting() {
  p5.push();
  p5.image(visual.bg1, 0, 0);
  // //Display the buttons for the page
  btn.game.display();
  btn.name.display();
  for (let prop in btn.birthGender) {
    btn.birthGender[prop].display();
  }
  for (let prop in btn.identifiedGender) {
    btn.identifiedGender[prop].display();
  }
  for (let prop in btn.sexualOrientation) {
    btn.sexualOrientation[prop].display();
  }
  for (let prop in btn.identifiedSpecies) {
    btn.identifiedSpecies[prop].display();
  }

  //header
  p5.textAlign(p5.CENTER, p5.CENTER);
  p5.textFont(courier.bold);
  p5.textSize(48);
  p5.text(`Profile Setting`, p5.width/2, p5.height/8);
  p5.textFont(courier.regular);
  p5.textSize(24);
  p5.text(`Click on the choices to set your profile`, p5.width/2, p5.height/8 +50);
  
  //prompt table
  p5.textAlign(p5.LEFT);
  p5.textFont(courier.bold);
  p5.text(`NAME`, p5.width/5, p5.height*2/5); 
  p5.text(`BIRTH GENDER`, p5.width/5, p5.height*2/5 + 75);
  p5.text(`IDENTIFIED GENDER`, p5.width/5, p5.height*2/5 + 150);
  p5.text(`SEXUAL ORIENTATION`, p5.width/5, p5.height*2/5 + 225);
  p5.text(`IDENTIFIED SPECIE`, p5.width/5, p5.height*2/5 + 300);
  p5.textFont(courier.regular);
  p5.textSize(18);
  p5.text(`Recorded Answer: ${btn.birthGenderInput}`, p5.width/5, p5.height*2/5 + 100);
  p5.text(`Recorded Answer: ${btn.identifiedGenderInput}`, p5.width/5, p5.height*2/5 + 175);
  p5.text(`Recorded Answer: ${btn.sexualOrientationInput}`, p5.width/5, p5.height*2/5 + 250);
  p5.text(`Recorded Answer: ${btn.identifiedSpeciesInput}`, p5.width/5, p5.height*2/5 + 325);
  p5.textAlign(p5.CENTER, p5.CENTER);
  p5.textSize(32);
  p5.text(btn.nameInput, p5.width*2/3, p5.height*2/5 +5); // Name input field
  

  

  //Animation
  visual.bgX -= 10;
  if (visual.bgX <= -1280) {
    visual.bgX = -1280;
  }
  p5.image(visual.bg2, visual.bgX, visual.bgY);
  p5.pop();

  
}

function assignID() {
  p5.push();
  p5.image(visual.bg1, 0, 0);
  p5.textAlign(p5.CENTER, p5.CENTER);

  //header
  p5.textFont(courier.bold);
  p5.textSize(48);
  p5.text(`Your Assigned ID`, p5.width/2, p5.height/8);
  p5.textFont(courier.regular);
  p5.textSize(24);
  p5.text(`Before entering the paper world, you should obtain a valid ID`, p5.width/2, p5.height/8 +50);

  //Identity card
  p5.image(visual.bg3, p5.width/5 -70, p5.height*2/5 - 75);
  
  //Prompt Table
  p5.textAlign(p5.LEFT);
  p5.textFont(courier.bold);
  p5.text(`NAME`, p5.width/5, p5.height*2/5);
  p5.text(`BIRTH GENDER`, p5.width/5, p5.height*2/5 + 75);
  p5.text(`IDENTIFIED GENDER`, p5.width*3/5, p5.height*2/5 + 75);
  p5.text(`SEXUAL ORIENTATION`, p5.width/5, p5.height*2/5 + 150);
  p5.text(`IDENTIFIED SPECIE`, p5.width*3/5, p5.height*2/5 + 150);
  //Details
  p5.textFont(courier.regular);
  p5.text(`Paper Man`, p5.width/5 + 100, p5.height*2/5);
  p5.text(`Male`, p5.width/5, p5.height*2/5 + 105);
  p5.text(`Female`, p5.width*3/5, p5.height*2/5 + 105);
  p5.text(`Men`, p5.width/5, p5.height*2/5 + 180);
  p5.text(`Human`, p5.width*3/5, p5.height*2/5 + 180);

  //Question at the buttom
  p5.text(`Would you like to spend 10 sanity units to get the ID?`, p5.width/5 -70, p5.height*4/5 + 30);
  if (q.sanityLevel.content === 90) {
    p5.text(`Decision Recorded! You are good to go.`, p5.width/2 -50, p5.height*4/5 + 75);
  } else if (btn.assignIDInput === `No`) {
    p5.text(`At your risks.`, p5.width/2 -50, p5.height*4/5 + 75);
  }
  //Yes or No button
  for (let prop in btn.assignID) {
    btn.assignID[prop].display();
  }

  //display the animation for the paper
  visual.videoPaper.displayMouseAnim();

  btn.game.display(); //button to switch to instruction state

  p5.pop();
}


//Instruction State
function instruction() {
  p5.push();
  p5.image(visual.bg1, 0, 0); //background
  p5.textAlign(p5.CENTER, p5.CENTER);

  //Instruction texts
  p5.textFont(courier.bold);
  p5.textSize(48);
  p5.text(`Instructions`, p5.width/2, p5.height/8);
  p5.textFont(courier.regular);
  p5.textSize(24);
  p5.text(`Some rules about the Paper world`, p5.width/2, p5.height/8 +50);

  p5.textAlign(p5.LEFT);
  p5.text(`1. Answer the asked questions by saying "My answer is (yes/no)."`, p5.width/8, p5.height*3/8);
  p5.text(`2. Once your sanity level is under 30, you are eliminated.`, p5.width/8, p5.height*3/8 +50);
  p5.text(`3. When all questions are answered, choose a lightened box to enter.`, p5.width/8, p5.height*3/8 +100);
  p5.text(`ATTENTION: Please use Google Chrome; allow microphone and camera.`, p5.width/8, p5.height*6/8);

  btn.game.display(); //button to switch to game state

  p5.pop();
}


//Game state
function game() {
  p5.push();
  p5.image(visual.bg1, 0, 0); //background

  //display the animations for special doors when the corresponding door is illuminated
  if (q.questions[1].response === `yes` && q.questions[0].response === `yes` && q.questions[2].response === `yes` && q.questions[4].response === `yes` && q.questions[5].response === `yes`) {
    visual.videoDoor0.displayAutoAnim(320, 240); //door 2
  }
  if (q.questions[3].response === `yes` && q.questions[0].response === `yes` && q.questions[4].response === `yes` && q.questions[5].response === `yes`) {
    visual.videoDoor1.displayAutoAnim(320, 240); //door 4
  }
  if (q.questions[0].response === `yes` && q.questions[2].response === `yes` && q.questions[4].response === `yes` && q.questions[5].response === `yes`) {
    visual.videoDoor2.displayAutoAnim(320, 240); //door 9
  }
  if ( q.questions[4].response === `yes` && q.questions[5].response === `yes`) {
    visual.videoDoor3.displayAutoAnim(320, 240); //door 8
  }
  //display the other animations for normal endings when all questions are answered
  for (let i = 0; i < visual.videoDoorEnding.length; i++) {
    if (q.finished === true) {
      visual.videoDoorEnding[i].displayAutoAnim(320, 240);
      visual.videoDoorBadEnding[i].displayAutoAnim(320, 240);
    }
  }

  //display the doors behind
  for (let prop in doors.objects) {
    doors.objects[prop].display(); 
  }
  //change colour depending on the response
  for (let i=0; i< 6; i++) { //7 because only 6 questions are going to be asked
    if (q.questions[i].response === `yes`) { 
      doors.objects[i].openDoor();
    } else if (q.questions[i].response === `no`) {
      doors.objects[i].closeDoor();
    }
    
  }

    //If more than 6 questions have been asked, let the player choose a door to enter
  if (q.finished === true) {
    for (let i = 6; i< doors.objects.length; i++) { //Loop through the rest of the doors that don't have a corresponding question
      doors.objects[i].openDoor(); //Open all of them
    }
    for (let i =0; i< doors.objects.length; i++) { //Loop through all doors
      doors.objects[i].choose(); //let the player click on them
    }
   
  }
  

  //header questions
  q.y +=1;
  p5.textFont(courier.bold);
  p5.textSize(48);
  p5.textWrap(p5.WORD);
  q.colour = 128 + 128 * p5.sin(p5.millis() / 1000);
  p5.fill(q.colour);
  p5.text(`Q${q.current}: ${q.questions[q.current].content}`, q.x, q.y, p5.width*7/8);

  //Description of question
  p5.textFont(courier.regular);
  p5.textSize(24);
  p5.fill(0);
  p5.rect(0, p5.height-50, p5.width, 50);
  p5.fill(255);
  p5.text(q.questions[q.current].description, q.x, p5.height-15);

  //Sanity Level
  p5.textFont(courier.bold);
  p5.text(`San: ${q.sanityLevel.content}`, q.sanityLevel.x, q.sanityLevel.y);
  p5.pop();

  //Bad ending condition
  if (q.sanityLevel.content <= 30) {
    state = `badEnding`;
  }
}


// //Annyang functions that update the questions and sanity level depending on the answer.
function setAnswer(answer) { //annyang.trigger("My answer is yes") or annyang.trigger("My answer is no")
  let question = q.questions[q.current];
  question.response = answer;
  q.current++; //goes to next current question
  window.responsiveVoice.speak(`Question${q.current}: ${q.questions[q.current].content}`); //Speak question
  q.y = p5.height/8; //Move question's position

  if (answer === question.sanityTest.answer) { //if they said yes
    for (let i = 0; i < question.sanityTest.condition.value.length; i++){
      if (btn[question.sanityTest.condition.property] === question.sanityTest.condition.value[i]) { //if their profile doesn't match with their response logic
        q.sanityLevel.content += question.sanityTest.penalty; //take out sanity points
        break;
      }
    }
  }
  if (q.current ===6) { //No more questions to be asked
   q.finished = true;
  }
}


//Open a path towards the ending
function detectEnding() {
  for (let i=0; i< doors.objects.length; i++) { // loop through all doors
    if (doors.objects[i].clicked === true && doors.objects[i].currentFill === 255) { //if that door is illuminated
      if (i === 1 || i ===3 || i ===5 || i ===6) { // Normal doors 
        state = `ending`;
      } else if (i === 7 || i ===10 || i ===11 || i ===12) { // Bad Ending doors
        state = `badEnding`;
      } else if (i === 2) { // Actor (Yuji) door
        state = `endingActor`;
      } else if (i === 4) { // Admission Officer door
        state = `endingOfficer`;
      } else if (i === 9) { // Dancer door
        state = `endingDancer`;
      } else if (i === 8) { // Student door
        state = `endingStudent`;
      }
    } else { 
      //Do nothing if the door is not clicked or the door is not illuminated
    }
  }
}


//Ending State (normal)
function ending() {
  p5.push();
  p5.image(visual.bg1, 0, 0);

  p5.textAlign(p5.CENTER, p5.CENTER);
  //Header texts
  p5.textFont(courier.bold);
  p5.textSize(48);
  p5.text(`Life of a paper man`, p5.width/2, p5.height/8);

  p5.textAlign(p5.LEFT);
  p5.textFont(courier.regular);
  p5.textSize(24);
  p5.text(`You have been successfully admitted to the Paper World. The Paper government gave you a job, just like how it did for the other paper men. You have gave up on some parts of your identity, in exchange, you live a peaceful life without persecution. You married a man a few years later, and got a paper baby. All seem to go into the right direction, but sometimes you feel like you have forgotten some things.`, p5.width/8, p5.height*2/8, p5.width*6/8);
  p5.text(`You can leave a message for yourself below: `, p5.width/8, p5.height/2 +50);
  //Message box below
  btn.messageBox.display();
  p5.text(btn.messageBoxInput, p5.width/8 +50, p5.height/2 +150, p5.width*6/8 - 50);

  //Go back to title page
  btn.game.display(); 

  p5.pop();
}


//Ending State (bad)
function badEnding() {
  p5.push();
  p5.image(visual.bg5, 0, 0);

  p5.textAlign(p5.CENTER, p5.CENTER);
  //Header texts
  p5.textFont(courier.bold);
  p5.textSize(48);
  p5.text(`Life of a paper man`, p5.width/2, p5.height/8);

  p5.textAlign(p5.LEFT);
  p5.textFont(courier.regular);
  p5.textSize(24);
  p5.text(`You don't feel right in this Paper world. You know from the bottom of your soul that you shouldn't belong here. So, one day, you considered suicide and abandonned everyone. You can finally be free.`, p5.width/8, p5.height*2/8, p5.width*6/8);
  p5.text(`As the dust of your remaining paper body dance in the air, with the rythm of the wind, you seemed to remember more than vividly who you were, before entering the Paper World.`, p5.width/8, p5.height/2 -50, p5.width*6/8);
  p5.text(`You can leave a message for yourself below: `, p5.width/8, p5.height/2 +50);

  //Message box below
  btn.messageBox.display();
  p5.text(btn.messageBoxInput, p5.width/8 +50, p5.height/2 +150, p5.width*6/8 - 50);

  //Go back to title page
  btn.game.display(); 
  p5.pop();
}


//Dancer special ending
function endingDancer() {
  p5.push();
  p5.image(visual.bg1, 0, 0);
  p5.image(visual.characterDancer, p5.width/2 - 50, p5.height/4 );

  //Bottom texts
  p5.textFont(courier.regular);
  visual.texts[0].display(narratives.endingDancer, narratives.currentDancerLine);
  
  //Start a game when the player reaches the 5th sentence
  if (narratives.currentDancerLine === 5) {
    dancerGame(p5.mouseX, p5.mouseY, p5.pmouseX, 300); //using the pmouseX from p5 to get previous mouse position and do some form changes
    //Score Points
    p5.textFont(courier.bold);
    p5.textSize(24);
    p5.text(`Score: ${narratives.score}`, q.sanityLevel.x, q.sanityLevel.y);
  }

  //End the game and go back to the narratives when reaches the score of 90
  if (narratives.score >= 90) {
    narratives.currentDancerLine = 6;
    narratives.score =0;
  }
  
  //When the narratives finish
  if (narratives.currentDancerLine >= narratives.endingDancer.length) {
    p5.textAlign(p5.CENTER, p5.CENTER);
    //Header texts
    p5.textFont(courier.bold);
    p5.textSize(48);
    p5.text(`Life of a Dancer`, p5.width/2, p5.height/8);

    p5.textAlign(p5.LEFT);
    p5.textFont(courier.regular);
    p5.textSize(24);
    p5.text(`There are definitely more to explore in the Paper World. After years and years of repeting performances, you start to go insane. Even if you were able to keep your identity, you still suffer from the restrictive rules. One day, you decided this is enough and you don't want no tomorrow anymore.`, p5.width/8, p5.height*2/8, p5.width*6/8 -50);
    p5.text(`You can leave a message for yourself below: `, p5.width/8, p5.height/2 +50);
    //Message box below
    btn.messageBox.display();
    p5.text(btn.messageBoxInput, p5.width/8 +50, p5.height/2 +150, p5.width*6/8 - 50);

    //Go back to title page
    btn.game.display(); 
  }

  p5.pop();
}


//A little game to go up and down
function dancerGame(x, y, pX, pY) {
  p5.push();
  //animate the stroke colour and circles
  q.colour = 640 + 640 * p5.sin(p5.millis() / 1000);
  // p5.stroke(q.colour);
  let difference = p5.abs(x - pX) + p5.abs(y - pY);
  p5.fill(q.colour);

  //Input storage inspired from https://p5js.org/examples/input-storing-input.html
  let current = p5.frameCount % narratives.endingDancerGame.num;
  narratives.endingDancerGame.x[current] = q.colour;
  narratives.endingDancerGame.y[current] = narratives.endingDancerGame.currentY;

  //Draw the circle trail
  for (let i = 0; i < narratives.endingDancerGame.num; i++) {
    let index = (current + 1 + i) %  narratives.endingDancerGame.num;
    p5.ellipse(narratives.endingDancerGame.x[index], narratives.endingDancerGame.y[index], difference%i, i);
  }

  //Game Target
  p5.textFont(courier.bold);
  p5.textSize(24);
  p5.text(`Next Step Here`, p5.width/5, narratives.endingDancerGame.textY);

  if(narratives.endingDancerGame.textY === narratives.endingDancerGame.currentY) {
    narratives.score += 20;
    narratives.endingDancerGame.textY += -100;
  }
  p5.pop();
}


//Set the position of the circle trail based on annyang
function setDancerY(answer) {
  if (answer === `up`) {
    narratives.endingDancerGame.currentY += -100;
  } else if (answer === `down`) {
    narratives.endingDancerGame.currentY += 100;
    narratives.score += 10;
  }
}


//Actor special ending (Yuji)
function endingActor() {
  p5.push();
  p5.image(visual.bg1, 0, 0);
  p5.image(visual.characterActor, p5.width*2/3, 0);

  //Bottom texts
  p5.textFont(courier.regular);
  visual.texts[0].display(narratives.endingActor, narratives.currentActorLine);

  if (narratives.currentActorLine === 6) {
    actorGame();
    //Score Points
    p5.textFont(courier.bold);
    p5.textSize(24);
    p5.text(`Score: ${narratives.score}`, q.sanityLevel.x, q.sanityLevel.y);
  }
  
  //End the game and go back to the narratives when reaches the score of 90
  if (narratives.endingActorGame.promptNum === 4 && narratives.score >= 90) {
    narratives.currentActorLine = 7;
    narratives.score = 0;
    narratives.endingActorGame.promptNum = 0;
  } else if (narratives.endingActorGame.promptNum === 4 && narratives.score < 90) {
    state = `badEnding`;
  }

  //When the narratives finish
  if (narratives.currentActorLine >= narratives.endingActor.length) {
    p5.textAlign(p5.CENTER, p5.CENTER);
    //Header texts
    p5.textFont(courier.bold);
    p5.textSize(48);
    p5.text(`Life of an Actor`, p5.width/2, p5.height/8);

    p5.textAlign(p5.LEFT);
    p5.textFont(courier.regular);
    p5.textSize(24);
    p5.text(`After years and years of repeting performances, you start to go insane. Until one day, you played a role and the role has the exact same name as yours: ${btn.nameInput}. More intriguing is that the plot totally matches your life! You start to have questions and doubt around the world you live in.`, p5.width/8, p5.height*2/8, p5.width/2);
    p5.text(`Congradulation! You have found a secret bug in the Paper World. If you click the "Next" button you will be orientated towards a new destiny.`, p5.width/8, p5.height*2/3, p5.width/2);

    //Go back to game page
    btn.game.display(); 
  }
  p5.pop();
}

function actorGame() {
  p5.push();
  //Theater improvisation
  if (narratives.endingActorGame.promptNum === 0) {
    btn.choiceActor[0].display(); //choice btn
    btn.choiceActor[1].display();
  } else if (narratives.endingActorGame.promptNum === 1) {
    btn.choiceActor[2].display(); 
    btn.choiceActor[3].display();
  } else if (narratives.endingActorGame.promptNum === 2) {
    btn.choiceActor[4].display(); 
    btn.choiceActor[5].display();
  } else if (narratives.endingActorGame.promptNum === 3) {
    btn.choiceActor[6].display(); 
    btn.choiceActor[7].display();
  }
  
  //Prompt text
  p5.textAlign(p5.LEFT);
  p5.textFont(courier.regular);
  p5.textSize(24);
  p5.fill(colours.white);
  p5.rect(p5.width/10, p5.height/8, p5.width/2, p5.height/3, 10);
  p5.fill(colours.black);
  p5.text(narratives.endingActorGame.prompt[narratives.endingActorGame.promptNum], p5.width/10 + 50, p5.height/8 +50, p5.width/2 - 50);
  p5.fill(colours.white);

  p5.pop();
}


//Officer special ending
function endingOfficer() {
  p5.push();
  p5.image(visual.bg1, 0, 0);
  p5.image(visual.characterOfficer, p5.width*2/3, p5.height/4 );

  //Bottom texts
  p5.textFont(courier.regular);
  visual.texts[0].display(narratives.endingOfficer, narratives.currentOfficerLine);

  if (narratives.currentOfficerLine >= narratives.endingOfficer.length) {
    p5.textAlign(p5.CENTER, p5.CENTER);
    //Header texts
    p5.textFont(courier.bold);
    p5.textSize(48);
    p5.text(`Speak to the computer`, p5.width/2, p5.height/8);

    p5.textAlign(p5.LEFT);
    p5.textFont(courier.regular);
    p5.textSize(24);
    p5.text(`Choose an option by saying: "I want to suicide", "I want to cancel the director board" or "I want to quit my job".`, p5.width/8, p5.height*2/8, p5.width*6/8 -50);

    p5.text(narratives.endingOfficerGame.playerInput, p5.width/8, p5.height/2, p5.width*6/8 -50);
    p5.text(narratives.endingOfficerGame.choiceResponse, p5.width/8, p5.height/2 + 50, p5.width*5/8 -100);

    btn.game.display(); 
  }
  p5.pop();
}


function setOfficerDesicion(answer) {
  if (answer === `suicide`) {
    narratives.endingOfficerGame.choiceResponse = `You decided to commit suicide. At the edge of dying, you suddenly remembered everything as your life flashes in front of you.You remembered to be a ${btn.identifiedSpeciesInput}, living on Earth. You are not a paper man. Your name is ${btn.nameInput}. But then why are you in this world?`
  } else if (answer === `cancel the director board`) {
    narratives.endingOfficerGame.choiceResponse = `You decided to fight against the director board. However, everytime you destroy them, they appear again the next day. You think you are going insane, and you gradually forget who you are.`
  } else if (answer === `quit my job`) {
    narratives.endingOfficerGame.choiceResponse = `You decided to quit your job. A few years passed and you are getting used to life of a Paper Man in the Paper World.`
  }

  narratives.endingOfficerGame.playerInput = answer;
}


//Student special ending
function endingStudent() {
  p5.push();
  p5.image(visual.bg1, 0, 0);
  p5.image(visual.characterStudent, p5.width*2/3, p5.height/4 );

  //Bottom texts
  p5.textFont(courier.regular);
  visual.texts[0].display(narratives.endingStudent, narratives.currentStudentLine);
  p5.pop();
}


//Prompt question when the user mousepress
p5.mousePressed = function() {
  //Title page start button
  if (btn.start.clicked ) {
    state = `profileSetting`;
    btn.start.clicked = false;
  } else if (btn.about.clicked ) { //about button
    state = `about`;
    btn.about.clicked = false;
  } 

  //Profile setting page buttons
  if (btn.name.clicked) {
    btn.nameInput = ``;
  } else if (btn.birthGender[0].clicked) {
    btn.birthGenderInput = `Female`;
  } else if (btn.birthGender[1].clicked) {
    btn.birthGenderInput = `Male`;
  } else if (btn.identifiedGender[0].clicked) {
    btn.identifiedGenderInput = `Female`;
  } else if (btn.identifiedGender[1].clicked) {
    btn.identifiedGenderInput = `Male`;
  } else if (btn.identifiedGender[2].clicked) {
    btn.identifiedGenderInput = `Non-binary`;
  } else if (btn.sexualOrientation[0].clicked) {
    btn.sexualOrientationInput = `Bi-sexual`;
  } else if (btn.sexualOrientation[1].clicked) {
    btn.sexualOrientationInput = `Female (women)`;
  } else if (btn.sexualOrientation[2].clicked) {
    btn.sexualOrientationInput = `Male (men)`;
  } else if (btn.sexualOrientation[3].clicked) {
    btn.sexualOrientationInput = `Not mentioned`;
  } else if (btn.identifiedSpecies[0].clicked) {
    btn.identifiedSpeciesInput = `Human`;
  } else if (btn.identifiedSpecies[1].clicked) {
    btn.identifiedSpeciesInput = `Interesting!`;
  } 

  //Next Button in the profileSetting state
  if (state === `profileSetting`) {
    if (btn.game.clicked) {
      state = `assignID`;
      btn.game.clicked = false;
    }
  }
  //Next Button in the assignID state
  if (state === `assignID` && btn.game.clicked) {
    if ( btn.assignIDInput === `No` || q.sanityLevel.content === 90) {
      state = `instruction`;
      btn.game.clicked = false;
    }
  } 

  //Yes Button in the assignID state
  if (btn.assignID[0].clicked) {
    q.sanityLevel.content -= 10;
    btn.nameInput = `Paper Man`; //update the player's profile
    btn.birthGenderInput = `Male`;
    btn.identifiedGenderInput = `Female`;
    btn.sexualOrientationInput = `Male (men)`;
    btn.identifiedSpeciesInput = `Human`;
  } else if (btn.assignID[1].clicked) { //No button in the assignID state
    btn.assignIDInput = `No`;
  }

  //Next Button in the game state
  if (state === `instruction` && btn.game.clicked) {
      state = `game`;
      btn.game.clicked = false;
  } 

  //Start the responsive voice for the first time 
  if (q.current === 0 && state === `game`) {
    window.responsiveVoice.speak(`Question${q.current}: ${ q.questions[q.current].content}`);
  }
  //Detect ending if all six questions have been asked
  if (state === `game` && q.current >= 5) {
    detectEnding();
  }

  //Message field Input
  if (btn.messageBox.clicked) {
    btn.messageBoxInput = ``;
  }
  //Next Button in the game state
  if ((state === `ending` || state === `badEnding` || state === `about` || state === `endingDancer` || state === `endingOfficer`) && btn.game.clicked) {
    state = `title`;
    btn.game.clicked = false;
  } else if (state === `endingActor` &&  btn.game.clicked) {
    state = `game`;
  }

  //Line switches in the special endings
  if (state === `endingDancer` && (narratives.currentDancerLine <= 4 || narratives.currentDancerLine >= 6 )) {
    narratives.currentDancerLine += 1;
  } else if (state === `endingActor` && (narratives.currentActorLine <= 5 || narratives.currentActorLine >= 7 )) {
    narratives.currentActorLine +=1;
  } else if (state === `endingOfficer`) {
    narratives.currentOfficerLine +=1;
  }
  

  //Actor Game
  for (let prop in btn.choiceActor) {
    if (btn.choiceActor[prop].clicked) {
      narratives.endingActorGame.promptNum += 1;
      btn.choiceActor[prop].clicked = false;
    }
    if (btn.choiceActor[0].clicked || btn.choiceActor[2].clicked || btn.choiceActor[4].clicked || btn.choiceActor[6].clicked) {
      narratives.score += 20;
    }
  }
  
} //End of mousePressed


p5.keyTyped = function() {
  //For name input under the state profileSetting
  if (btn.name.clicked) {
    btn.nameInput += p5.key;
  }
  if (btn.messageBox.clicked) {
    btn.messageBoxInput += p5.key;
  }
}

p5.keyPressed = function() {
  //For name input under the state profileSetting
  if (btn.name.clicked && p5.keyCode === p5.BACKSPACE) {
      // Remove the last character in a string!
      btn.nameInput = btn.nameInput.slice(0, btn.nameInput.length - 1);
  }
  if (btn.messageBox.clicked && p5.keyCode === p5.BACKSPACE) {
    // Remove the last character in a string!
    btn.messageBoxInput = btn.messageBoxInput.slice(0, btn.messageBoxInput.length - 1);
}
}

}); //End of p5 object

//Not add after