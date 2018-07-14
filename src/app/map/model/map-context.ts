import * as ol from 'openlayers';
import {MapService} from '../services/map.service';
import {Store} from '@ngrx/store';


export class MapContext {
    constructor(
        public appStore: Store<any>,
        public map: ol.Map,
        public mapService: MapService) {
    }
}
