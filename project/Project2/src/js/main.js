//https://threejs.org/docs/#manual/en/introduction/Installation
"use strict"

import * as THREE from '../../threeJS/src/Three.js';
import { PointerLockControls } from '../../threeJS/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from '../../threeJS/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from '../../threeJS/examples/jsm/libs/tween.module.min.js'; 
import { mapLinear } from '../../threeJS/src/math/MathUtils.js';

//class
import Version0 from './Version0.js';
import Reality from './RealityContent.js';
import Simulation from './SimulationContent.js';
//other js files

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//OBJECTS SECTION
//General settings
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
//Default webgl renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild( renderer.domElement );
//Special renderer for css elements

//Controls
const controls = new PointerLockControls( camera, document.body );
controls.enableDamping = true;
// controls.listenToKeyEvents( window );


//assets
let modelsParameters = {
	cube: { //placeholder for young childhood scene
		x: -12,
		y: 0,
		z: 0
	},
	sphere: { //placeholder for teenage scene
		radius: 0.5,
		x: -18,
		y: -1,
		z: -25

	},
	cylinder: { //placeholder for young parenthood scene
		radius: 0.5,
		height: 1,
		x: 10,
		y: -1,
		z: -28
	},
	torusKnot : { //placeholder for elderly scene
		x: 15,
		y: -1,
		z: 2
	},
	floor: {
		width: 2000,
		height: 2000,
		x: 0,
		y: -3,
		z: 0
	}
}
const modelsSettings = { //basic settings before creating the object
	cube: {
		geometry: new THREE.BoxGeometry(),
		material: new THREE.MeshPhongMaterial( { color: 0xff00ff } ),
	},
	sphere: {
		geometry: new THREE.SphereGeometry( modelsParameters.sphere.radius, 16, 8 ),
		material: new THREE.MeshPhongMaterial( { color: 0xffffff } ),
	},
	cylinder: {
		radius: 5,
		geometry: new THREE.CylinderGeometry( modelsParameters.cylinder.radius, modelsParameters.cylinder.radius, modelsParameters.cylinder.height, 32 ),
		material: new THREE.MeshPhongMaterial( {color: 0xffff00} ),
	},
	torusKnot: {
		geometry: new THREE.TorusKnotGeometry( 0.5, 0.25, 100, 16 ),
		material: new THREE.MeshPhongMaterial( {color: 0x00ff00} )
	},
	floor: {
		geometry: new THREE.PlaneGeometry( modelsParameters.floor.width, modelsParameters.floor.height ),
		material: new THREE.MeshPhongMaterial( {color: 0xB97A20} ), 
	}
};
const models = { //creating the object
	cube:  new THREE.Mesh( modelsSettings.cube.geometry, modelsSettings.cube.material),
	sphere:  new THREE.Mesh( modelsSettings.sphere.geometry, modelsSettings.sphere.material),
	cylinder: new THREE.Mesh( modelsSettings.cylinder.geometry, modelsSettings.cylinder.material ),
	torusKnot: new THREE.Mesh( modelsSettings.torusKnot.geometry, modelsSettings.torusKnot.material),
	clockHours: [],
	currentClockHour: 0,
	floor: new THREE.Mesh( modelsSettings.floor.geometry, modelsSettings.floor.material ),
	wall: undefined,
	uploaded: [],
};
//Transformation applied to the models
models.cylinder.position.set(modelsParameters.cylinder.x, modelsParameters.cylinder.y, modelsParameters.cylinder.z);
models.cube.position.set(modelsParameters.cube.x, modelsParameters.cube.y, modelsParameters.cube.z);
models.cube.name =`SCENE1`;
models.sphere.position.set(modelsParameters.sphere.x, modelsParameters.sphere.y, modelsParameters.sphere.z);
models.cylinder.position.set(modelsParameters.cylinder.x, modelsParameters.cylinder.y, modelsParameters.cylinder.z);
models.torusKnot.position.set(modelsParameters.torusKnot.x, modelsParameters.torusKnot.y, modelsParameters.torusKnot.z);
models.floor.rotateX( - Math.PI / 2 );
models.floor.position.set(modelsParameters.floor.x, modelsParameters.floor.y, modelsParameters.floor.z)

