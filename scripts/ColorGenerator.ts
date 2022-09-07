import { MathUtils, Vector3 } from "three";

export default class ColorGenerator {

  private readonly colors: Vector3[];
  private readonly positions: number[];

    constructor(colors: Vector3[], positions: number[]) {
        this.colors = colors;
        this.positions = positions;
    }

    evaluate(elevation: number, min: number, max: number): Vector3 {
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
