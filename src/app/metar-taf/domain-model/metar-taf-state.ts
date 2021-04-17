import {Extent2d} from '../../geo-math/domain-model/geometry/extent2d';
import {MetarTafList} from './metar-taf';


export interface MetarTafState {
    extent: Extent2d;
    zoom: number;
    metarTafList: MetarTafList;
    timestampMs: number;
}
