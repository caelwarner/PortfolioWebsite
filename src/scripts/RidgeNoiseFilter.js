import { MathUtils } from "three";
import SimplexNoise from "simplex-noise";

export default class RidgeNoiseFilter {

    constructor(strength, numLayers, baseRoughness, roughness, persistence, minHeight, weightMultiplier, useFirstLayerAsMask, seed) {
        this.strength = strength;
        this.numLayers = numLayers;
        this.baseRoughness = baseRoughness;
        this.roughness = roughness;
        this.persistence = persistence;
        this.minHeight = minHeight;
        this.weightMultiplier = weightMultiplier;
        this.useFirstLayerAsMask = useFirstLayerAsMask;
        this.simplex = new SimplexNoise(seed);
    }

    evaluate(position) {
        let elevation = 0;
        let frequency = this.baseRoughness;
        let amplitude = 1;
        let weight = 1;

        for (let i = 0; i < this.numLayers; i++) {
            let nextLayerNoise = 1 - Math.abs(this.simplex.noise3D(position.x * frequency, position.y * frequency, position.z * frequency) * 0.7);
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