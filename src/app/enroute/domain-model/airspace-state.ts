import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Airspace} from './airspace';


export interface AirspaceState {
    extent: Extent2d;
    zoom: number;
    airspaces: Airspace[];
}
