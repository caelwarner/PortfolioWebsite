import { Vector2, Vector3 } from "three";
import Planet from "~/scripts/Planet";

export default class TerrainFace {
  private readonly resolution: number;
  private readonly vertexIdOffset: number;
  private localUp: Vector3;
  private planet: Planet;

  private readonly axisA: Vector3;
  private readonly axisB: Vector3;

  private readonly vertices: number[] = [];
  private readonly indices: number[] = [];
  private readonly elevations: number[] = [];

    constructor(resolution: number, vertexIdOffset: number, localUp: Vector3, planet: Planet) {
        this.resolution = resolution;
        this.vertexIdOffset = vertexIdOffset;
        this.localUp = localUp;
        this.planet = planet;

        this.axisA = new Vector3(localUp.y, localUp.z, localUp.x);
        this.axisB = new Vector3().crossVectors(localUp, this.axisA);

        this.constructMesh();
    }

    constructMesh(): void {
		const percent = new Vector2();
		const pointOnUnitSphere = new Vector3();

        for (let y = 0; y < this.resolution; y++) {
            for (let x = 0; x < this.resolution; x++) {
				percent.set(x, y).divideScalar(this.resolution - 1);
				pointOnUnitSphere.copy(this.localUp).addScaledVector(this.axisA, (percent.x - 0.5) * 2).addScaledVector(this.axisB, (percent.y - 0.5) * 2).normalize();

                let elevation = this.planet.calculateElevation(pointOnUnitSphere);
                pointOnUnitSphere.multiplyScalar(elevation);

                this.elevations.push(elevation);
                this.vertices.push(pointOnUnitSphere.x, pointOnUnitSphere.y, pointOnUnitSphere.z);

                if (x !== this.resolution - 1 && y !== this.resolution - 1) {
                    let i = (x + y * this.resolution) + this.vertexIdOffset;

                    // Triangle 1
                    this.indices.push(i, i + this.resolution + 1, i + this.resolution);

                    // Triangle 2
                    this.indices.push(i, i + 1, i + this.resolution + 1);
                }
            }
        }
    }

    getVertices(): number[] {
        return this.vertices;
    }

    getIndices(): number[] {
        return this.indices;
    }

    getElevations(): number[] {
        return this.elevations;
    }
}
