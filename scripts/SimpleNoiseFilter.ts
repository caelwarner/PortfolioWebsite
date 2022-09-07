import NoiseFilter from "~/scripts/NoiseFilter";
import { Vector3 } from "three";

export default class SimpleNoiseFilter extends NoiseFilter {

    constructor(strength: number, numLayers: number, baseRoughness: number, roughness: number, persistence: number, minHeight: number, useFirstLayerAsMask: boolean, seed: number) {
		super(strength, numLayers, baseRoughness, roughness, persistence, minHeight, useFirstLayerAsMask, seed);
    }

    evaluate(position: Vector3): number {
        let elevation = 0;
        let frequency = this.baseRoughness;
        let amplitude = 1;

        for (let i = 0; i < this.numLayers; i++) {
            let nextLayerNoise = this.noise(position.x * frequency, position.y * frequency, position.z * frequency) * 0.4;
            elevation += (nextLayerNoise + 1) * 0.5 * amplitude;

            frequency *= this.roughness;
            amplitude *= this.persistence;
        }

        elevation = Math.max(0, elevation - this.minHeight);

        return elevation * this.strength;
    }

}
