import {Mapfeatures} from './model/mapfeatures';
import {Extent} from '../shared/model/extent';


export interface MapFeaturesState {
    extent: Extent;
    zoom: number;
    mapFeatures: Mapfeatures;
}
