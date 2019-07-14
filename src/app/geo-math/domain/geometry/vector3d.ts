export class Vector3d {
    public constructor(
        public x: number,
        public y: number,
        public z: number,
    ) {
    }


    public multiply(factor: number): Vector3d {
        return new Vector3d(
            this.x * factor,
            this.y * factor,
            this.z * factor
        );
    }


    public cross(vect: Vector3d): Vector3d {
        return new Vector3d(
            this.y * vect.z - this.z * vect.y,
            this.z * vect.x - this.x * vect.z,
            this.x * vect.y - this.y * vect.x
        );
    }


    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }


    public normalize(): Vector3d {
        const len = this.length();

        return this.multiply(1 / len);
    }
}
