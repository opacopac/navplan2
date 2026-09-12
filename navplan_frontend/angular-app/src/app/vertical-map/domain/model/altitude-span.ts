import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class AltitudeSpan {
    constructor(
        public minAlt: Length | undefined,
        public maxAlt: Length | undefined
    ) {
    }


    public static empty(): AltitudeSpan {
        return new AltitudeSpan(undefined, undefined);
    }


    public clone(): AltitudeSpan {
        return new AltitudeSpan(this.minAlt, this.maxAlt);
    }
}
