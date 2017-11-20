uniform sampler2D tDiffuse;
uniform sampler2D tMatcap;
uniform vec2 resolution;
varying vec2 vUv;

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 depth(vec4 c) {
  return hsv2rgb(vec3(c.z, 1., 1.)) * c.w;
}

void main() {
  float x = 1.0 / resolution.x;
  float y = 1.0 / resolution.y;

  vec4 f01 = texture2D(tDiffuse, vUv + vec2(0, -y));
  vec4 f10 = texture2D(tDiffuse, vUv + vec2(-x, 0));
  vec4 f11 = texture2D(tDiffuse, vUv);
  vec4 f12 = texture2D(tDiffuse, vUv + vec2(0, y));
  vec4 f21 = texture2D(tDiffuse, vUv + vec2(x, 0));

  float depthLaplace = length(4. * depth(f11) - depth(f01) - depth(f10) - depth(f12) - depth(f21));
  if (depthLaplace < 0.1) depthLaplace = 0.0;
  float normalLaplace = length(4. * f11.xy - f01.xy - f10.xy - f12.xy - f21.xy);
  if (normalLaplace < 0.1) depthLaplace = 0.0;

  float edge = normalLaplace + depthLaplace;

  vec4 color = texture2D(tMatcap, (f11.xy - .5) * .95 + .5);
  gl_FragColor = vec4(vec3(color) - edge, max(edge, f11.w));
}
