//https://threejs.org/docs/#manual/en/introduction/Installation

import * as THREE from '../../threeJS/src/Three.js';
// import { OrbitControls } from '../../threeJS/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from '../../threeJS/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from '../../threeJS/examples/jsm/loaders/GLTFLoader.js';
import stats from '../../threeJS/examples/jsm/libs/stats.module.js';
import { GUI } from '../../threeJS/examples/jsm/libs/lil-gui.module.min.js';
import { TWEEN } from '../../threeJS/examples/jsm/libs/tween.module.min.js'; 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//OBJECTS SECTION
//General settings
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
// let cameraTweening = {
// 	x: camera.position.x,
// 	y: camera.position.y,
// 	z: camera.position.z,
// }
// const tweening = new TWEEN.Tween(cameraTweening);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new PointerLockControls( camera, document.body );
controls.enableDamping = true;
// controls.listenToKeyEvents( window );


//assets
let modelsParameters = {
	cube: {
		x: 0,
		y: 0,
		z: 0
	},
	sphere: {
		radius: 0.5
	},
	cylinder: {
		radius: 5,
		height: 0.1,
		x: 0,
		y: -0.5,
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
		material: undefined,
	},
	cylinder: {
		radius: 5,
		geometry: new THREE.CylinderGeometry( modelsParameters.cylinder.radius, modelsParameters.cylinder.radius, modelsParameters.cylinder.height, 32 ),
		material: new THREE.MeshPhongMaterial( {color: 0xffff00} ),
	},
	plane: {
		geometry: new THREE.PlaneGeometry( 1, 1 ),
		material: new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} ),
	}
};
const models = { //creating the object
	cube:  new THREE.Mesh( modelsSettings.cube.geometry, modelsSettings.cube.material),
	sphere: undefined,
	cylinder: new THREE.Mesh( modelsSettings.cylinder.geometry, modelsSettings.cylinder.material ),
	clockHours: [],
	currentClockHour: 0,
	plane: new THREE.Mesh( modelsSettings.plane.geometry, modelsSettings.plane.material ),
};
// models.cylinder.rotateX(1.571); //Transformation applied to the models
models.cylinder.position.set(modelsParameters.cylinder.x, modelsParameters.cylinder.y, modelsParameters.cylinder.z);
models.cube.position.set(modelsParameters.cube.x, modelsParameters.cube.y, modelsParameters.cube.z);
for (let i = 0; i < 4; i++) {
	let angle = i;
	let x = Math.cos(angle) * modelsParameters.cylinder.radius;
	let z = Math.sin(angle) * modelsParameters.cylinder.radius;
	// let z = Math.sin(angle+= 1);
	models.sphere = new THREE.Mesh( modelsSettings.sphere.geometry,  new THREE.MeshPhongMaterial( { color: 0x00ffff } ));
	models.sphere.position.set(x, 0, z);
	models.sphere.name = i;
	models.clockHours.push(models.sphere);
}

//Environment
scene.background = new THREE.Color( 0xFFC107);
const lights = {
	ambient: new THREE.AmbientLight( 0x404040 ),
	directional: new THREE.DirectionalLight( 0xffffff, 1 ),
	hemisphere: new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 1),
};
lights.directional.position.set( 1, 1, 1 ).normalize();

