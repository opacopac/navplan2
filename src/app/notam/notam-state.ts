import {Extent2d} from '../shared/model/extent2d';
import {NotamList} from './model/notam';


export interface NotamState {
    extent: Extent2d;
    zoom: number;
    notamList: NotamList;
}
