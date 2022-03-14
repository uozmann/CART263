//https://threejs.org/docs/#manual/en/introduction/Installation

import * as THREE from '../../threeJS/src/Three.js';
import { OrbitControls } from '../../threeJS/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../../threeJS/examples/jsm/loaders/GLTFLoader.js';
import Stat from '../../threeJS/examples/jsm/libs/stats.module.js';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//OBJECTS SECTION
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );

//assets
const materials = [
	//   new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-1.jpg')}),
	//   new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-2.jpg')}),
	//   new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-3.jpg')}),
	//   new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-4.jpg')}),
	//   new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-5.jpg')}),
	//   new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-6.jpg')}),
	];
const modelsSettings = {
	cube: {
		geometry: new THREE.BoxGeometry(),
		material: new THREE.MeshPhongMaterial( { color: 0x00ff00 } ),
	},
	sphere: {
		geometry: new THREE.SphereGeometry( 15, 32, 16 ),
		material: new THREE.MeshPhongMaterial( { color: 0x00ff00 } ),
	}
};
const models = {
	cube:  new THREE.Mesh( modelsSettings.cube.geometry, modelsSettings.cube.material),
	sphere: new THREE.Mesh( modelsSettings.sphere.geometry, modelsSettings.sphere.material )
};

//Encironment
scene.background = new THREE.Color( 0xFFC107);
const lights = {
	ambient: new THREE.AmbientLight( 0x404040 ),
	directional: new THREE.DirectionalLight( 0xffffff, 1 )
};
lights.directional.position.set( 1, 1, 1 ).normalize();
//END OF OBJECTS SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PRELOAD SECTION
const loadManager = new THREE.LoadingManager();
const loaderTexture = new THREE.TextureLoader(loadManager);
const loaderGLTF = new GLTFLoader(loadManager);

loaderGLTF.load( './assets/visuals/headonly.glb', function ( gltf ) { 

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

//Preload GUI
const loadingElem = document.querySelector('#loading');
const progressBarElem = loadingElem.querySelector('.progressbar');
loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
	const progress = itemsLoaded / itemsTotal;
	progressBarElem.style.transform = `scaleX(${progress})`;
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
	scene.add(...[lights.ambient, lights.directional]);
	scene.add(models.cube);
	
};
//END OF ON LOAD SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DRAW SECTION
function draw() {
	requestAnimationFrame( draw );
	renderer.render( scene, camera );
}
draw();
//END OF ON DRAW SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EVENT HANDLERS SECTION

//END OF EVENT HANDLERS SECTION
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

