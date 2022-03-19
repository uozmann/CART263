//https://threejs.org/docs/#manual/en/introduction/Installation

import * as THREE from '../../threeJS/src/Three.js';
import { OrbitControls } from '../../threeJS/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../../threeJS/examples/jsm/loaders/GLTFLoader.js';
import stats from '../../threeJS/examples/jsm/libs/stats.module.js';
import { GUI } from '../../threeJS/examples/jsm/libs/lil-gui.module.min.js';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//OBJECTS SECTION
//General settings
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
let cameraTweening = {
	x: camera.position.x,
	y: camera.position.y,
}
const tweening = new TWEEN.Tween(cameraTweening);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );

//assets
const modelsToLoad = [
	{body: './assets/visuals/headonly.glb'},
	{head: './assets/visuals/body.glb'}
	];
const modelsSettings = { //basic settings before creating the object
	cube: {
		geometry: new THREE.BoxGeometry(),
		material: new THREE.MeshPhongMaterial( { color: 0xff00ff } ),
	},
	sphere: {
		geometry: new THREE.SphereGeometry( .5, 16, 8 ),
		material: undefined,
	},
	cylinder: {
		geometry: new THREE.CylinderGeometry( 5, 5, .1, 32 ),
		material: new THREE.MeshPhongMaterial( {color: 0xffff00} ),
	}
};
const models = { //creating the object
	cube:  new THREE.Mesh( modelsSettings.cube.geometry, modelsSettings.cube.material),
	sphere: undefined,
	cylinder: new THREE.Mesh( modelsSettings.cylinder.geometry, modelsSettings.cylinder.material ),
	clockHours: [],
	currentClockHour: 0,
};
models.cylinder.rotateX(1.571); //Transformation applied to the models
models.cylinder.position.set(0,0,-1);
models.cube.position.set(-1,4,0);
for (let i = 0; i < 12; i++) {
	let angle = i/2 + 2;
	let x = Math.cos(angle) * 4;
	let y = Math.sin(angle) * 4;
	// let z = Math.sin(angle+= 1);
	models.sphere = new THREE.Mesh( modelsSettings.sphere.geometry,  new THREE.MeshPhongMaterial( { color: 0x00ffff } ));
	models.sphere.position.set(x, y, 0);
	models.sphere.name = i;
	models.clockHours.push(models.sphere);
	// prepare the tweening for the camera
	tweening.to({ x: models.clockHours[models.currentClockHour].position.x, y: models.clockHours[models.currentClockHour].position.y }, 1000);
	tweening.onUpdate(() =>
	camera.position.set(cameraTweening.x, cameraTweening.y, camera.position.z)
  	);
	tweening.start();
}

//Environment
scene.background = new THREE.Color( 0xFFC107);
const lights = {
	ambient: new THREE.AmbientLight( 0x404040 ),
	directional: new THREE.DirectionalLight( 0xffffff, 1 ),
	hemisphere: new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 1),
};
lights.directional.position.set( 1, 1, 1 ).normalize();

//Mouse Interractions
const mouse = new THREE.Vector2();
let INTERSECTED;
let raycaster = new THREE.Raycaster();
//END OF OBJECTS SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PRELOAD SECTION
const loadManager = new THREE.LoadingManager();
const loaderTexture = new THREE.TextureLoader(loadManager);
const loaderGLTF = new GLTFLoader(loadManager);

const loadAsync = url => {
	return new Promise(resolve => {
	 loaderGLTF.load(url, gltf => {
	   resolve(gltf)
	 })
	})
}
Promise.all([loadAsync('./assets/visuals/body.glb'), loadAsync('./assets/visuals/body.glb')]).then(models => {
	for(let j =0; j<models.length; j++){
		// myModels.push(new TestModel( models[j].scene,0,j,0))
		scene.add( models[j].scene );
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
loadManager.onLoad = () => {
	//Disable UI For preload
	loadingElem.style.display = 'none';
	progressBarElem.style.display = 'none';

	//Add objects to the scene
	scene.add(...[lights.ambient, lights.directional, lights.hemisphere]);
	scene.add(...[models.sphere, models.cylinder, models.cube]);
	scene.add(...models.clockHours);
	
};
//END OF ON LOAD SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DRAW SECTION
function draw() {
	render();
	requestAnimationFrame( draw );
	console.log(camera.position.x, camera.position.y, camera.position.z);
}
draw();

function render() {
	TWEEN.update()
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
	// console.log(models.clockHours[models.currentClockHour].position.x, models.clockHours[models.currentClockHour].position.y);
	camera.updateMatrixWorld();
}

function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	

	raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects( scene.children, false );
	// console.log(intersects.length);
	if ( intersects.length > 0 ) { //if there is at least one intersected object
		//The following code comes from the three.js documentation at: https://github.com/mrdoob/three.js/blob/master/examples/webgl_camera_cinematic.html
		if ( INTERSECTED != intersects[ 0 ].object ) {
			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.emissive.setHex( 0xff0000 ); //red emmissive
			//Move the camera angle
			models.currentClockHour = intersects[0].object.name;
		}
	} else {
		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
		INTERSECTED = null;
	}
	// // Another easier way to calculate the intersection
	// const intersects = raycaster.intersectObjects( scene.children );

	// for ( let i = 0; i < intersects.length; i ++ ) {
	// 	console.log(intersects.length);
	// 	intersects[ i ].object.material.color.set( 0xffffff );

	// }
	moveCamera();
}

function onDocumentMouseClick(event) {
	event.preventDefault();
	tweening.to({x: models.clockHours[models.currentClockHour].position.x, y: models.clockHours[models.currentClockHour].position.y}, 1000);
	tweening.start();
}

document.addEventListener( 'mousemove', onDocumentMouseMove );
document.addEventListener( 'click', onDocumentMouseClick );
//END OF EVENT HANDLERS SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

