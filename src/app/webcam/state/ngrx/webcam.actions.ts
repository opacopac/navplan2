import {createAction, props} from '@ngrx/store';
import {Webcam} from '../../domain/model/webcam';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';


export class WebcamActions {
    public static readonly readSuccess = createAction(
        '[Webcam Effects] Read webcams success',
        props<{ extent: Extent2d, zoom: number, webcams: Webcam[] }>()
    );

    public static readonly show = createAction(
        '[FlightMapEffects] Show webcam',
        props<{ webcam: Webcam }>()
    );
}
