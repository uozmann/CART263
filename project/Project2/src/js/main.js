//https://threejs.org/docs/#manual/en/introduction/Installation
"use strict"

import * as THREE from '../../threeJS/src/Three.js';
import { CSS3DRenderer, CSS3DObject, CSS3DSprite } from '../../threeJS/examples/jsm/renderers/CSS3DRenderer.js';
import { PointerLockControls } from '../../threeJS/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from '../../threeJS/examples/jsm/loaders/GLTFLoader.js';
import stats from '../../threeJS/examples/jsm/libs/stats.module.js';
import { GUI } from '../../threeJS/examples/jsm/libs/lil-gui.module.min.js';
import { TWEEN } from '../../threeJS/examples/jsm/libs/tween.module.min.js'; 
import { mapLinear } from '../../threeJS/src/math/MathUtils.js';

//class
import Version0 from './Version0.js';
import Reality from './RealityContent.js';
import UploadedModels from './UploadedModels.js';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//OBJECTS SECTION
//General settings
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
//Default webgl renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild( renderer.domElement );
//Special renderer for css elements

//Controls
const controls = new PointerLockControls( camera, document.body );
controls.enableDamping = true;
// controls.listenToKeyEvents( window );


//assets
let modelsParameters = {
	cube: {
		x: -15,
		y: -1,
		z: 5
	},
	sphere: {
		radius: 0.5,
		x: -15,
		y: -1,
		z: -25

	},
	cylinder: {
		radius: 0.5,
		height: 1,
		x: 15,
		y: -1,
		z: -25
	},
	torusKnot : {
		x: 15,
		y: -1,
		z: 5
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
	directional: new THREE.DirectionalLight( 0xffffff, 1 ),
	hemisphere: new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 1),
};
lights.directional.position.set( 1, 1, 1 ).normalize();

//Player interractions and triggered scenes
const player = {
	ready: false
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
const blenderActions = [];
const version0Settings = {
	model: {
		x: camera.position.x, 
		y: camera.position.y,
		z: camera.position.z -5
	},
	text: {
		x: 30,
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
		y: 0,
	}
}
const reality = {
	text: new Reality(narrativeSettings.reality.x, narrativeSettings.reality.y),
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
	for(let j =0; j<models.length; j++){
		blenderModels.push(models[j].scene);
		// blenderMixer.push(new THREE.AnimationMixer( blenderModels[j].scene ));
		// let action = blenderMixer[j].clipAction( blenderModels[j].animations[j] );
		// action.play();
        scene.add( blenderModels[j] ); //add the models to the scene
		// camera.add( blenderModels[1]);
	}
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
	// scene.add(...[models.floor]);
	scene.add(...[models.sphere, models.cube, models.cylinder, models.torusKnot, models.floor]);
	// scene.add(...models.clockHours);
	scene.add( controls.getObject() );
	console.log(blenderModels);
	
	// camera.add(version0.model);
	// version0.model.position.set(version0Settings.model.x, version0Settings.model.y, version0Settings.model.z);

};
//END OF ON LOAD SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DRAW SECTION
function draw() {
	render();
	requestAnimationFrame( draw );
}
draw();

function render() {
	TWEEN.update();
	renderer.render( scene, camera );
	triggerNarrative();
	displayVersion0Text();
	displayRealityText();
}

function displayVersion0Text() {
	if (player.ready === true) {
		version0.text.display();
		renderer.domElement.style.filter = `blur(10px)`;
	} else if (player.ready === false && reality.text.ready === false){
		renderer.domElement.style.filter = `none`;
	}
}

function displayRealityText() {
	if (reality.text.ready === true) {
		reality.text.display();
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
	if (dScene0 <= 2 && version0.text.speechState !==2) {
		player.ready = true;
		controls.unlock();
		// version0Tweening.to({x: models.cube.position.x, y: models.cube.position.y, z: models.cube.position.z +5}, 1000);
		// // prepare the tweening for the camera
		// version0Tweening.onUpdate(function() {
		// 	blenderModels[1].position.x = version0Tweening.x; 
		// 	blenderModels[1].position.y = version0Tweening.y;
		// 	blenderModels[1].position.z = version0Tweening.z; 
		// }
		// );
	camera.updateMatrixWorld();
	version0Tweening.start();
	} else if (dScene1 <= 2 && version0.text.speechState !==3) {
		player.ready = true;
		controls.unlock();
	} else if (dScene2 <= 2 && version0.text.speechState !==4) {
		player.ready = true;
		controls.unlock();
	} else if (dScene3 <= 2 && version0.text.speechState !==5) {
		player.ready = true;
		controls.unlock();
	}
}
// find intersections
function moveMascot() {
	
}
//END OF ON DRAW SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EVENT HANDLERS SECTION
//Check mouse actions
function moveCamera() {
	// camera.lookAt( models.clockHours[models.currentClockHour].position ); //look at current clock position
	// camera.position.set(models.clockHours[models.currentClockHour].position.x, models.clockHours[models.currentClockHour].position.y, camera.position.z);
	camera.updateMatrixWorld();
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
				if(INTERSECTED.name === models.cube.name) {
					INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex(); ////record the current colour
					INTERSECTED.material.emissive.setHex( 0xffffff ); //red emmissive
					//Move the camera angle
					models.currentClockHour = intersects[0].object.name;
				}
				
				
			}
		} else {
			if ( INTERSECTED ) {INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );} //when not hovered anyore, set the colour back to the initial one
			INTERSECTED = null;
		}
		
	}
}

