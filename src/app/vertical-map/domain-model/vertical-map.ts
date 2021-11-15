import {VerticalMapWaypointStep} from './vertical-map-waypoint-step';
import {VerticalMapTerrainStep} from './vertical-map-terrain-step';
import {VerticalMapAirspace} from './vertical-map-airspace';
import {Length} from '../../common/geo-math/domain-model/quantities/length';


export class VerticalMap {
    constructor(
        public mapHeight: Length,
        public mapWidth: Length,
        public waypointSteps: VerticalMapWaypointStep[],
        public terrainSteps: VerticalMapTerrainStep[],
        public vmAirspaces: VerticalMapAirspace[]
    ) {
    }
}
