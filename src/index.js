import * as THREE from 'three';
import 'three/examples/js/controls/EditorControls';
import 'three/examples/js/postprocessing/EffectComposer.js';
import 'three/examples/js/postprocessing/RenderPass.js';
import 'three/examples/js/postprocessing/ShaderPass.js';
import 'three/examples/js/shaders/CopyShader.js';
import vertexShaderCell from 'src/shaders/vertexShaderCell.glsl';
import fragmentShaderCell from 'src/shaders/fragmentShaderCell.glsl';
import vertexShaderPostprocessing from 'src/shaders/vertexShaderPostprocessing.glsl';
import fragmentShaderSobel from 'src/shaders/fragmentShaderSobel.glsl';
import fragmentShaderSubtractive from 'src/shaders/fragmentShaderSubtractive.glsl';

const WIDTH = 720;
const HEIGHT = 480;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 10000);
camera.position.z = 100;
camera.lookAt(new THREE.Vector3(0, 0, 0));

// create gemeometry (test with different geometries)
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const geometry = new THREE.BoxGeometry(20, 20, 20);

// create cell shader
const materialCell = new THREE.ShaderMaterial({
  uniforms: {
    color: { type: 'v3', value: new THREE.Vector3(0.0, 0.86, 1.0) }
  },
  vertexShader: vertexShaderCell,
  fragmentShader: fragmentShaderCell
});

// create mesh with material and add to scene
const mesh = new THREE.Mesh(geometry, materialCell);
scene.add(mesh);

// creater renderer
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 1.0);
renderer.setSize(WIDTH, HEIGHT);
document.getElementById('app').appendChild(renderer.domElement);

// create render target for the outline
const renderTargetOutline = new THREE.WebGLRenderTarget(WIDTH, HEIGHT, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat,
  stencilBuffer: false
});

// create composer for the outline
// output of the composer will be rendered to rounder target outline
const composerOutline = new THREE.EffectComposer(renderer, renderTargetOutline);

// add render pass to composer and override materials with normalMaterial
composerOutline.addPass(new THREE.RenderPass(scene, camera, new THREE.MeshNormalMaterial()));

// create sobel shader (outline detection shader)
// pass previous rendered screen with tDiffuse
const sobelShader = new THREE.ShaderPass({
  uniforms: {
    tDiffuse: { type: 't' },
    threshold: { type: 'f', value: 0.99 },
    size: { type: 'f', value: 7.0 },
    aspect: { type: 'v2', value: new THREE.Vector2(WIDTH, HEIGHT) }
  },
  vertexShader: vertexShaderPostprocessing,
  fragmentShader: fragmentShaderSobel
});

// add shader to composer outline
composerOutline.addPass(sobelShader);
composerOutline.addPass(new THREE.ShaderPass(THREE.CopyShader));

// create new composer and render scene (with cell shaders)
const composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));

// combine outline and cell
// cell is previous rendered screen (tDiffuse)
// outline is renderTargetOutline
const combineComposers = new THREE.ShaderPass({
  uniforms: {
    tDiffuse: { type: 't' },
    tSubtract: { type: 't', value: renderTargetOutline }
  },
  vertexShader: vertexShaderPostprocessing,
  fragmentShader: fragmentShaderSubtractive,
});
combineComposers.renderToScreen = true;
composer.addPass(combineComposers);

const editorControls = new THREE.EditorControls(camera, renderer.domElement);
editorControls.addEventListener('change', render);

function render() {
  // render both outline and cell
  composerOutline.render();
  composer.render();
}
render();
