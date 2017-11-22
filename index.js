import * as THREE from 'three';
import 'three/examples/js/controls/EditorControls';
import MatcapMaterial, { load } from './src/MatcapMaterial.js';
import OutlinePass from './src/OutlinePass.js';

document.body.style.margin = 0;
document.body.style.padding = 0;
document.body.style.height = '100%';
document.body.style.backgroundColor = 'slategrey';
document.documentElement.style.height = '100%';
document.documentElement.style.overflow = 'hidden';
document.getElementById('app').style.height = '100%';

// creater renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
renderer.setClearColor(0xffffff, 0.0);
document.getElementById('app').appendChild(renderer.domElement);

// create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 1, 1000);
camera.position.z = 100;
camera.lookAt(new THREE.Vector3(0, 0, 0));

const torusKnotGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const torusKnotMaterial = new MatcapMaterial({ color: new THREE.Color(0x92c8ef), opacity: 1.0 });
torusKnotMaterial.transparent = true;
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
scene.add(torusKnotMesh);
torusKnotMesh.position.set(-45, 0, 0);

const torusGeometry = new THREE.TorusGeometry(10, 3, 100, 16);
const torusMaterial = new MatcapMaterial({ color: new THREE.Color(0x99cc81), opacity: 0.2 });
torusMaterial.transparent = true;
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torusMesh);
torusMesh.position.set(-15, 0, 0);

const boxGeometry = new THREE.BoxGeometry(20, 20, 20);
const boxMaterial = new MatcapMaterial({ color: new THREE.Color(0xf28bb1), opacity: 1.0 });
boxMaterial.transparent = true;
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);
boxMesh.position.set(15, 0, 0);

const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 20, 32);
const cylinderMaterial = new MatcapMaterial({ color: new THREE.Color(0xebea7f), opacity: 0.8 });
cylinderMaterial.transparent = true;
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
scene.add(cylinderMesh);
cylinderMesh.position.set(45, 0, 0);

// setup composer
const composer = new THREE.EffectComposer(renderer);

const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

const outlinePass = new OutlinePass(scene, camera);
outlinePass.renderToScreen = true;
composer.addPass(outlinePass);

function render() {
  composer.render();
}

// setup controls
const editorControls = new THREE.EditorControls(camera, renderer.domElement);
editorControls.addEventListener('change', render);

// render first frame
load.then(render);

// set size
function updateSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  composer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  render();
}
updateSize();
window.addEventListener('resize', updateSize);
