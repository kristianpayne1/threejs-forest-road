varying float vHeight;

uniform vec3 waterColor;
uniform vec3 waterHighlight;

uniform float offset;

vec3 calcColor() {

  float mask = (vHeight - 0.5) * 3.1;

  vec3 diffuseColor = mix(waterColor, waterHighlight, mask);

  return diffuseColor;
}

void main() {
  csm_DiffuseColor = vec4(waterColor, 1.0);   
}
