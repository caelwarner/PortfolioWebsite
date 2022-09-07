import {MathUtils, Vector3} from "three";
import SimplexNoise from "simplex-noise";
import NoiseFilter from "~/scripts/NoiseFilter";

export default class RidgeNoiseFilter extends NoiseFilter {

	private readonly weightMultiplier: number;

	constructor(strength: number, numLayers: number, baseRoughness: number, roughness: number, persistence: number, minHeight: number, weightMultiplier: number, useFirstLayerAsMask: boolean, seed: number) {
		super(strength, numLayers, baseRoughness, roughness, persistence, minHeight, useFirstLayerAsMask, seed);

		this.weightMultiplier = weightMultiplier;
	}

    evaluate(position: Vector3): number {
        let elevation = 0;
        let frequency = this.baseRoughness;
        let amplitude = 1;
        let weight = 1;

        for (let i = 0; i < this.numLayers; i++) {
            let nextLayerNoise = 1 - Math.abs(this.noise(position.x * frequency, position.y * frequency, position.z * frequency) * 0.7);
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
