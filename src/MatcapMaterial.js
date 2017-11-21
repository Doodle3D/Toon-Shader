import * as THREE from 'three';
import matcapVert from '../shaders/matcap_vert.glsl';
import matcapFrag from '../shaders/matcap_frag.glsl';
import matcapURL from '../texture/matcap.png';

let matcapTexture;
export const load = new Promise((resolve, reject) => {
  matcapTexture = new THREE.TextureLoader().load(matcapURL, resolve, () => {}, reject);
});

export default class MatcapMaterial extends THREE.ShaderMaterial {
  constructor({ color = new THREE.Color() }) {
    super({
      uniforms: {
        "tMatcap": { type: 't', value: matcapTexture },
        "color": { type: 'vec3', value: new THREE.Vector3() }
      },
      vertexShader: matcapVert,
      fragmentShader: matcapFrag
    });

    this.color = color;
  }

  set color(color) {
    this.uniforms.color.value.fromArray(color.toArray());
    return color;
  }

  get color() {
    return new THREE.Color().fromArray(this.uniforms.color.value.toArray());
  }
}
