import {Extent} from '../shared/model/extent';
import {NotamList} from './model/notam';


export interface NotamState {
    extent: Extent;
    zoom: number;
    notamList: NotamList;
}
