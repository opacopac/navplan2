import {createAction, props} from '@ngrx/store';
import {Webcam} from '../domain-model/webcam';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';


export class WebcamActions {
    public static readonly update = createAction(
        '[FlightMapEffects] Update webcams',
        props<{ extent: Extent2d, zoom: number }>()
    );

    public static readonly updateSuccess = createAction(
        '[Webcam Effects] Update webcams success',
        props<{ extent: Extent2d, zoom: number, webcams: Webcam[] }>()
    );
}
