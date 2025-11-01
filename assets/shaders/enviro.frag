#version 330 core

#define MAX_LIGHTS 4
  
struct Light {
  vec4 colour;
  vec3 position;
};

in vec3 pass_colour;
in vec2 pass_coord;
in vec3 pass_normal;
in vec3 pass_position;
in float pass_depth;

uniform sampler2D uni_texture;
uniform Light uni_lights[MAX_LIGHTS];

uniform float fog_low;
uniform float fog_high;

uniform vec3 uni_camera_position;

out vec4 out_colour;

void main() {
  // Lighting
  vec3 normal = normalize(pass_normal);
  vec3 diffuse = vec3(0.0f, 0.0f, 0.0f);

  for (int i = 0; i < MAX_LIGHTS; i++) {
    vec3 light_direction = normalize(uni_lights[i].position - pass_position);
    float diff = max(dot(normal, light_direction), 0.0f);
    float dist = length(uni_lights[i].position - pass_position);
    float atten = 1.0f / (1.0f + 0.09f * dist + 0.032f * (dist * dist));
    diffuse += diff * uni_lights[i].colour.rgb * atten;
  }
  out_colour = vec4(diffuse, 1.0f);

  // Fog
  // float fog_range = 60.0f;
  // float fog_amount = min(distance(uni_cam_pos, pass_position)/(pass_position.y * fog_range + (fog_range * 0.2f)), 0.2f);
  // vec3 fog_colour = vec3(1.0f, 0.0f, 1.0f);

  // float bands = 20.0f;
  // out_colour = vec4(floor(diffuse.r * bands)/bands, floor(diffuse.g * bands)/bands, floor(diffuse.b * bands)/bands, 1.0f);
} 
