export class Vector3d {
    public constructor(
        public x: number,
        public y: number,
        public z: number,
    ) {
    }


    public cross(vect: Vector3d): Vector3d {
        return new Vector3d(
            this.y * vect.z - this.z * vect.y,
            this.z * vect.x - this.x * vect.z,
            this.x * vect.y - this.y * vect.x
        );
    }
}
