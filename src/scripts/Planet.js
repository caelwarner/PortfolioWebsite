import * as THREE from "three";
import { Vector3 } from "three";
import TerrainFace from "@/scripts/TerrainFace";
import ColorGenerator from "@/scripts/ColorGenerator";
import RidgeNoiseFilter from "@/scripts/RidgeNoiseFilter";
import SimpleNoiseFilter from "@/scripts/SimpleNoiseFilter";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

export default class Planet {

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

    #colorScheme = new ColorGenerator(this.generateColors(), [0, 0.05, 0.5, 0.7, 1]);
    // #colorScheme = new ColorGenerator([new Vector3(0, 105, 148), new Vector3(86, 125, 70), new Vector3(57, 140, 10), new Vector3(70, 46, 26), new Vector3(255, 250, 250)], [0, 0.05, 0.5, 0.7, 1]);
    // #colorScheme = new ColorGenerator([new Vector3(116, 93, 235), new Vector3(210, 221, 56), new Vector3(203, 46, 30), new Vector3(203, 46, 30)], [0, 0.1, 0.6, 1]);

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
        this.#geometry = BufferGeometryUtils.mergeVertices(this.#geometry);
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

    generateColors() {
        const colors = [];

        for (let i = 0; i < 5; i++) {
            colors.push(new Vector3(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)));
        }

        return colors;
    }

}