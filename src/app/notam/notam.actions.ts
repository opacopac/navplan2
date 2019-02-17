import {Action} from '@ngrx/store';
import {Extent2d} from '../shared/model/extent2d';
import {NotamList} from './model/notam';


export enum NotamActionTypes {
    NOTAM_LOAD_SUCCESS = '[NotamService] Load NOTAM success',
    NOTAM_LOAD_ERROR = '[NotamService] Load NOTAM error',
}


export class LoadNotamSuccessAction implements Action {
    readonly type = NotamActionTypes.NOTAM_LOAD_SUCCESS;

    constructor(
        public notamList: NotamList,
        public extent: Extent2d,
        public zoom: number) {}
}


export class LoadNotamErrorAction implements Action {
    readonly type = NotamActionTypes.NOTAM_LOAD_ERROR;

    constructor(public error: Error) {}
}


export type NotamActions =
    LoadNotamSuccessAction |
    LoadNotamErrorAction;
