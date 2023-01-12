import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';
import {IRestVerticalMapAirspace} from './i-rest-vertical-map-airspace';
import {IRestVerticalCloudColumn} from '../../../meteo-dwd/rest/model/i-rest-vertical-cloud-column';


export interface IRestVerticalMap {
    mapHeight: IRestLength;
    mapWidth: IRestLength;
    heightUnit: string;
    widthUnit: string;
    waypointSteps: [number, number][];
    terrainSteps: [number, number][];
    vmAirspaces: IRestVerticalMapAirspace[];
    verticalCloudColumns: IRestVerticalCloudColumn[];
}
