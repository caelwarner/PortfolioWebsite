import "./style.css";

import * as THREE from "three";
import {MathUtils, Vector2, Vector3} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { makeNoise3D } from "open-simplex-noise";
import {MathUtil} from "three/examples/jsm/libs/OimoPhysics";

class TerrainFace {

    #resolution;
    #vertexIdOffset;
    #localUp;
    #planet;

    #axisA;
    #axisB;

    #elevations = [];

    #vertices = [];
    #indices = [];
    #colors = [];

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

                let elevation = this.#planet.calculateElevation(pointOnUnitSphere);
                pointOnUnitSphere.multiplyScalar(elevation);

                this.#elevations.push(elevation);
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

    getElevations() {
        return this.#elevations;
    }
}

class Planet {

    static directions = [new Vector3(1, 0, 0), new Vector3(0, 0, 1), new Vector3(-1, 0, 0), new Vector3(0, 0, -1), new Vector3(0, 1, 0), new Vector3(0, -1, 0)];

    #vertices = [];
    #indices = [];
    #colors = [];

    #resolution;
    #geometry = new THREE.BufferGeometry();

    #minElevation = Number.MAX_VALUE;
    #maxElevation = Number.MIN_VALUE;

    #colorCache = new Map();

    #noiseFilters = [
        new SimpleNoiseFilter(0.075, 6, 1.2, 1.8, 0.525, 1.05, false, Date.now()),
        // new SimpleNoiseFilter(6, 5, 1.1, 2.5, 0.5, 1.2, true, 3 + 9342857),
        new RidgeNoiseFilter(3, 5,2.6, 3, 0.5, 1.1, 1, true, Date.now() + 58439050)
    ];

    // #colorScheme = new ColorGenerator([new Vector3(0, 105, 148), new Vector3(86, 125, 70), new Vector3(57, 140, 10), new Vector3(70, 46, 26), new Vector3(255, 250, 250)], [0, 0.05, 0.5, 0.7, 1]);
    #colorScheme = new ColorGenerator([new Vector3(116, 93, 235), new Vector3(210, 221, 56), new Vector3(203, 46, 30), new Vector3(203, 46, 30)], [0, 0.1, 0.6, 1]);

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

        elevation += 1;
        this.addMinMaxElevation(elevation);

        return elevation;
    }

    calculateColor(elevation) {
        if (this.#colorCache.has(elevation)) {
            return this.#colorCache.get(elevation);
        }

        let color = this.#colorScheme.evaluate(elevation, this.#minElevation, this.#maxElevation).clone();
        color.divideScalar(255);

        this.#colorCache.set(elevation, color);

        return color;
    }

    createVerticesAndIndices() {
        let elevations = [];

        Planet.directions.forEach(direction => {
            let terrainFace = new TerrainFace(this.#resolution, this.#vertices.length / 3, direction, this);

            for (let i = 0; i < terrainFace.getVertices().length; i++) {
                this.#vertices.push(terrainFace.getVertices()[i]);
            }

            for (let i = 0; i < terrainFace.getIndices().length; i++) {
                this.#indices.push(terrainFace.getIndices()[i]);
            }

            for (let i = 0; i < terrainFace.getElevations().length; i++) {
                elevations.push(terrainFace.getElevations()[i]);
            }
        });

        elevations.forEach(elevation => {
            this.#colors.push(...this.calculateColor(elevation));
        })
    }

    createGeometry() {
        this.#geometry.setIndex(this.#indices);
        this.#geometry.setAttribute("position", new THREE.Float32BufferAttribute(this.#vertices, 3));
        this.#geometry.setAttribute("color", new THREE.Float32BufferAttribute(this.#colors, 3));
        this.#geometry.computeVertexNormals();
    }

    getGeometry() {
        return this.#geometry;
    }

    addMinMaxElevation(value) {
        if (value > this.#maxElevation) {
            this.#maxElevation = value;
        }

        if (value < this.#minElevation) {
            this.#minElevation = value;
        }
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
            weight = MathUtils.clamp(nextLayerNoise * this.weightMultiplier, 0, 1);

            elevation += (nextLayerNoise + 1) * 0.5 * amplitude;

            frequency *= this.roughness;
            amplitude *= this.persistence;
        }

        elevation = Math.max(0, elevation - this.minHeight);

        return elevation * this.strength;
    }

}

class ColorGenerator {

    constructor(colors, positions) {
        this.colors = colors;
        this.positions = positions;
    }

    evaluate(elevation, min, max) {
        let position = MathUtils.inverseLerp(min, max, elevation);

        for (let i = 0; i < this.positions.length; i++) {
            if (this.positions[i] > position) {
                let localPosition = MathUtils.inverseLerp(this.positions[i - 1], this.positions[i], position);

                return this.colors[i - 1].clone().lerp(this.colors[i], localPosition);
            }
        }

        return this.colors[this.colors.length - 1];
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

const material = new THREE.MeshPhongMaterial({ vertexColors: true });
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
