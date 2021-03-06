import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Navaid} from './navaid';


export interface NavaidState {
    extent: Extent2d;
    zoom: number;
    navaids: Navaid[];
}
