<template>
	<div id="planet"></div>
</template>

<script>
import * as THREE from "three";
import Planet from "@/scripts/Planet";

export default {
	name: "Planet",
	data() {
		return {
			scene: null,
			camera: null,
			renderer: null,
			mesh: null
		}
	},

	methods: {
		init: function() {
			const container = document.querySelector("#planet");

			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1,  1000);
			this.renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true
			});

			const planet = new Planet(256);

			const material = new THREE.MeshPhongMaterial({ vertexColors: true });
			this.mesh = new THREE.Mesh(planet.getGeometry(), material);

			this.mesh.scale.x = 16;
			this.mesh.scale.y = 16;
			this.mesh.scale.z = 16;

			this.mesh.material.flatShading = false;

			const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
			const light = new THREE.PointLight(0xffb499, 2);

			light.position.setY(4000);
			light.position.setX(-3000);
			light.position.setZ(1000);

			this.scene.add(this.mesh, ambientLight, light);

			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(container.clientWidth, container.clientHeight);
			this.camera.position.setZ(30);

			container.appendChild(this.renderer.domElement);
		},

		animate: function() {
			requestAnimationFrame(this.animate);

			this.renderer.render(this.scene, this.camera);

			this.mesh.rotation.y -= 0.001;
			this.mesh.rotation.x += 0.001;
		}
	},

	mounted() {
		this.init();
		this.animate();
	},
}
</script>

<style scoped>
#planet {
	position: absolute;
	top: -1rem;
	left: 42vw;
	z-index: -2;
	width: 100vh;
	height: 100vh;
}
</style>