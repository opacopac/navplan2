import {IRestLength} from '../../common/geo-math/rest-model/i-rest-length';
import {IRestVerticalMapAirspace} from './i-rest-vertical-map-airspace';


export interface IRestVerticalMap {
    mapHeight: IRestLength;
    mapWidth: IRestLength;
    heightUnit: string;
    widthUnit: string;
    waypointSteps: [number, number][];
    terrainSteps: [number, number][];
    vmAirspaces: IRestVerticalMapAirspace[];
}
