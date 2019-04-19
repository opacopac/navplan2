import {Mapfeatures} from './model/mapfeatures';
import {Extent2d} from '../shared/model/geometry/extent2d';


export interface MapFeaturesState {
    extent: Extent2d;
    zoom: number;
    mapFeatures: Mapfeatures;
}
