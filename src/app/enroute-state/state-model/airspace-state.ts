import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {Airspace} from '../../enroute/domain-model/airspace';


export interface AirspaceState {
    extent: Extent2d;
    zoom: number;
    airspaces: Airspace[];
}