//Environment
scene.background = new THREE.Color(0xffffff);
const lights = {
	ambient: new THREE.AmbientLight( 0x404040 ),
	directional: new THREE.DirectionalLight( 0xffffff, 0.8 ),
	hemisphere: new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 1),
};
lights.directional.position.set( 1, 1, 1 ).normalize();

//Player interractions and triggered scenes
const player = {
	ready: false,
	diaryHovered: false,
	diaryClicked: false,
	manualVisited: false, //to keep track of the instructions for new players
	version0ReadyToMove: false,
	version0FinishMove: false,
	version0Hovered: false,
	version0Clicked: false
}

const blenderModels = [];
const blenderModelsParameters = {
	version0: {
		x: 0,
		y: 0,
		z: 0
	}
}

let blenderMixer = [];
let clock = new THREE.Clock();
const blenderActions = [];
const version0Settings = {
	model: {
		x: -3, 
		y: -2,
		z: 0
	},
	modelTweenTo: {
		x: 5,
		y: 0,
		z: 0
	},
	text: {
		x: 40,
		y: 50,
		z: 0
	}
}
let version0Tweening = new TWEEN.Tween(version0Settings.model);
const version0 = {
	text: new Version0(version0Settings.text.x, version0Settings.text.y, version0Settings.model.z),
	model: models.uploaded[1],
}

const narrativeSettings = {
	reality: {
		x: 500,
		y: 0
	},
	simulation: {
		x: 500,
		y: 100
	}
}
const reality = {
	text: new Reality(narrativeSettings.reality.x, narrativeSettings.reality.y),
}

const simulation = {
	text: new Simulation(narrativeSettings.simulation.x, narrativeSettings.simulation.y),
	subtitleRandomText: undefined
}
//Mouse Interractions
const mouse = new THREE.Vector2();
let mouseAllowed = true;
let INTERSECTED = false;
let raycaster = new THREE.Raycaster();
//Key Interactions
// controls.target.set(models.cube.position.x, models.cube.position.y, models.cube.position.z);
//END OF OBJECTS SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PRELOAD SECTION
const loadManager = new THREE.LoadingManager();
const loaderGLTF = new GLTFLoader(loadManager);
//Using promise to load models
const loadAsync = url => {
	return new Promise(resolve => {
	 loaderGLTF.load(url, gltf => {
	   resolve(gltf)
	 })
	})
}
Promise.all([loadAsync('./assets/visuals/exteriorwalls.glb'), loadAsync('./assets/visuals/version0.glb'), loadAsync('./assets/visuals/scene1.glb'), loadAsync('./assets/visuals/scene2.glb'), loadAsync('./assets/visuals/scene3.glb'), loadAsync('./assets/visuals/scene4.glb'), loadAsync('./assets/visuals/diaries.glb')]).then(models => {
	let blenderMixerIndex = 0;
	for(let j =0; j<models.length; j++){
		blenderModels.push(models[j].scene);
		if (models[j].animations.length > 0) {
		blenderMixer.push(new THREE.AnimationMixer( models[j].scene ));
		blenderMixer[blenderMixerIndex].clipAction( models[j].animations[0]).play();
		blenderMixerIndex ++;
		}
        scene.add( blenderModels[j] ); //add the models to the scene
	}
	// camera.add( blenderModels[1]);
	blenderModels[1].position.set(version0Settings.model.x,version0Settings.model.y,version0Settings.model.z);
	blenderModels[1].rotateY( Math.PI/4);
});
// version0.model.rotateY(  Math.PI / 4 );
//Preload GUI
const loadingElem = document.querySelector('#loading');
const progressBarElem = loadingElem.querySelector('.progressbar');
loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
	const progress = itemsLoaded / itemsTotal;
	progressBarElem.style.transform = `scaleX(${progress})`; //move the progress bar as items load
  };
//END OF PRELOAD SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SETUP(ON LOAD) SECTION
//Instruction UI
const play = document.getElementById( 'playLogo' );
const captureZone = document.getElementById('captureZone');
play.addEventListener( 'click', function () {
	controls.lock();
} );

controls.addEventListener( 'lock', function () {
	play.style.display = 'none';
	mouseAllowed = false;
} );

controls.addEventListener( 'unlock', function () {
	play.style.display = 'flex';
	mouseAllowed = true;
} );

