import * as THREE from 'three';
import 'three/examples/js/controls/EditorControls';
import MatcapMaterial from 'src/MatcapMaterial.js';
import OutlinePass from 'src/OutlinePass.js';

document.body.style.margin = 0;
document.body.style.padding = 0;
document.body.style.height = '100%';
document.documentElement.style.height = '100%';
document.documentElement.style.overflow = 'hidden';

document.getElementById('app').style.height = '100%';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// creater renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
renderer.setClearColor(0xffffff, 0.0);
renderer.setSize(WIDTH, HEIGHT);
document.getElementById('app').appendChild(renderer.domElement);

// create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, .1, 1000);
camera.position.z = 100;
camera.lookAt(new THREE.Vector3(0, 0, 0));

const torusKnotGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const torusKnotMeshmesh = new THREE.Mesh(torusKnotGeometry, new MatcapMaterial({ color: new THREE.Color(0x92c8ef) }));
scene.add(torusKnotMeshmesh);
torusKnotMeshmesh.position.set(-45, 0, 0);

const torusGeometry = new THREE.TorusGeometry(10, 3, 100, 16);
const torusMeshmesh = new THREE.Mesh(torusGeometry, new MatcapMaterial({ color: new THREE.Color(0x99cc81) }));
scene.add(torusMeshmesh);
torusMeshmesh.position.set(-15, 0, 0);

const boxGeometry = new THREE.BoxGeometry(20, 20, 20);
const boxMeshmesh = new THREE.Mesh(boxGeometry, new MatcapMaterial({ color: new THREE.Color(0xf28bb1) }));
scene.add(boxMeshmesh);
boxMeshmesh.position.set(15, 0, 0);

const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 20, 32);
const cylinderMeshmesh = new THREE.Mesh(cylinderGeometry, new MatcapMaterial({ color: new THREE.Color(0xebea7f) }));
scene.add(cylinderMeshmesh);
cylinderMeshmesh.position.set(45, 0, 0);

const composer = new THREE.EffectComposer(renderer);

const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

const outlinePass = new OutlinePass(scene, camera);
outlinePass.renderToScreen = true;
composer.addPass(outlinePass);

function render() {
  composer.render();
}

const editorControls = new THREE.EditorControls(camera, renderer.domElement);
editorControls.addEventListener('change', render);

render();
