import "./style.css";

import * as THREE from "three";
import { Vector2, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class TerrainFace {

    constructor(geometry, resolution, localUp) {
        this.geometry = geometry;
        this.resolution = resolution;
        this.localUp = localUp;

        this.axisA = new Vector3(localUp.y, localUp.z, localUp.x);
        this.axisB = new Vector3().crossVectors(localUp, this.axisA);
    }

    constructMesh() {
        let vertices = new Float32Array((this.resolution * this.resolution) * 3);
        let triangles = new Float32Array((this.resolution - 1) * (this.resolution - 1) * 6);
        let triIndex = 0;

        for (let y = 0; y < this.resolution; y++) {
            for (let x = 0; x < this.resolution; x++) {
                let i = x + y * this.resolution;

                let percent = new Vector2(x, y).divideScalar(this.resolution - 1);
                let pointOnUnitCube = new Vector3(...this.localUp).add(new Vector3(...this.axisA).multiplyScalar((percent.x - 0.5) * 2)).add(new Vector3(...this.axisB).multiplyScalar((percent.y - 0.5) * 2))

                vertices[i * 3] = pointOnUnitCube.x;
                vertices[i * 3 + 1] = pointOnUnitCube.y;
                vertices[i * 3 + 2] = pointOnUnitCube.z;

                if (x !== this.resolution - 1 && y !== this.resolution - 1) {
                    // Triangle 1
                    triangles[triIndex] = i;
                    triangles[triIndex + 1] = i + this.resolution + 1;
                    triangles[triIndex + 2] = i + this.resolution;

                    // Triangle 2
                    triangles[triIndex + 3] = i;
                    triangles[triIndex + 4] = i + 1;
                    triangles[triIndex + 5] = i + this.resolution + 1;

                    triIndex += 6;
                }
            }
        }

        this.geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setIndex(new THREE.Float32BufferAttribute(triangles, 3));
        this.geometry.computeVertexNormals();
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.BufferGeometry();

const terrainFace = new TerrainFace(geometry, 10, new Vector3(0, 0, 1));
terrainFace.constructMesh();

const material = new THREE.MeshBasicMaterial({ wireframe: true });
const object = new THREE.Mesh(geometry, material);
scene.add(object);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    controls.update();
}

animate();
