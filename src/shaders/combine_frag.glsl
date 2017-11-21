varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform sampler2D tEdge;

void main() {
  vec4 cEdge = texture2D(tEdge, vUv);
  vec4 cDiffuse = texture2D(tDiffuse, vUv);

  gl_FragColor = mix(cDiffuse, cEdge, cEdge.a);
}
