import {Extent2d} from '../shared/model/geometry/extent2d';
import {MetarTafList} from './model/metar-taf';


export interface MetarTafState {
    extent: Extent2d;
    zoom: number;
    metarTafList: MetarTafList;
}
