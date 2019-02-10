import {Clonable} from '../../shared/model/clonable';


// region ENUMS

export enum AircraftClass {
    AMPHIBIAN,
    GYROCOPTER,
    HELICOPTER,
    LANDPLANE,
    SEAPLANE,
    TILTROTOR,
    UNKNOWN
}


export enum EngineClass {
    ELECTRIC,
    JET,
    PISTON,
    ROCKET,
    TURBOPROP,
    UNKNOWN
}


// endregion


export class TrafficDetails implements Clonable<TrafficDetails> {
    constructor(
        public icao24?: string,
        public registration?: string,
        public model?: string,
        public manufacturer?: string,
        public acType?: string,
        public acClass: AircraftClass = AircraftClass.UNKNOWN,
        public engineClass: EngineClass = EngineClass.UNKNOWN)
    {
    }


    public clone(): TrafficDetails {
        return new TrafficDetails(
            this.icao24,
            this.registration,
            this.model,
            this.manufacturer,
            this.acType,
            this.acClass,
            this.engineClass
        );
    }
}
