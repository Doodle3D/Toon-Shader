import * as THREE from 'three';
import 'three/examples/js/controls/EditorControls';
import 'three/examples/js/postprocessing/EffectComposer.js';
import 'three/examples/js/postprocessing/RenderPass.js';
import 'three/examples/js/postprocessing/ShaderPass.js';
import 'three/examples/js/shaders/CopyShader.js';
import normalDepthFrag from 'src/shaders/normal_depth_frag.glsl';
import normalDepthVert from 'src/shaders/normal_depth_vert.glsl';
import edgeFrag from 'src/shaders/edge_frag.glsl';
import edgeVert from 'src/shaders/edge_vert.glsl';
import matcapURL from 'src/texture/matcap.png';

document.body.style.margin = 0;
document.body.style.padding = 0;
document.body.style.height = '100%';
document.documentElement.style.height = '100%';
document.documentElement.style.overflow = 'hidden';

document.getElementById('app').style.height = '100%';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

new THREE.TextureLoader().load(matcapURL, matcap => {
  const scene = new THREE.Scene();

  // const camera = new THREE.OrthographicCamera(WIDTH * 0.1 / -2, WIDTH * 0.1 / 2, HEIGHT * 0.1 / 2, HEIGHT * 0.1 / -2, 10, 1000);
  const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, .1, 1000);
  camera.position.z = 100;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // create gemeometry (test with different geometries)
  const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  // const geometry = new THREE.SphereGeometry(10, 32, 32);
  // const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  // const geometry = new THREE.BoxGeometry(20, 20, 20);

  // create mesh with material and add to scene
  const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
  scene.add(mesh);

  // creater renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, logarithmicDepthBuffer: true, antialias: true });
  renderer.setClearColor(0xffffff, 0.0);
  renderer.setSize(WIDTH, HEIGHT);
  document.getElementById('app').appendChild(renderer.domElement);

  const composer = new THREE.EffectComposer(renderer);
  const normalDepthPass = new THREE.RenderPass(scene, camera, new THREE.ShaderMaterial({
    vertexShader: normalDepthVert,
    fragmentShader: normalDepthFrag,
    side: THREE.DoubleSide
  }));
  composer.addPass(normalDepthPass);

  const edgePass = new THREE.ShaderPass({
    uniforms: {
      "tDiffuse": { value: null },
      "tMatcap": { type: 't', value: null },
      "color": { type: 'vec3', value: new THREE.Vector3(80, 168, 228).divideScalar(255) },
      "resolution": { type: 'v2', value: new THREE.Vector2(WIDTH, HEIGHT) }
    },
    vertexShader: edgeVert,
    fragmentShader: edgeFrag
  });
  edgePass.uniforms.tMatcap.value = matcap
  edgePass.renderToScreen = true;
  composer.addPass(edgePass);

  const editorControls = new THREE.EditorControls(camera, renderer.domElement);
  editorControls.addEventListener('change', composer.render.bind(composer));

  composer.render();
});
