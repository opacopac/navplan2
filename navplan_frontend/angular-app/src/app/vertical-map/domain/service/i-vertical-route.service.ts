import {VerticalMapWaypointStep} from '../model/vertical-map-waypoint-step';
import {VerticalMapTerrainStep} from '../model/vertical-map-terrain-step';
import {VerticalRouteLeg} from '../model/vertical-route-leg';
import {Aircraft} from '../../../aircraft/domain/model/aircraft';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export abstract class IVerticalRouteService {
    abstract calcLegAltitudeMetadata(
        waypointSteps: VerticalMapWaypointStep[],
        terrainSteps: VerticalMapTerrainStep[],
        cruiseAltitude: Length,
        aircraft: Aircraft
    ): VerticalRouteLeg[];
}
