import {Map} from 'ol';
import {BaseMapService} from '../services/base-map.service';
import {Store} from '@ngrx/store';


export class BaseMapContext {
    constructor(
        public appStore: Store<any>,
        public map: Map,
        public mapService: BaseMapService) {
    }
}
