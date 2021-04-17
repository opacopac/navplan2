import {BaseMapService} from '../domain-service/base-map.service';

interface BaseMapLayer {
    clear();

    addFeature(feature: BaseMapService);
}
