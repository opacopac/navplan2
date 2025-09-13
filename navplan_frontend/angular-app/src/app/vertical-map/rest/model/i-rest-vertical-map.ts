import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';
import {IRestVerticalMapAirspace} from './i-rest-vertical-map-airspace';
import {IRestVerticalCloudColumn} from '../../../meteo-forecast/rest/model/i-rest-vertical-cloud-column';
import {IRestVerticalWindColumn} from '../../../meteo-forecast/rest/model/i-rest-vertical-wind-column';


export interface IRestVerticalMap {
    mapHeight: IRestLength;
    mapWidth: IRestLength;
    heightUnit: string;
    widthUnit: string;
    waypointSteps: [number, number][];
    terrainSteps: [number, number][];
    vmAirspaces: IRestVerticalMapAirspace[];
    verticalCloudColumns: IRestVerticalCloudColumn[];
    verticalWindColumns: IRestVerticalWindColumn[];
}
