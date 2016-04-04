uniform float size;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position + normalize(normal) * size, 1.0);
}
