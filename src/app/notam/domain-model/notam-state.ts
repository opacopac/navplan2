import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Notam} from './notam';


export interface NotamState {
    extent: Extent2d;
    zoom: number;
    notamList: Notam[];
    timestampMs: number;
}
