import { makeNoise3D } from "open-simplex-noise";

export default class SimpleNoiseFilter {

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
            let adjustedPosition = position.clone().multiplyScalar(frequency);
            let nextLayerNoise = this.#evaluateNoise(adjustedPosition.x, adjustedPosition.y, adjustedPosition.z);
            elevation += (nextLayerNoise + 1) * 0.5 * amplitude;

            frequency *= this.roughness;
            amplitude *= this.persistence;
        }

        elevation = Math.max(0, elevation - this.minHeight);

        return elevation * this.strength;
    }

}