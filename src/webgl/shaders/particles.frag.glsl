varying vec3 vColor;
varying float vAlpha;

void main() {
  // Circular particle shape
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  if (dist > 0.5) discard;

  // Soft glow falloff
  float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;

  gl_FragColor = vec4(vColor, alpha);
}
