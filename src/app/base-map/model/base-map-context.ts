import * as ol from 'openlayers';
import {BaseMapService} from '../services/base-map.service';
import {Store} from '@ngrx/store';


export class BaseMapContext {
    constructor(
        public appStore: Store<any>,
        public map: ol.Map,
        public mapService: BaseMapService) {
    }
}
