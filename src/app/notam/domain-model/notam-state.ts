import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {NotamList} from './notam-list';


export interface NotamState {
    extent: Extent2d;
    zoom: number;
    notamList: NotamList;
    timestampMs: number;
}
