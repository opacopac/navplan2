import {AltitudeMetadata} from './altitude-metadata';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Time} from '../../../geo-physics/domain/model/quantities/time';


export class StepAltitudeMetadata {
    public wp: Waypoint;
    public minUserAlt: Length;
    public maxUserAlt: Length;
    public minEnvelopeAlt: Length;
    public maxEnvelopeAlt: Length;
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
