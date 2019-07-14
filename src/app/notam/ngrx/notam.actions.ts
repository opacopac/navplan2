import {Action} from '@ngrx/store';
import {Extent2d} from '../../geo-math/domain/geometry/extent2d';
import {ReadNotamByExtentResult} from '../domain/read-notam-by-extent-result';


export enum NotamActionTypes {
    NOTAM_READ = '[NavMapEffects] Read NOTAMs',
    NOTAM_READ_SUCCESS = '[NotamEffects] Read NOTAMs success',
    NOTAM_READ_ERROR = '[NotamEffects] Read NOTAMs error',
}


export class ReadNotamAction implements Action {
    readonly type = NotamActionTypes.NOTAM_READ;

    constructor(
        public extent: Extent2d,
        public zoom: number
    ) {}
}


export class ReadNotamSuccessAction implements Action {
    readonly type = NotamActionTypes.NOTAM_READ_SUCCESS;

    constructor(public result: ReadNotamByExtentResult) {}
}


export class ReadNotamErrorAction implements Action {
    readonly type = NotamActionTypes.NOTAM_READ_ERROR;

    constructor(public error: Error) {}
}


export type NotamActions =
    ReadNotamAction |
    ReadNotamSuccessAction |
    ReadNotamErrorAction;
