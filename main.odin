package main

import ctn "../the-carton"
import omg "./scripts"

enviro_fbx := #load("./assets/models/OMG_RenderEnv-Scene25-10-20.fbx")

main :: proc() {
	ctn.init_window(1600, 900, "Oh My Gourd! VR", .OpenGL)

	enviro_mesh := ctn.register_mesh(enviro_fbx)
	enviro_shader := ctn.register_shader("../project-lilypad/assets/shaders/default.vert", "../project-lilypad/assets/shaders/normal.frag")
	ctn.attach_shader_to_material(&enviro_mesh.material, enviro_shader)

	enviro := ctn.Entity {
		mesh = &enviro_mesh
	}

	cam := ctn.Camera {
		position = {0, 0, -5},
		look_at_position = {0, -1.5, 0},
		rotation_order = .YXZ,
		update = omg.camera_update,
	}

	scene := ctn.Scene {
		entities = {enviro},
		camera = cam
	}

	for !ctn.should_close_window() {
		ctn.update_window(&scene)
	}
	ctn.destroy_window()
}
