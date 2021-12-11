import {IRestAltitude} from '../../common/geo-math/rest-model/i-rest-altitude';
import {IRestCircle} from '../../common/geo-math/rest-model/i-rest-circle';


export interface IRestNotamGeometry {
    circle: IRestCircle;
    polygon: [number, number][];
    multipolygon: [[number, number][]];
    alt_top: IRestAltitude;
    alt_bottom: IRestAltitude;
}
