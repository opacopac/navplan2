import {Map} from 'ol';
import {OlMapService} from '../use-case/ol-map.service';
import {Store} from '@ngrx/store';


export class OlMapContext {
    constructor(
        public appStore: Store<any>,
        public map: Map,
        public mapService: OlMapService) {
    }
}
