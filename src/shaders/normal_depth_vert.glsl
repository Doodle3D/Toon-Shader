varying vec3 vNormal;

void main() {
  vNormal = normalize(normalMatrix * normal);

  #include <begin_vertex>
  #include <project_vertex>
}
