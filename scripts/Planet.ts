import * as THREE from "three";
import { Vector3 } from "three";
import TerrainFace from "~/scripts/TerrainFace";
import ColorGenerator from "~/scripts/ColorGenerator";
import RidgeNoiseFilter from "~/scripts/RidgeNoiseFilter";
import SimpleNoiseFilter from "~/scripts/SimpleNoiseFilter";
import NoiseFilter from "~/scripts/NoiseFilter";

export default class Planet {

    static directions: Vector3[] = [new Vector3(1, 0, 0), new Vector3(0, 0, 1), new Vector3(-1, 0, 0), new Vector3(0, 0, -1), new Vector3(0, 1, 0), new Vector3(0, -1, 0)];

	private readonly resolution: number;

	private readonly vertices: number[] = [];
	private readonly indices: number[] = [];
	private readonly colors: number[] = [];

	private geometry = new THREE.BufferGeometry();

	private minElevation = Number.MAX_VALUE;
	private maxElevation = Number.MIN_VALUE;

	private colorCache: Map<number, Vector3> = new Map();

	private readonly noiseFilters: NoiseFilter[] = [
		new SimpleNoiseFilter(0.075, 6, 1.2, 1.8, 0.525, 1.05, false, Date.now()),
		// new SimpleNoiseFilter(6, 5, 1.1, 2.5, 0.5, 1.2, true, 3 + 9342857),
		new RidgeNoiseFilter(3, 5,2.6, 3, 0.5, 1.1, 1, true, Date.now() + 58439050)
	];

	private colorScheme: ColorGenerator = new ColorGenerator(this.fetchColors(), [0, 0.05, 0.5, 0.7, 1]);

    constructor(resolution: number) {
        this.resolution = resolution;

        this.createVerticesAndIndices();
        this.createGeometry();
    }

    calculateElevation(position: Vector3): number {
        let firstLayerElevation = this.noiseFilters[0].evaluate(position);
        let elevation = firstLayerElevation;

        for (let i = 1; i < this.noiseFilters.length; i++) {
            let mask = this.noiseFilters[i].shouldUseFirstLayerAsMask() ? firstLayerElevation : 1;

            elevation += this.noiseFilters[i].evaluate(position) * mask;
        }

        elevation += 1;
        this.addMinMaxElevation(elevation);

        return elevation;
    }

    calculateColor(elevation: number): Vector3 {
		if (this.colorCache.has(elevation)) {
			return this.colorCache.get(elevation)!;
        }

        let color = this.colorScheme.evaluate(elevation, this.minElevation, this.maxElevation).clone();
        color.divideScalar(255);

        this.colorCache.set(elevation, color);

        return color;
    }

    createVerticesAndIndices(): void {
        let elevations: number[] = [];

        Planet.directions.forEach(direction => {
            let terrainFace = new TerrainFace(this.resolution, this.vertices.length / 3, direction, this);

            for (let i = 0; i < terrainFace.getVertices().length; i++) {
                this.vertices.push(terrainFace.getVertices()[i]);
            }

            for (let i = 0; i < terrainFace.getIndices().length; i++) {
                this.indices.push(terrainFace.getIndices()[i]);
            }

            for (let i = 0; i < terrainFace.getElevations().length; i++) {
                elevations.push(terrainFace.getElevations()[i]);
            }
        });

        elevations.forEach(elevation => {
            let calculatedColors = this.calculateColor(elevation);

            this.colors.push(calculatedColors.x, calculatedColors.y, calculatedColors.z);
        });
    }

    createGeometry(): void {
        this.geometry.setIndex(this.indices);
        this.geometry.setAttribute("position", new THREE.Float32BufferAttribute(this.vertices, 3));
        this.geometry.setAttribute("color", new THREE.Float32BufferAttribute(this.colors, 3));
        this.geometry.computeVertexNormals();
    }

    getGeometry(): THREE.BufferGeometry {
        return this.geometry;
    }

    addMinMaxElevation(value: number): void {
        if (value > this.maxElevation) {
            this.maxElevation = value;
        }

        if (value < this.minElevation) {
            this.minElevation = value;
        }
    }

    generateColors(): Vector3[] {
        const colors: Vector3[] = [];

        for (let i = 0; i < 5; i++) {
            colors.push(new Vector3(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)));
        }

		/*
		let output = {
			colors: []
		};

		for (let i = 0; i < colors.length; i++) {
			// @ts-ignore
			output.colors.push({"r": colors[i].x, "g": colors[i].y, "b": colors[i].z});
		}

		console.log(JSON.stringify(output));
		*/

        return colors;
    }

	fetchColors(): Vector3[] {
		const colorSchemes = require("../static/index/color-schemes.json");
		const colorScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)].colors;
		const colors: Vector3[] = [];

		for (let i = 0; i < colorScheme.length; i++) {
			colors.push(new Vector3(colorScheme[i].r, colorScheme[i].g, colorScheme[i].b));
		}

		return colors;
	}

}
