import {Extent2d} from '../../geo-math/domain/geometry/extent2d';
import {NotamList} from './notam-list';


export interface NotamState {
    extent: Extent2d;
    zoom: number;
    notamList: NotamList;
    timestampMs: number;
}
