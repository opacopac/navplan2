import {Extent} from '../../shared/model/extent';
import {NotamList} from './notam';


export interface NotamState {
    extent: Extent;
    zoom: number;
    notamList: NotamList;
}
