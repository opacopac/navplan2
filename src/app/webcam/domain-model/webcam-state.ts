import {Webcam} from './webcam';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';


export interface WebcamState {
    extent: Extent2d;
    zoom: number;
    webcams: Webcam[];
}
