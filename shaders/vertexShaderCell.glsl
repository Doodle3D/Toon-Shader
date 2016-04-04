varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = mat3(modelMatrix) * normal;
  vPosition = vec3(modelMatrix * vec4(position, 1.0));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
