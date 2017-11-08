varying vec3 vNormal;
varying vec3 vPosition;
uniform vec3 color;

vec3 map(float value) {
  if (value > 0.99) {
    return color + vec3(0.7, 0.7, 0.7);
  } else if (value > 0.6) {
    return color;
  } else if (value > 0.3) {
    return color * 0.8;
  } else {
    return color * 0.5;
  }
}

void main(void) {
  float angle = dot(normalize(vNormal), normalize(cameraPosition - vPosition));
  vec3 diffuseColor = clamp(map(angle), 0.0, 1.0);

  gl_FragColor = vec4(diffuseColor, 1.0);
}
