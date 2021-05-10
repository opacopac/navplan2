import {Action} from '@ngrx/store';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Navaid} from '../domain-model/navaid';


export enum NavaidActionTypes {
    READ_NAVAID_BY_EXTENT = '[Navaid] Read navaids by extent',
    READ_NAVAID_BY_EXTENT_SUCCESS = '[Navaid] Read navaids by extent SUCCESS',
    READ_NAVAID_BY_EXTENT_ERROR = '[Navaid] Read navaids by extent ERROR',
}


export class ReadNavaidsByExtentAction implements Action {
    readonly type = NavaidActionTypes.READ_NAVAID_BY_EXTENT;

    constructor(
        public extent: Extent2d,
        public zoom: number
    ) {}
}


export class ReadNavaidsByExtentSuccessAction implements Action {
    readonly type = NavaidActionTypes.READ_NAVAID_BY_EXTENT_SUCCESS;

    constructor(public navaids: Navaid[]) {}
}


export class ReadNavaidsByExtentErrorAction implements Action {
    readonly type = NavaidActionTypes.READ_NAVAID_BY_EXTENT_ERROR;

    constructor(public error: Error) {}
}


export type NavaidActions =
    ReadNavaidsByExtentAction |
    ReadNavaidsByExtentSuccessAction |
    ReadNavaidsByExtentErrorAction;