//On Load section
loadManager.onLoad = () => {
	//Disable UI For preload
	loadingElem.style.display = 'none';
	progressBarElem.style.display = 'none';

	//Set the boolean for text display true
	player.ready = true;
	//Add objects to the scene
	scene.add(...[lights.ambient, lights.directional, lights.hemisphere]);
	// scene.add(...[models.sphere, models.cube, models.cylinder, models.torusKnot]);
	scene.add( controls.getObject() );
};
//END OF ON LOAD SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DRAW SECTION
function draw() {
	render();
	requestAnimationFrame( draw );
	console.log(`Version0 speechstate: ${version0.text.speechState}; Reality speechstate: ${reality.text.speechState}; Simulation random number: ${simulation.text.randomNumber}`);
}
draw();

function render() {
	TWEEN.update();
	renderer.render( scene, camera );
	triggerNarrative();
	displayVersion0Text();
	displayRealitySimulationText();
	let delta = clock.getDelta();
  	for(let i=0; i<blenderMixer.length; i++){
    blenderMixer[i].update( delta );
  }
}

function displayVersion0Text() {
	if (player.ready === true) {
		version0.text.display();
	} else if (player.ready === false && reality.text.ready === false && simulation.text.ready === false){
		renderer.domElement.style.filter = `none`;
	}
}

function displayRealitySimulationText() {
	if (reality.text.ready === true) {
		reality.text.display();
		renderer.domElement.style.filter = `blur(10px)`;
	} else if (simulation.text.ready === true) {
		simulation.text.display();
		renderer.domElement.style.filter = `blur(10px)`;
	}
}

//Detect Scene distance based on the camera (player) location
function detectNarrative(x, y, z) {
	let placeB = new THREE.Vector3( x, y, z );
	return camera.position.distanceTo(placeB);
}

function triggerNarrative() {
	let dScene0 = detectNarrative(models.cube.position.x, models.cube.position.y, models.cube.position.z);
	let dScene1 = detectNarrative(models.sphere.position.x, models.sphere.position.y, models.sphere.position.z);
	let dScene2 = detectNarrative(models.cylinder.position.x, models.cylinder.position.y, models.cylinder.position.z);
	let dScene3 = detectNarrative(models.torusKnot.position.x, models.torusKnot.position.y, models.torusKnot.position.z);
	if ((dScene0 <= 7 || dScene1 <= 7 || dScene2 <= 7 || dScene3 <= 7) && player.manualVisited === false) {
		version0.text.speechState = 6;
		player.ready = true;
		player.version0ReadyToMove = true;
		controls.unlock();
	} else if (dScene0 <= 10 && player.manualVisited === true && player.diaryClicked === true) {
		version0.text.speechState = 1;
		reality.text.speechState = 0;
		simulation.text.speechState = 0;
		player.ready = true;
		player.version0ReadyToMove = true;
		controls.unlock();
	} else if (dScene1 <= 10 && player.manualVisited === true && player.diaryClicked === true) {
		version0.text.speechState = 2;
		reality.text.speechState = 1;
		simulation.text.speechState = 1;
		player.ready = true;
		player.version0ReadyToMove = true;
		controls.unlock();
	} else if (dScene2 <= 10 && player.manualVisited === true && player.diaryClicked === true) {
		version0.text.speechState = 3;
		reality.text.speechState = 2;
		simulation.text.speechState = 2;
		player.ready = true;
		player.version0ReadyToMove = true;
		controls.unlock();
	} else if (dScene3 <= 10 && player.manualVisited === true && player.diaryClicked === true) {
		version0.text.speechState = 4;
		reality.text.speechState = 3;
		simulation.text.speechState = 3;
		player.ready = true;
		player.version0ReadyToMove = true;
		controls.unlock();
	}
}
//END OF ON DRAW SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EVENT HANDLERS SECTION
//Tweenning for Version0
function moveVersion0(xpos=5, ypos=0, zpos=0, rpos=-Math.PI/2, time=2000) {
	//Update target position if needs to be changed
	version0Settings.modelTweenTo.x = xpos;
	version0Settings.modelTweenTo.y = ypos;
	version0Settings.modelTweenTo.z = zpos;
	//Change the position of the version0 model
	version0Tweening.to(version0Settings.modelTweenTo, time);
	version0Tweening.onUpdate(function(){
		blenderModels[1].position.set(version0Settings.model.x, version0Settings.model.y, version0Settings.model.z); 
	});
	//Choose the easing
	version0Tweening.easing(TWEEN.Easing.Back.InOut);
	version0Tweening.start();
	//Rotate the model to face the front
	blenderModels[1].rotateY(rpos);
}

