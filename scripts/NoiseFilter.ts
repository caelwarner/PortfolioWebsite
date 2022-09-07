import { NoiseFunction3D, createNoise3D } from "simplex-noise";
import alea from "alea";
import { Vector3 } from "three";

export default abstract class NoiseFilter {
	protected strength: number;
	protected numLayers: number;
	protected baseRoughness: number;
	protected roughness: number;
	protected persistence: number;
	protected minHeight: number;
	private readonly useFirstLayerAsMask: boolean;
	protected noise: NoiseFunction3D;

	protected constructor(strength: number, numLayers: number, baseRoughness: number, roughness: number, persistence: number, minHeight: number, useFirstLayerAsMask: boolean, seed: number) {
		this.strength = strength;
		this.numLayers = numLayers;
		this.baseRoughness = baseRoughness;
		this.roughness = roughness;
		this.persistence = persistence;
		this.minHeight = minHeight;
		this.useFirstLayerAsMask = useFirstLayerAsMask;
		this.noise = createNoise3D(alea(seed));
	}

	abstract evaluate(position: Vector3): number;

	shouldUseFirstLayerAsMask(): boolean {
		return this.useFirstLayerAsMask;
	}
}
