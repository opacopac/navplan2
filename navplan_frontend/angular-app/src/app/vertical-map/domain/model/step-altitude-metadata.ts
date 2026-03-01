import {AltitudeMetadata} from './altitude-metadata';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class StepAltitudeMetadata {
    public wp: Waypoint;
    public alt = new AltitudeMetadata();
    public minUserAlt: Length;
    public maxUserAlt: Length;
    public minEnvelopeAlt: Length;
    public maxEnvelopeAlt: Length;
    public minTerrainClearanceAlt: Length;


    constructor(
        public readonly stepDist: Length,
        public readonly elevationAmsl: Length,
    ) {
    }
}
