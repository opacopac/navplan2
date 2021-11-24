import {IRestAltitude} from '../../common/geo-math/rest-model/i-rest-altitude';


export interface IRestWaypointAltitude {
    alt: IRestAltitude;
    isminalt: boolean;
    ismaxalt: boolean;
    isaltatlegstart: boolean;
}
