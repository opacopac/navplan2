import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';


export interface MetarTafState {
    extent: Extent2d;
    zoom: number;
    timestamp: number;
    metarTafs: MetarTaf[];
}
