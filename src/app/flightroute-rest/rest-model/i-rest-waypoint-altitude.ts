import {IRestAltitude} from '../../geo-physics-rest/rest-model/i-rest-altitude';


export interface IRestWaypointAltitude {
    alt: IRestAltitude;
    isminalt: boolean;
    ismaxalt: boolean;
    isaltatlegstart: boolean;
}
