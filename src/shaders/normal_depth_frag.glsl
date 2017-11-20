varying vec3 vNormal;

void main() {
  // normal can range from -1 to 1 flatten to 0 - 1
  vec2 normal = vNormal.xy / 2. + .5;
  // multiply depth by 3 so we get 3x resolution (loops 3x through hue depth)
  float depth = mod(gl_FragCoord.z * 3., 1.);

  gl_FragColor = vec4(normal, depth, 1.);
}
