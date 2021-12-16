import "./style.css";

import * as THREE from "three";
import { Vector2, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { makeNoise3D } from "open-simplex-noise";

class TerrainFace {

    #resolution;
    #vertexIdOffset;
    #localUp;
    #planet;

    #axisA;
    #axisB;

    #vertices = [];
    #indices = [];

    constructor(resolution, vertexIdOffset, localUp, planet) {
        this.#resolution = resolution;
        this.#vertexIdOffset = vertexIdOffset;
        this.#localUp = localUp;
        this.#planet = planet;

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

                pointOnUnitSphere.multiplyScalar(this.#planet.calculateElevation(pointOnUnitSphere));

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

    #noiseFilters = [
        new SimpleNoiseFilter(0.075, 6, 1.2, 1.8, 0.525, 1.05, false, 3),
        // new SimpleNoiseFilter(6, 5, 1.1, 2.5, 0.5, 1.2, true, 3 + 9342857),
        new RidgeNoiseFilter(3, 5,2.6, 3, 0.5, 1.1, 1, true, 3 + 58439050)
    ];

    constructor(resolution) {
        this.#resolution = resolution;

        this.createVerticesAndIndices();
        this.createGeometry();
    }

    calculateElevation(position) {
        let firstLayerElevation = this.#noiseFilters[0].evaluate(position);
        let elevation = firstLayerElevation;

        for (let i = 1; i < this.#noiseFilters.length; i++) {
            let mask = this.#noiseFilters[i].useFirstLayerAsMask ? firstLayerElevation : 1;

            elevation += this.#noiseFilters[i].evaluate(position) * mask;
        }

        return elevation + 1;
    }

    createVerticesAndIndices() {
        Planet.directions.forEach(direction => {
            let terrainFace = new TerrainFace(this.#resolution, this.#vertices.length / 3, direction, this);

            for (let i = 0; i < terrainFace.getVertices().length; i++) {
                this.#vertices.push(terrainFace.getVertices()[i]);
            }

            for (let i = 0; i < terrainFace.getIndices().length; i++) {
                this.#indices.push(terrainFace.getIndices()[i]);
            }
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

class SimpleNoiseFilter {

    #evaluateNoise;

    constructor(strength, numLayers, baseRoughness, roughness, persistence, minHeight, useFirstLayerAsMask, seed) {
        this.strength = strength;
        this.numLayers = numLayers;
        this.baseRoughness = baseRoughness;
        this.roughness = roughness;
        this.persistence = persistence;
        this.minHeight = minHeight;
        this.useFirstLayerAsMask = useFirstLayerAsMask;
        this.#evaluateNoise = makeNoise3D(seed);
    }

    evaluate(position) {
        let elevation = 0;
        let frequency = this.baseRoughness;
        let amplitude = 1;

        for (let i = 0; i < this.numLayers; i++) {
            let nextLayerNoise = this.#evaluateNoise(...position.clone().multiplyScalar(frequency));
            elevation += (nextLayerNoise + 1) * 0.5 * amplitude;

            frequency *= this.roughness;
            amplitude *= this.persistence;
        }

        elevation = Math.max(0, elevation - this.minHeight);

        return elevation * this.strength;
    }

}

class RidgeNoiseFilter {

    #evaluateNoise;

    constructor(strength, numLayers, baseRoughness, roughness, persistence, minHeight, weightMultiplier, useFirstLayerAsMask, seed) {
        this.strength = strength;
        this.numLayers = numLayers;
        this.baseRoughness = baseRoughness;
        this.roughness = roughness;
        this.persistence = persistence;
        this.minHeight = minHeight;
        this.weightMultiplier = weightMultiplier;
        this.useFirstLayerAsMask = useFirstLayerAsMask;
        this.#evaluateNoise = makeNoise3D(seed);
    }

    evaluate(position) {
        let elevation = 0;
        let frequency = this.baseRoughness;
        let amplitude = 1;
        let weight = 1;

        for (let i = 0; i < this.numLayers; i++) {
            let nextLayerNoise = 1 - Math.abs(this.#evaluateNoise(...position.clone().multiplyScalar(frequency)));
            nextLayerNoise *= nextLayerNoise;
            nextLayerNoise *= weight;
            weight = Math.min(Math.max(nextLayerNoise * this.weightMultiplier, 0), 1);

            elevation += (nextLayerNoise + 1) * 0.5 * amplitude;

            frequency *= this.roughness;
            amplitude *= this.persistence;
        }

        elevation = Math.max(0, elevation - this.minHeight);

        return elevation * this.strength;
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

const planet = new Planet(256);

const material = new THREE.MeshStandardMaterial({ color: 0xAAAAAA });
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
