import {IRestAltitude} from '../../geo-physics-rest/rest-model/i-rest-altitude';


export interface IRestVerticalMapAirspace {
    airspaceId: number;
    airspaceCategory: string;
    airspaceName: string;
    altBottom: IRestAltitude;
    altTop: IRestAltitude;
    airspaceSteps: [number, number, number][];
}
