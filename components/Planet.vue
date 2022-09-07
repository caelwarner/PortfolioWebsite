<template>
	<div class="planet"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as THREE from "three";
import Planet from "~/scripts/Planet";

@Component
export default class extends Vue {
	private readonly scene = new THREE.Scene()
	private readonly renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

	private camera: THREE.Camera | undefined;
	private mesh: THREE.Mesh | undefined;

	mounted(): void {
		this.init();
		this.animate();
	}

	init(): void {
		this.camera = new THREE.PerspectiveCamera(75, this.$el.clientWidth / this.$el.clientHeight, 0.1,  1000);

		let planet = new Planet(200);

		// const vertexShader = `
		// 	varying vec3 vLocalPosition;
		//
		// 	void main() {
		// 		vLocalPosition = position;
		//
		// 		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		// 	}
		// `;
		//
		// const fragmentShader = `
		// 	uniform float uMinElevation;
		// 	uniform float uMaxElevation;
		//
		// 	varying vec3 vLocalPosition;
		//
		// 	void main() {
		// 		float elevation = smoothstep(uMinElevation, uMaxElevation, length(vLocalPosition));
		// 		gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
		// 	}
		// `;

		const material = new THREE.MeshPhongMaterial({ vertexColors: true });
		// const material = new THREE.ShaderMaterial({
		// 	uniforms: {
		// 		uMinElevation: {
		// 			value: planet.minElevation
		// 		},
		// 		uMaxElevation: {
		// 			value: planet.maxElevation
		// 		}
		// 	},
		// 	vertexShader: vertexShader,
		// 	fragmentShader: fragmentShader
		// });
		this.mesh = new THREE.Mesh(planet.getGeometry(), material);

		this.mesh.scale.x = 16;
		this.mesh.scale.y = 16;
		this.mesh.scale.z = 16;

		const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
		const light = new THREE.PointLight(0xffb499, 2);

		light.position.setY(4000);
		light.position.setX(-3000);
		light.position.setZ(1000);

		this.scene.add(this.mesh, ambientLight, light);

		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight);
		this.camera.position.setZ(30);

		this.$el.appendChild(this.renderer.domElement);
	}

	animate(): void {
		requestAnimationFrame(this.animate);

		this.renderer.render(this.scene, this.camera!);

		if (!this.mesh)
			return;

		this.mesh!.rotation.y -= 0.001;
		this.mesh!.rotation.x += 0.001;
	}
}
</script>

<style scoped>
.planet {
	position: absolute;
	top: -1rem;
	left: 42vw;
	z-index: -2;
	width: 100vh;
	height: 100vh;
}
</style>
