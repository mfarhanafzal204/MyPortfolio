uniform float uTime;
uniform vec2 uMouse;
uniform float uPixelRatio;

attribute float aScale;
attribute float aOffset;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 pos = position;

  // Wave turbulence
  float wave1 = sin(pos.x * 1.5 + uTime * 0.8 + aOffset) * 0.3;
  float wave2 = cos(pos.z * 1.2 + uTime * 0.6 + aOffset * 1.3) * 0.25;
  float wave3 = sin(pos.x * 0.8 + pos.z * 0.9 + uTime * 0.4) * 0.2;
  pos.y += wave1 + wave2 + wave3;

  // Mouse repulsion
  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vec2 mouseWorld = uMouse * 3.0;
  float dist = distance(worldPos.xy, mouseWorld);
  float repulse = smoothstep(1.2, 0.0, dist);
  pos.x += (worldPos.x - mouseWorld.x) * repulse * 0.4;
  pos.y += (worldPos.y - mouseWorld.y) * repulse * 0.4;

  // Color gradient: cyan (bottom) → purple (top)
  float t = (pos.y + 2.0) / 4.0;
  t = clamp(t, 0.0, 1.0);
  vColor = mix(vec3(0.0, 0.898, 1.0), vec3(0.545, 0.361, 0.965), t);

  // Alpha based on distance from center
  float centerDist = length(pos.xz) / 5.0;
  vAlpha = 1.0 - smoothstep(0.5, 1.0, centerDist);
  vAlpha *= 0.7;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aScale * uPixelRatio * (200.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
