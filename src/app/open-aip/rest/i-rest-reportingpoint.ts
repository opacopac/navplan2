import {IRestPosition2d} from '../../geo-math/rest/i-rest-position2d';
import {IRestPolygon} from '../../geo-math/rest/i-rest-polygon';
import {IRestAltitude} from '../../geo-math/rest/i-rest-altitude';


export interface IRestReportingpoint {
    id: number;
    type: string;
    airport_icao: string;
    name: string;
    heli: boolean;
    inbd_comp: boolean;
    outbd_comp: boolean;
    alt_min?: IRestAltitude;
    alt_max?: IRestAltitude;
    pos?: IRestPosition2d;
    polygon?: IRestPolygon;
}