function activateVersion0Guidance() {
	if (version0.text.speechState === 1) { //go to childhood scene
		moveVersion0(modelsParameters.cube.x, modelsParameters.cube.y, modelsParameters.cube.z, 0, 10000);
	} else if (version0.text.speechState === 2) { //go to teenage scene
		moveVersion0(modelsParameters.sphere.x, 0, modelsParameters.sphere.z +5, 0, 10000);
	} else if (version0.text.speechState === 3) { //go to young parent scene
		moveVersion0(modelsParameters.cylinder.x, 0, modelsParameters.cylinder.z +5, Math.PI, 10000);
	} else if (version0.text.speechState === 4) { //go to elderly scene
		moveVersion0(modelsParameters.torusKnot.x, 0, modelsParameters.torusKnot.z - 5, 0, 10000);
	} else if (version0.text.speechState === 5) {
		player.ready = true;
		controls.unlock();
	}
}

function onDocumentMouseMove( event ) {
	if (mouseAllowed) {
		event.preventDefault();
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		captureZone.style.top = `${mouse.y}px`;
		captureZone.style.left = `${mouse.x}px`;
		raycaster.setFromCamera( mouse, camera );
		const intersects = raycaster.intersectObjects( scene.children, true);
		if ( intersects.length > 0 ) { //if there is at least one intersected object
			//The following code comes from the three.js documentation at: https://github.com/mrdoob/three.js/blob/master/examples/webgl_camera_cinematic.html
			if ( INTERSECTED != intersects[ 0 ].object ) { 
				if ( INTERSECTED ) {INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );} //record the current colour
				INTERSECTED = intersects[ 0 ].object; //assign it to the pointed object
				//Check if the diary was hovered
				if(INTERSECTED.name === 'Cube148' || INTERSECTED.name === 'Cube147' || INTERSECTED.name === 'Cube146' || INTERSECTED.name === 'Cube145') {
					INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex(); ////record the current colour
					INTERSECTED.material.emissive.setHex( 0x0f0fff ); //blue emmissive
					//change cursor to pointer when hovered on the diary
					document.body.style.cursor = 'pointer';
					player.diaryHovered = true;
				} else if(INTERSECTED.name === 'Version0') { //Check if version 0 is hovered
					document.body.style.cursor = 'pointer';
					player.version0Hovered = true;
				}
				else { //when mouse leaves the diary object
					document.body.style.cursor = 'context-menu';
					player.diaryHovered = false;
					player.version0Hovered = false;
				}
			}
		} else {
			if ( INTERSECTED ) {INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );} //when not hovered anyore, set the colour back to the initial one
			INTERSECTED = null;
		}
	}
	//Move Version0 when new dialog boxes are triggered
	if (player.version0ReadyToMove === true && player.version0FinishMove === false) {
		moveVersion0(blenderModels[1].position.x, -1, blenderModels[1].position.z, 0, 2000);
		player.version0FinishMove = true; //need this to stop the tweening from repeating due to mouse moves
	} else if (player.version0ReadyToMove === false && player.version0FinishMove === true) {
		player.version0FinishMove = false; //reset boolean to allow new tweening
	}
}

function onDocumentMouseClick(event) {
	event.preventDefault();
	//check if diary is clicked on
	if (player.diaryHovered === true) {
		player.diaryClicked = true;
	} else if (player.diaryHovered === false) { //to prevent errors and bugs
		player.diaryClicked = false;
	}
	//check if Version 0 is clicked on
	if (player.version0Hovered === true) {
		player.version0Clicked = true;
		activateVersion0Guidance();
	} else if (player.version0Hovered === false) { 
		player.version0Clicked = false;
	}
}

function onDocumentKeyDown(event) {
	if (event.keyCode === 38 || event.keyCode === 87) { //if arrow up or "w" is pressed
		// modelsParameters.cube.z += -0.5;
		controls.moveForward(0.1);
	} else if (event.keyCode === 40 || event.keyCode === 83) { //if arrow down or "s" is pressed
		// modelsParameters.cube.z += 0.5;
		controls.moveForward(-0.1);
	} else if (event.keyCode === 37 || event.keyCode === 65) { //if arrow left or "a" is pressed
		// modelsParameters.cube.x += -0.5;
		controls.moveRight(-0.1);
	} else if (event.keyCode === 39 || event.keyCode === 68) { //if arrow right or "d" is pressed
		// modelsParameters.cube.x += 0.5;
		controls.moveRight(0.1);
	}
}

