import { Consumption } from "../../../geo-physics/domain/model/quantities/consumption";
import { Speed } from "../../../geo-physics/domain/model/quantities/speed";


export class AircraftListEntry {
    constructor(
        public readonly id: number,
        public readonly registration: string,
        public readonly model: string,
        public readonly speed: Speed,
        public readonly consumption: Consumption
    ) {
    }
}
