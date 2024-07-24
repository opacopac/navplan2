export class AircraftListEntry {
    constructor(
        public readonly id: number,
        public readonly vehicleType: string,
        public readonly registration: string,
        public readonly icaoType: string,
    ) {
    }
}
