uniform sampler2D tDiffuse;
uniform sampler2D tSubtract;
varying vec2 vUv;

void main() {
  vec4 colorDiffuse = texture2D(tDiffuse, vUv);
  vec4 colorAdd = texture2D(tSubtract, vUv);

  gl_FragColor = clamp(colorDiffuse - colorAdd, 0.0, 1.0);
}
