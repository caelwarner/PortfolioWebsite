import { makeNoise3D } from "open-simplex-noise";
import { MathUtils } from "three";

export default class RidgeNoiseFilter {

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
            let adjustedPosition = position.clone().multiplyScalar(frequency);
            let nextLayerNoise = 1 - Math.abs(this.#evaluateNoise(adjustedPosition.x, adjustedPosition.y, adjustedPosition.z));
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