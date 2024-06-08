import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {Navaid} from '../../domain/model/navaid';


export interface NavaidState {
    extent: Extent2d;
    zoom: number;
    navaids: Navaid[];
}
