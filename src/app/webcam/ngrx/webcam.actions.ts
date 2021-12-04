import {createAction, props} from '@ngrx/store';
import {Webcam} from '../domain-model/webcam';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';


export class WebcamActions {
    public static readonly readWebcams = createAction(
        '[FlightMapEffects] Read webcams',
        props<{ extent: Extent2d, zoom: number }>()
    );

    public static readonly readWebcamsSuccess = createAction(
        '[Webcam Effects] Read webcams success',
        props<{ extent: Extent2d, zoom: number, webcams: Webcam[] }>()
    );
}
