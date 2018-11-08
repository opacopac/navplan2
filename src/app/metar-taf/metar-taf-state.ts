import {Extent} from '../shared/model/extent';
import {MetarTafList} from './model/metar-taf';


export interface MetarTafState {
    extent: Extent;
    zoom: number;
    metarTafList: MetarTafList;
}
