import {OpenAipItems} from './domain/open-aip-items';
import {Extent2d} from '../shared/model/geometry/extent2d';


export interface MapFeaturesState {
    extent: Extent2d;
    zoom: number;
    mapFeatures: OpenAipItems;
}
