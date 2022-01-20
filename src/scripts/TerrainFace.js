import { Vector2, Vector3 } from "three";

export default class TerrainFace {

    #resolution;
    #vertexIdOffset;
    #localUp;
    #planet;

    #axisA;
    #axisB;

    #elevations = [];

    #vertices = [];
    #indices = [];

    constructor(resolution, vertexIdOffset, localUp, planet) {
        this.#resolution = resolution;
        this.#vertexIdOffset = vertexIdOffset;
        this.#localUp = localUp;
        this.#planet = planet;

        this.#axisA = new Vector3(localUp.y, localUp.z, localUp.x);
        this.#axisB = new Vector3().crossVectors(localUp, this.#axisA);

        this.constructMesh();
    }

    constructMesh() {
        for (let y = 0; y < this.#resolution; y++) {
            for (let x = 0; x < this.#resolution; x++) {
                let percent = new Vector2(x, y).divideScalar(this.#resolution - 1);
                let pointOnUnitCube = this.#localUp.clone().add(this.#axisA.clone().multiplyScalar((percent.x - 0.5) * 2)).add(this.#axisB.clone().multiplyScalar((percent.y - 0.5) * 2));
                let pointOnUnitSphere = pointOnUnitCube.clone().normalize();

                let elevation = this.#planet.calculateElevation(pointOnUnitSphere);
                pointOnUnitSphere.multiplyScalar(elevation);

                this.#elevations.push(elevation);
                this.#vertices.push(...pointOnUnitSphere);

                if (x !== this.#resolution - 1 && y !== this.#resolution - 1) {
                    let i = (x + y * this.#resolution) + this.#vertexIdOffset;

                    // Triangle 1
                    this.#indices.push(i, i + this.#resolution + 1, i + this.#resolution);

                    // Triangle 2
                    this.#indices.push(i, i + 1, i + this.#resolution + 1);
                }
            }
        }
    }

    getVertices() {
        return this.#vertices;
    }

    getIndices() {
        return this.#indices;
    }

    getElevations() {
        return this.#elevations;
    }
}