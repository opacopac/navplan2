import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Time} from '../../../geo-physics/domain/model/quantities/time';


export class StepAltitudeMetadata {
    public displayAlt: Length;
    public minTerrainClearanceAlt: Length;
    public flightTime: Time;
    public climbTime: Time;
    public warning: string;


    constructor(
        public readonly stepDist: Length,
        public readonly elevationAmsl: Length,
    ) {
    }
}
