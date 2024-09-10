import {AircraftType} from './aircraft-type';
import {EngineType} from './engine-type';

export class AircraftTypeDesignator {
    constructor(
        public id: number,
        public designator: string,
        public model: string,
        public manufacturer: string,
        public ac_type: AircraftType,
        public engine_type: EngineType,
        public engine_count: number,
        public wtc: string,
    ) {
    }


    public clone(): AircraftTypeDesignator {
        return new AircraftTypeDesignator(
            this.id,
            this.designator,
            this.model,
            this.manufacturer,
            this.ac_type,
            this.engine_type,
            this.engine_count,
            this.wtc
        );
    }
}
