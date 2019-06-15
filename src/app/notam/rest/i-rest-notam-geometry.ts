import {IRestAltitude} from '../../shared/model/rest/i-rest-altitude';
import {IRestCircle} from '../../shared/model/rest/i-rest-circle';


export interface IRestNotamGeometry {
    circle: IRestCircle;
    polygon: [number, number][];
    multipolygon: [[number, number][]];
    alt_top: IRestAltitude;
    alt_bottom: IRestAltitude;
}