function onDocumentKeyUp() {

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onVersion0ButtonClick() {
	player.ready = false;
	player.version0ReadyToMove = false;
	version0.text.container.style.display = 'none';
	//Set a random number for simulation texts
	simulation.text.getRandomContent();
	//Switch between states of version 0
	if (version0.text.speechState !== 6) {
		version0.text.speechState +=1;
	} else if (version0.text.speechState === 6) {
		player.manualVisited = true;
		version0.text.speechState = 1;
	} 
	//Trigger simulation if the button is clicked
	if (version0.text.speechState >= 2 && player.manualVisited === true && simulation.text.finished === false) {
		simulation.text.ready = true;
	}
	moveVersion0(blenderModels[1].position.x, 0, blenderModels[1].position.z, 0, 2000);
}

function onVersion0Button1Click() {
	player.ready = false;
	player.version0ReadyToMove = false;
	version0.text.container.style.display = 'none';
	reality.text.ready = true;
	version0.text.speechState +=1;
	moveVersion0(blenderModels[1].position.x, 0, blenderModels[1].position.z, 0, 2000);
}

function onMenuMouseClick(element) {
	this.style.display = 'none';
	document.getElementById('instructions').style.display = 'flex';
	document.getElementById('closeLogo').style.display = 'flex';
	document.getElementById('closeLogo').style.right = '0em';
}

function onMenuCloseMouseClick(element) {
	this.style.display = 'none';
	document.getElementById('instructions').style.display = 'none';
	document.getElementById('attributions').style.display = 'none';
	document.getElementById('about').style.display = 'none';
	document.getElementById('menuLogo').style.display = 'flex';
	document.getElementById('attributionLogo').style.display = 'flex';
	document.getElementById('aboutLogo').style.display = 'flex';
}

function onAttributionMouseClick(element) {
	this.style.display = 'none';
	document.getElementById('attributions').style.display = 'block';
	document.getElementById('closeLogo').style.display = 'flex';
	document.getElementById('closeLogo').style.right = '4em';
}

function onAboutMouseClick(element) {
	this.style.display = 'none';
	document.getElementById('about').style.display = 'flex';
	document.getElementById('closeLogo').style.display = 'flex';
	document.getElementById('closeLogo').style.right = '6em';
}

function onRealityMouseClick() {
	reality.text.ready = false;
	reality.text.container.style.display = 'none';
	if (reality.text.speechState === 3) {
		reality.text.finished = true;
	}
}

function onSimulationChoice0MouseClick() {
	simulation.text.decision0Made = true;
}

function onSimulationChoice1MouseClick() {
	simulation.text.decision1Made = true;
}

function onSimulationEndMouseClick() {
	simulation.text.ready = false;
	simulation.text.decision0Made = false;
	simulation.text.decision1Made = false;
	simulation.text.container.style.display = 'none';
	if (simulation.text.speechState === 3) {
		simulation.text.finished = true;
	}
}
document.addEventListener( 'mousemove', onDocumentMouseMove );
document.addEventListener( 'click', onDocumentMouseClick );
document.addEventListener( 'keydown', onDocumentKeyDown);
document.addEventListener( 'keyup', onDocumentKeyUp);
window.addEventListener( 'resize', onWindowResize, false );
//Interractive narratives
document.getElementById('version0Button').addEventListener('click', onVersion0ButtonClick);
document.getElementById('version0Button1').addEventListener('click', onVersion0Button1Click);
document.getElementById('menuLogo').addEventListener('click', onMenuMouseClick);
document.getElementById('closeLogo').addEventListener('click', onMenuCloseMouseClick);
document.getElementById('attributionLogo').addEventListener('click', onAttributionMouseClick);
document.getElementById('aboutLogo').addEventListener('click', onAboutMouseClick);
document.getElementById('realityButton').addEventListener('click', onRealityMouseClick);
document.getElementById('simulationP0Button').addEventListener('click', onSimulationChoice0MouseClick);
document.getElementById('simulationP1Button').addEventListener('click', onSimulationChoice1MouseClick);
document.getElementById('simulationEndingButton').addEventListener('click', onSimulationEndMouseClick);
//END OF EVENT HANDLERS SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// export default main;