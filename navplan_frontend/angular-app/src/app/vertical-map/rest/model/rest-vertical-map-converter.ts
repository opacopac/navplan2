import {VerticalMap} from '../../domain/model/vertical-map';
import {IRestVerticalMap} from './i-rest-vertical-map';
import {RestVerticalMapWaypointStepConverter} from './rest-vertical-map-waypoint-step-converter';
import {RestVerticalMapTerrainStepConverter} from './rest-vertical-map-terrain-step-converter';
import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';
import {RestVerticalMapAirspaceConverter} from './rest-vertical-map-airspace-converter';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {RestVerticalCloudColumnConverter} from '../../../meteo-dwd/rest/model/rest-vertical-cloud-column-converter';
import {RestVerticalWindColumnConverter} from '../../../meteo-dwd/rest/model/rest-vertical-wind-column-converter';


export class RestVerticalMapConverter {
    public static fromRest(
        verticalMap: IRestVerticalMap
    ): VerticalMap {
        const heightUnit = LengthUnit.FT; // TODO: read from response
        const widthUnit = LengthUnit.M; // TODO: read from response
        return new VerticalMap(
            RestLengthConverter.fromRest(verticalMap.mapHeight),
            RestLengthConverter.fromRest(verticalMap.mapWidth),
            RestVerticalMapWaypointStepConverter.fromRestList(verticalMap.waypointSteps, heightUnit, widthUnit),
            RestVerticalMapTerrainStepConverter.fromRestList(verticalMap.terrainSteps, heightUnit, widthUnit),
            RestVerticalMapAirspaceConverter.fromRestList(verticalMap.vmAirspaces, heightUnit, widthUnit),
            RestVerticalCloudColumnConverter.fromRestList(verticalMap.verticalCloudColumns),
            RestVerticalWindColumnConverter.fromRestList(verticalMap.verticalWindColumns)
        );
    }
}
