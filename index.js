import 'mrdoob/three.js';
import 'mrdoob/three.js/controls/EditorControls';
import vertexShaderCell from './shaders/vertexShaderCell.glsl!text';
import fragmentShaderCell from './shaders/fragmentShaderCell.glsl!text';
import vertexShaderOutLine from './shaders/vertexShaderOutLine.glsl!text';
import fragmentShaderOutLine from './shaders/fragmentShaderOutLine.glsl!text';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 100;
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const geometry = new THREE.BoxGeometry(20, 20, 20);
// geometry.computeFaceNormals();
// geometry.computeVertexNormals();

const materialCell = new THREE.ShaderMaterial({
  uniforms: {
    color: { type: 'v3', value: new THREE.Vector3(0.0, 0.86, 1.0) }
  },
  vertexShader: vertexShaderCell,
  fragmentShader: fragmentShaderCell
});
const meshCell = new THREE.Mesh(geometry, materialCell);
scene.add(meshCell);

const materialOutLine = new THREE.ShaderMaterial({
  uniforms: {
    color: { type: 'v3', value: new THREE.Vector3(0, 0, 0) },
    size: { type: 'f', value: 0.3 }
  },
  vertexShader: vertexShaderOutLine,
  fragmentShader: fragmentShaderOutLine,
  side: THREE.BackSide
});
const meshOutLine = new THREE.Mesh(geometry, materialOutLine);
scene.add(meshOutLine);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const editorControls = new THREE.EditorControls(camera, renderer.domElement);
editorControls.addEventListener('change', () => {
  renderer.render(scene, camera);
});
renderer.render(scene, camera);
