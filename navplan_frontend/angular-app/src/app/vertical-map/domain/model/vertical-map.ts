import {VerticalMapWaypointStep} from './vertical-map-waypoint-step';
import {VerticalMapTerrainStep} from './vertical-map-terrain-step';
import {VerticalMapAirspace} from './vertical-map-airspace';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {VerticalCloudColumn} from '../../../meteo-forecast/domain/model/vertical-cloud-column';
import {VerticalWindColumn} from '../../../meteo-forecast/domain/model/vertical-wind-column';
import {LegAltitudeMetadata} from './leg-altitude-metadata';


export class VerticalMap {
    public legAltitudeMetadataList: LegAltitudeMetadata[];

    constructor(
        public mapHeight: Length,
        public mapWidth: Length,
        public waypointSteps: VerticalMapWaypointStep[],
        public terrainSteps: VerticalMapTerrainStep[],
        public vmAirspaces: VerticalMapAirspace[],
        public verticalCloudColumns: VerticalCloudColumn[],
        public verticalWindColumns: VerticalWindColumn[]
    ) {
    }
}
