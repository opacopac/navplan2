import {AltitudeMetadata} from './altitude-metadata';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {VerticalMapTerrainStep} from './vertical-map-terrain-step';


export class LegAltitudeMetadata {
    public readonly startAlt = new AltitudeMetadata();
    public readonly endAlt = new AltitudeMetadata();
    public minTerrainClearanceAlt: Length;


    constructor(
        public readonly wpStart: Waypoint,
        public readonly wpEnd: Waypoint,
        public readonly isFirstLegFromAirport: boolean,
        public readonly isLastLegToAirport: boolean,
        public readonly startLength: Length,
        public readonly endLength: Length,
        public readonly terrainSteps: VerticalMapTerrainStep[]
    ) {
    }
}
