//https://threejs.org/docs/#manual/en/introduction/Installation

import * as THREE from '../../threeJS/src/Three.js';
import { OrbitControls } from '../../threeJS/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../../threeJS/examples/jsm/loaders/GLTFLoader.js';
import Stat from '../../threeJS/examples/jsm/libs/stats.module.js';

//basic settings
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );

//background and light
// scene.background = new THREE.Color( 0xFFC107);
const lightAmbient = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( lightAmbient );
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 1, 1, 1 ).normalize();
scene.add( light );

//cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//point
const materialLine = new THREE.LineBasicMaterial( { color: 0x901F07 } );
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometryLine = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometryLine, materialLine );
scene.add( line );

//head sculpture
const loader = new GLTFLoader();

loader.load( './assets/visuals/headonly.glb', function ( gltf ) { 

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();




