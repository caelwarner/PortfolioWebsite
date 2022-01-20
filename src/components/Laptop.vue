<template>
	<div :id="'laptop-' + number" class="laptop"></div>
</template>

<script>
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export default {
	name: "Laptop",
	props: ["number", "texture"],
	data() {
		return {
			scene: null,
			camera: null,
			renderer: null,
			laptop: null,
			screen: null,
			mouseX: null,
			mouseY: null
		}
	},

	methods: {
		init: async function() {
			const container = document.querySelector("#laptop-" + this.number);

			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1,  1000);
			this.renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true
			});

			const loader = new GLTFLoader();

			const loadedData = await loader.loadAsync("/laptop.glb");

			loadedData.scene.traverse((child) => {
				if (child.isMesh) {
					child.material.color.set(0x3A4242);
				}
			})

			this.laptop = loadedData.scene.children[0];

			this.laptop.position.set(-148, 10, 0);
			this.laptop.scale.set(0.1, 0.1, 0.1);
			this.laptop.rotateX(0.15);


			const screenTexture = new THREE.TextureLoader().load(this.texture);

			const screenGeometry = new THREE.PlaneGeometry(32.5, 19);
			const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });

			this.screen = new THREE.Mesh(screenGeometry, screenMaterial);

			this.screen.position.set(1.45, 21.5, 3.5);
			this.screen.rotation.set(-0.08, 0, 0)

			const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.15);
			const light = new THREE.PointLight(0xdff9fb, 1);

			light.position.setY(4000);
			light.position.setX(-3000);
			light.position.setZ(1000);

			this.scene.add(this.laptop, this.screen, ambientLight, light);

			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(container.clientWidth, container.clientHeight);
			this.camera.position.setZ(65);
			this.camera.position.setY(15);

			container.appendChild(this.renderer.domElement);

			document.addEventListener("mousemove", (event) => {
				this.mouseX = event.clientX;
				this.mouseY = event.clientY;
			})
		},

		animate: function() {
			requestAnimationFrame(this.animate);

			this.renderer.render(this.scene, this.camera);

			this.laptop.position.x = (this.mouseX * 0.0005) - 148;
			this.laptop.position.y = (this.mouseY * -0.0005) + 10;

			this.screen.position.x = (this.mouseX * 0.0005) + 1.45;
			this.screen.position.y = (this.mouseY * -0.0005) + 21.5;

			// this.camera.rotation.x = this.mouseY * -0.00005;
			// this.camera.rotation.y = (this.mouseX + 200) * -0.00005;
		}
	},

	mounted() {
		this.init();
		this.animate();
	},
}
</script>

<style scoped>
.laptop {
	display: inline-block;
	width: 70rem;
	height: 70rem;
}
</style>