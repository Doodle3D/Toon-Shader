varying vec3 vNormal;

void main() {
  vec2 normal = vNormal.xy / 2. + .5;
  float depth = mod(gl_FragCoord.z * 3., 1.);

  gl_FragColor = vec4(normal, depth, 1.);
}
