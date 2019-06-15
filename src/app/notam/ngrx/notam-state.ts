import {Extent2d} from '../../shared/model/geometry/extent2d';
import {NotamList} from '../domain/notam-list';


export interface NotamState {
    extent: Extent2d;
    zoom: number;
    notamList: NotamList;
}
