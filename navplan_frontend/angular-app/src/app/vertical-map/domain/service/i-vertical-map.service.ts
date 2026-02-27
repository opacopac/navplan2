import {Observable} from 'rxjs';
import {VerticalMap} from '../model/vertical-map';
import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {ForecastSelection} from '../../../meteo-forecast/domain/model/forecast-selection';
import {VerticalMapWaypointStep} from '../model/vertical-map-waypoint-step';
import {VerticalMapTerrainStep} from '../model/vertical-map-terrain-step';
import {LegAltitudeMetadata} from '../model/leg-altitude-metadata';
import {Aircraft} from '../../../aircraft/domain/model/aircraft';


export abstract class IVerticalMapService {
    abstract readVerticalMap(flightroute: Flightroute, fcSelection: ForecastSelection): Observable<VerticalMap>;

    abstract calcLegAltitudeMetadata(
        waypointSteps: VerticalMapWaypointStep[],
        terrainSteps: VerticalMapTerrainStep[],
        aircraft: Aircraft
    ): LegAltitudeMetadata[];
}
