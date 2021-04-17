import {IRestAltitude} from '../../geo-math/rest-model/i-rest-altitude';
import {IRestCircle} from '../../geo-math/rest-model/i-rest-circle';


export interface IRestNotamGeometry {
    circle: IRestCircle;
    polygon: [number, number][];
    multipolygon: [[number, number][]];
    alt_top: IRestAltitude;
    alt_bottom: IRestAltitude;
}
