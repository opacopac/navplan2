import {Extent2d} from '../../shared/model/geometry/extent2d';
import {NotamList} from './notam-list';


export interface NotamState {
    extent: Extent2d;
    zoom: number;
    notamList: NotamList;
}
