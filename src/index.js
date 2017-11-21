import * as THREE from 'three';
import 'three/examples/js/controls/EditorControls';
import 'three/examples/js/postprocessing/EffectComposer.js';
import 'three/examples/js/postprocessing/RenderPass.js';
import 'three/examples/js/postprocessing/ShaderPass.js';
import 'three/examples/js/shaders/CopyShader.js';
import MatcapMaterial from 'src/MatcapMaterial.js';
import normalDepthVert from 'src/shaders/normal_depth_vert.glsl';
import normalDepthFrag from 'src/shaders/normal_depth_frag.glsl';
import edgeVert from 'src/shaders/edge_vert.glsl';
import edgeFrag from 'src/shaders/edge_frag.glsl';
import combineVert from 'src/shaders/combine_vert.glsl';
import combineFrag from 'src/shaders/combine_frag.glsl';

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

// create composers
const composer = new THREE.EffectComposer(renderer);
const edgeRenderTarget = new THREE.WebGLRenderTarget(WIDTH, HEIGHT);
const edgeComposer = new THREE.EffectComposer(renderer, edgeRenderTarget);

function render() {
  edgeComposer.render();
  composer.render();
}

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

const editorControls = new THREE.EditorControls(camera, renderer.domElement);
editorControls.addEventListener('change', render);

const normalDepthPass = new THREE.RenderPass(scene, camera, new THREE.ShaderMaterial({
  vertexShader: normalDepthVert,
  fragmentShader: normalDepthFrag
}));
edgeComposer.addPass(normalDepthPass);

const edgePass = new THREE.ShaderPass({
  uniforms: {
    "tDiffuse": { type: 't', value: null },
    "resolution": { type: 'v2', value: new THREE.Vector2(WIDTH, HEIGHT) }
  },
  vertexShader: edgeVert,
  fragmentShader: edgeFrag
});
edgeComposer.addPass(edgePass);
edgeComposer.addPass(new THREE.ShaderPass(THREE.CopyShader));

composer.addPass(new THREE.RenderPass(scene, camera));

const combinePass = new THREE.ShaderPass({
  uniforms: {
    "tDiffuse": { type: 't', value: null },
    "tEdge": { type: 't', value: null }
  },
  vertexShader: combineVert,
  fragmentShader: combineFrag
});
combinePass.uniforms.tEdge.value = edgeRenderTarget.texture;
combinePass.renderToScreen = true;
composer.addPass(combinePass);

render();
