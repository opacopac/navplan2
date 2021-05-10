import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {MetarTafList} from '../domain-model/metar-taf';


export interface MetarTafState {
    extent: Extent2d;
    zoom: number;
    metarTafList: MetarTafList;
    timestampMs: number;
}
