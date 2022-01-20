import { MathUtils } from "three";

export default class ColorGenerator {

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