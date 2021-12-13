import "./style.css";

import * as THREE from "three";
import { Vector2, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class TerrainFace {

    #resolution;
    #vertexIdOffset;
    #localUp;

    #axisA;
    #axisB;

    #vertices = [];
    #indices = [];

    constructor(resolution, vertexIdOffset, localUp) {
        this.#resolution = resolution;
        this.#vertexIdOffset = vertexIdOffset;
        this.#localUp = localUp;

        this.#axisA = new Vector3(localUp.y, localUp.z, localUp.x);
        this.#axisB = new Vector3().crossVectors(localUp, this.#axisA);

        this.constructMesh();
    }

    constructMesh() {
        for (let y = 0; y < this.#resolution; y++) {
            for (let x = 0; x < this.#resolution; x++) {
                let percent = new Vector2(x, y).divideScalar(this.#resolution - 1);
                let pointOnUnitCube = this.#localUp.clone().add(this.#axisA.clone().multiplyScalar((percent.x - 0.5) * 2)).add(this.#axisB.clone().multiplyScalar((percent.y - 0.5) * 2));
                let pointOnUnitSphere = pointOnUnitCube.clone().normalize();

                this.#vertices.push(...pointOnUnitSphere);

                if (x !== this.#resolution - 1 && y !== this.#resolution - 1) {
                    let i = (x + y * this.#resolution) + this.#vertexIdOffset;

                    // Triangle 1
                    this.#indices.push(i, i + this.#resolution + 1, i + this.#resolution);

                    // Triangle 2
                    this.#indices.push(i, i + 1, i + this.#resolution + 1);
                }
            }
        }
    }

    getVertices() {
        return this.#vertices;
    }

    getIndices() {
        return this.#indices;
    }
}

class Planet {

    static directions = [new Vector3(1, 0, 0), new Vector3(0, 0, 1), new Vector3(-1, 0, 0), new Vector3(0, 0, -1), new Vector3(0, 1, 0), new Vector3(0, -1, 0)];

    #vertices = [];
    #indices = [];

    #resolution;
    #geometry = new THREE.BufferGeometry();

    constructor(resolution) {
        this.#resolution = resolution;

        this.createVerticesAndIndices();
        this.createGeometry();
    }

    createVerticesAndIndices() {
        Planet.directions.forEach(direction => {
            let terrainFace = new TerrainFace(this.#resolution, this.#vertices.length / 3, direction);

            this.#vertices.push(...terrainFace.getVertices());
            this.#indices.push(...terrainFace.getIndices());
        });
    }

    createGeometry() {
        this.#geometry.setIndex(this.#indices);
        this.#geometry.setAttribute("position", new THREE.Float32BufferAttribute(this.#vertices, 3));
        this.#geometry.computeVertexNormals();
    }

    getGeometry() {
        return this.#geometry;
    }

}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
camera.position.setZ(30);

const planet = new Planet(50);

console.log(planet.getGeometry());

const material = new THREE.MeshStandardMaterial({ color: 0xFF3300 });
const object = new THREE.Mesh(planet.getGeometry(), material);

const light = new THREE.HemisphereLight(0xFFFFFF, 0x000000);

scene.add(object, light);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    controls.update();
}

animate();
