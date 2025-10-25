#version 330 core

uniform vec3 uni_light_colour;

out vec4 out_colour;

void main() {
 out_colour = vec4(uni_light_colour, 1.0f);
}
