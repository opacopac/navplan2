import {createAction, props} from '@ngrx/store';
import {Webcam} from '../domain-model/webcam';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';


export class WebcamActions {
    public static readonly readWebcams = createAction(
        '[Flight Map] Read webcams by extent',
        props<{ extent: Extent2d, zoom: number }>()
    );
    public static readonly showWebcams = createAction(
        '[Webcam Effects] Show webcams on map',
        props<{ extent: Extent2d, zoom: number, webcams: Webcam[] }>()
    );
    public static readonly openWebcam = createAction(
        '[Flight Map] Open webcam',
        props<{ webcam: Webcam }>()
    );
}
