import {Action} from '@ngrx/store';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Webcam} from '../domain-model/webcam';


export enum WebcamActionTypes {
    READ_WEBCAMS_BY_EXTENT = '[Webcam] Read webcams by extent',
    READ_WEBCAMS_BY_EXTENT_SUCCESS = '[Webcam] Read webcams by extent SUCCESS',
    READ_WEBCAMS_BY_EXTENT_ERROR = '[Webcam] Read webcams by extent ERROR',
}


export class ReadWebcamsByExtentAction implements Action {
    readonly type = WebcamActionTypes.READ_WEBCAMS_BY_EXTENT;

    constructor(
        public extent: Extent2d,
        public zoom: number
    ) {}
}


export class ReadWebcamsByExtentSuccessAction implements Action {
    readonly type = WebcamActionTypes.READ_WEBCAMS_BY_EXTENT_SUCCESS;

    constructor(public webcams: Webcam[]) {}
}


export class ReadWebcamsByExtentErrorAction implements Action {
    readonly type = WebcamActionTypes.READ_WEBCAMS_BY_EXTENT_ERROR;

    constructor(public error: Error) {}
}


export type WebcamActions =
    ReadWebcamsByExtentAction |
    ReadWebcamsByExtentSuccessAction |
    ReadWebcamsByExtentErrorAction;