//Player
const player = {
	velocity: new THREE.Vector3(0.01,0,1),
	direction: new THREE.Vector3(),
	previousTime: performance.now(),
	currentTime: undefined,
	timeDelta: undefined,
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
const loaderTexture = new THREE.TextureLoader(loadManager);
const loaderGLTF = new GLTFLoader(loadManager);
//Using promise to load models
const loadAsync = url => {
	return new Promise(resolve => {
	 loaderGLTF.load(url, gltf => {
	   resolve(gltf)
	 })
	})
}
Promise.all([loadAsync('./assets/visuals/body.glb'), loadAsync('./assets/visuals/headonly.glb')]).then(models => {
	for(let j =0; j<models.length; j++){
		scene.add( models[j].scene );//add the models to the scene
		models[j].name = `Human ${j}`;
	}
});

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
const instructions = document.getElementById( 'instructions' );
const captureZone = document.getElementById('captureZone');
instructions.addEventListener( 'click', function () {
	controls.lock();
} );

controls.addEventListener( 'lock', function () {
	instructions.style.display = 'none';
	mouseAllowed = false;
} );

controls.addEventListener( 'unlock', function () {
	instructions.style.display = 'flex';
	mouseAllowed = true;
} );

//On Load section
loadManager.onLoad = () => {
	//Disable UI For preload
	loadingElem.style.display = 'none';
	progressBarElem.style.display = 'none';

	//Add objects to the scene
	scene.add(...[lights.ambient, lights.directional, lights.hemisphere]);
	scene.add(...[models.sphere, models.cylinder, models.cube, models.plane]);
	scene.add(...models.clockHours);
	scene.add( controls.getObject() );
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
	// TWEEN.update()
	renderer.render( scene, camera );
	
}

// find intersections
function findIntersection() {
	

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
	// if (mouseAllowed) {
	// 	event.preventDefault();
	// 	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	// 	captureZone.style.top = `${mouse.y}px`;
	// 	captureZone.style.left = `${mouse.x}px`;
	// 	raycaster.setFromCamera( mouse, camera );
	// 	const intersects = raycaster.intersectObjects( scene.children, true );
	// 	if ( intersects.length > 0 ) { //if there is at least one intersected object
	// 		//The following code comes from the three.js documentation at: https://github.com/mrdoob/three.js/blob/master/examples/webgl_camera_cinematic.html
	// 		console.log(intersects.length);
	// 		if ( INTERSECTED != intersects[ 0 ].object ) { 
	// 			if ( INTERSECTED ) {INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );} //record the current colour
	// 			INTERSECTED = intersects[ 0 ].object; //assign it to the pointed object
	// 			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex(); ////record the current colour
	// 			INTERSECTED.material.emissive.setHex( 0xffffff ); //red emmissive
	// 			//Move the camera angle
	// 			models.currentClockHour = intersects[0].object.name;
				
	// 		}
	// 	} else {
	// 		if ( INTERSECTED ) {INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );} //when not hovered anyore, set the colour back to the initial one
	// 		INTERSECTED = null;
	// 	}
		
	// }
	
	//NEW CODE by myself derived from the example code of THREE.JS at line 227-241
	if (mouseAllowed) { //To prevent errors when pointer locked
		event.preventDefault();
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		captureZone.style.top = `${mouse.y}px`; //currently nothing. Capture zome is an html div element that I want to display when the mouse is locked.
		captureZone.style.left = `${mouse.x}px`;

		raycaster.setFromCamera( mouse, camera );
		const intersects = raycaster.intersectObjects( scene.children, true );
		let firstIntersectedObj = intersects[0].object;
		if (intersects.length > 0) {
			firstIntersectedObj.currentHex = firstIntersectedObj.material.emissive.getHex();
			if (firstIntersectedObj.currentHex !== 0xffffff) {
				firstIntersectedObj.material.emissive.setHex( 0xffffff ); //white emissive
			}
		} else {
			if (firstIntersectedObj) {
				firstIntersectedObj.material.emissive.setHex(firstIntersectedObj.currentHex);
			}
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
	// models.cube.position.set(modelsParameters.cube.x, modelsParameters.cube.y, modelsParameters.cube.z);
}

function onDocumentKeyUp() {

}

document.addEventListener( 'mousemove', onDocumentMouseMove );
document.addEventListener( 'click', onDocumentMouseClick );
document.addEventListener( 'keydown', onDocumentKeyDown);
document.addEventListener( 'keyup', onDocumentKeyUp);
//END OF EVENT HANDLERS SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////