uniform sampler2D tMatcap;
uniform vec3 color;
varying vec2 vNormal;

// color blending from https://www.w3.org/TR/compositing-1/#blendingcolor
float lum(vec3 c) {
  return c.r * .3 + c.g * .59 + c.b * .11;
}

float max(float a, float b, float c) {
  float maxAB = a > b ? a : b;
  return maxAB > c ? maxAB : c;
}

float min(float a, float b, float c) {
  float minAB = a < b ? a : b;
  return minAB < c ? minAB : c;
}

vec3 clipColor(vec3 c) {
  float l = lum(c);
  float n = min(c.r, c.g, c.b);
  float x = max(c.r, c.g, c.b);
  if (n < 0.) {
    c = l + (((c - l) * l) / (l - n));
  }
  if (x > 1.) {
    c = l + (((c - l) * (1. - l)) / (x - l));
  }
  return c;
}

vec3 setLum(vec3 c, float l) {
  float d = l - lum(c);
  c = c + d;
  return clipColor(c);
}

void main() {
  vec4 matcap = texture2D(tMatcap, vNormal);
  vec3 coloredMatcap = setLum(color, lum(matcap.rgb));
  gl_FragColor = vec4(coloredMatcap, 1.);
}