function onDocumentMouseClick(event) {
	event.preventDefault();
	// tweening.to({x: models.clockHours[models.currentClockHour].position.x, y: models.clockHours[models.currentClockHour].position.y, z: models.clockHours[models.currentClockHour].position.z +5}, 1000);
	// // prepare the tweening for the camera
	// tweening.onUpdate(() =>
	// camera.position.set(cameraTweening.x, cameraTweening.y, cameraTweening.z)
  	// );
	// camera.updateMatrixWorld();
	// tweening.start();
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
	blenderModels[1].position.set(camera.position.x + 5, camera.position.y, camera.position.z -5);
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
	version0.text.container.style.display = 'none';
	if (version0.text.speechState === 0) {
		version0.text.speechState +=1;
	} else if (version0.text.speechState === 1) {
		version0.text.speechState =2;
	} else if (version0.text.speechState === 2) {
		version0.text.speechState =3;
	} else if (version0.text.speechState === 3) {
		version0.text.speechState =4;
	} else if (version0.text.speechState === 4) {
		version0.text.speechState =5;
	}
}

function onVersion0Button1Click() {
	player.ready = false;
	version0.text.container.style.display = 'none';
	if (version0.text.speechState === 1) {
		version0.text.speechState =2;
	} else if (version0.text.speechState === 2) {
		version0.text.speechState =3;
	} else if (version0.text.speechState === 3) {
		version0.text.speechState =4;
	} else if (version0.text.speechState === 4) {
		version0.text.speechState =5;
	}
	reality.text.ready = true;
}

function onMenuMouseClick(element) {
	this.style.display = 'none';
	document.getElementById('instructions').style.display = 'flex';
	document.getElementById('menuLogoClose').style.display = 'flex';
}

function onMenuCloseMouseClick(element) {
	this.style.display = 'none';
	document.getElementById('instructions').style.display = 'none';
	document.getElementById('menuLogo').style.display = 'flex';
}

function onRealityMouseClick() {
	reality.text.ready = false;
	reality.text.container.style.display = 'none';
	if (reality.text.speechState === 0) {
		reality.text.speechState = 1;
	} else if (reality.text.speechState === 1) {
		reality.text.speechState = 2;
	} else if (reality.text.speechState === 2) {
		reality.text.speechState = 3;
	} else if (reality.text.speechState === 3) {
		reality.text.speechState = 4;
	} else if (reality.text.speechState === 4) {
		reality.text.speechState = 5;
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
document.getElementById('menuLogoClose').addEventListener('click', onMenuCloseMouseClick);
document.getElementById('realityButton').addEventListener('click', onRealityMouseClick);
//END OF EVENT HANDLERS SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

