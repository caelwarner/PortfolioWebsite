<template>
	<div class="laptop"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

@Component({
	props: {
		texture: {
			required: true,
			type: String
		}
	}
})
export default class extends Vue {
	private readonly scene = new THREE.Scene();
	private readonly renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

	private camera: THREE.PerspectiveCamera | undefined;
	private laptop: THREE.Object3D | undefined;
	private screen: THREE.Object3D | undefined;
	private pivot: THREE.Group | undefined;

	private mouseX = 0;
	private mouseY = 0;

	mounted(): void {
		this.init();
		this.animate();
	}

	async init(): Promise<void> {
		this.camera = new THREE.PerspectiveCamera(60, this.$el.clientWidth / this.$el.clientHeight, 0.1,  1000)

		const loadedData = await new GLTFLoader().loadAsync("index/laptop.glb");

		loadedData.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.material.color.set(0x3A4242);
			}
		});

		this.laptop = loadedData.scene.children[0];

		this.laptop.position.set(-149.45, 10, 0);
		this.laptop.scale.set(0.1, 0.1, 0.1);
		this.laptop.rotateX(0.15);

		const screenTexture = await new THREE.TextureLoader().loadAsync(this.$props.texture);
		const screenGeometry = new THREE.PlaneGeometry(32.5, 19);
		const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });

		this.screen = new THREE.Mesh(screenGeometry, screenMaterial);

		this.screen.position.set(0, 21.5, 3.1);
		this.screen.rotation.set(-0.12, 0, 0)

		this.pivot = new THREE.Group();
		this.pivot.add(this.laptop, this.screen);

		const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.15);
		const light = new THREE.PointLight(0xaba3ee, 1);

		light.position.setY(4000);
		light.position.setX(-3000);
		light.position.setZ(1000);

		this.scene.add(this.pivot, ambientLight, light);

		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight);
		this.camera.position.setZ(65);
		this.camera.position.setY(15);

		this.$el.appendChild(this.renderer.domElement);

		window.addEventListener("mousemove", (event) => {
			this.mouseX = event.clientX;
			this.mouseY = event.clientY;
		});

		window.addEventListener("resize", (event) => {
			if (!this.camera)
				return

			this.camera!.aspect =  this.$el.clientWidth / this.$el.clientHeight;
			this.camera!.updateProjectionMatrix();

			this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight);
		});
	}

	animate(): void {
		requestAnimationFrame(this.animate);

		this.renderer.render(this.scene, this.camera!);

		if (!this.pivot)
			return;

		const canvasY = this.$el.getBoundingClientRect().y + (this.$el.getBoundingClientRect().height / 2)
		const translatedX = (Math.min((this.mouseX) / window.innerWidth, 1) * 2) - 1;
		const translatedY = (Math.min((this.mouseY - canvasY) / window.innerHeight, 1) * 2) - 1;

		this.pivot.rotation.y = (translatedX * 0.05);
		this.pivot.rotation.x = (translatedY * 0.05);
	}
}
</script>
