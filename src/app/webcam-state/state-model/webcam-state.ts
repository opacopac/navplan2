import {Webcam} from '../../webcam/domain-model/webcam';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';


export interface WebcamState {
    extent: Extent2d;
    zoom: number;
    webcams: Webcam[];
}
