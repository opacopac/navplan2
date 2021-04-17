import {Map} from 'ol';
import {OlBaseMapService} from '../ol-service/ol-base-map.service';
import {Store} from '@ngrx/store';


export class BaseMapContext {
    constructor(
        public appStore: Store<any>,
        public map: Map,
        public mapService: OlBaseMapService) {
    }
}
