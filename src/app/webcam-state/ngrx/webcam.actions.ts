import {createAction, props} from '@ngrx/store';
import {Webcam} from '../../webcam/domain-model/webcam';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';


export class WebcamActions {
    public static readonly update = createAction(
        '[FlightMapEffects] Update webcams',
        props<{ extent: Extent2d, zoom: number }>()
    );

    public static readonly updateSuccess = createAction(
        '[Webcam Effects] Update webcams success',
        props<{ extent: Extent2d, zoom: number, webcams: Webcam[] }>()
    );

    public static readonly show = createAction(
        '[FlightMapEffects] Show webcam',
        props<{ webcam: Webcam }>()
    );
}
