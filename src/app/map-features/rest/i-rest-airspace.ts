import {IRestAltitude} from '../../shared/model/rest/i-rest-altitude';
import {IRestPolygon} from '../../shared/model/rest/i-rest-polygon';


export interface IRestAirspace {
    id: number;
    aip_id: number;
    category: string;
    country: string;
    name: string;
    alt_bottom: IRestAltitude;
    alt_top: IRestAltitude;
    polygon: IRestPolygon;
}
