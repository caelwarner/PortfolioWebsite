import SimplexNoise from "simplex-noise";

export default class SimpleNoiseFilter {

    constructor(strength, numLayers, baseRoughness, roughness, persistence, minHeight, useFirstLayerAsMask, seed) {
        this.strength = strength;
        this.numLayers = numLayers;
        this.baseRoughness = baseRoughness;
        this.roughness = roughness;
        this.persistence = persistence;
        this.minHeight = minHeight;
        this.useFirstLayerAsMask = useFirstLayerAsMask;
        this.simplex = new SimplexNoise(seed);
    }

    evaluate(position) {
        let elevation = 0;
        let frequency = this.baseRoughness;
        let amplitude = 1;

        for (let i = 0; i < this.numLayers; i++) {
            let nextLayerNoise = this.simplex.noise3D(position.x * frequency, position.y * frequency, position.z * frequency) * 0.4;
            elevation += (nextLayerNoise + 1) * 0.5 * amplitude;

            frequency *= this.roughness;
            amplitude *= this.persistence;
        }

        elevation = Math.max(0, elevation - this.minHeight);

        return elevation * this.strength;
    }

}