import {Action} from '@ngrx/store';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Airspace} from '../domain-model/airspace';


export enum AirspaceActionTypes {
    READ_AIRSPACE_BY_EXTENT = '[Airspace] Read airspaces by extent',
    READ_AIRSPACE_BY_EXTENT_SUCCESS = '[Airspace] Read airspaces by extent SUCCESS',
    READ_AIRSPACE_BY_EXTENT_ERROR = '[Airspace] Read airspaces by extent ERROR',
}


export class ReadAirspacesByExtentAction implements Action {
    readonly type = AirspaceActionTypes.READ_AIRSPACE_BY_EXTENT;

    constructor(
        public extent: Extent2d,
        public zoom: number
    ) {}
}


export class ReadAirspacesByExtentSuccessAction implements Action {
    readonly type = AirspaceActionTypes.READ_AIRSPACE_BY_EXTENT_SUCCESS;

    constructor(public airspaces: Airspace[]) {}
}


export class ReadAirspacesByExtentErrorAction implements Action {
    readonly type = AirspaceActionTypes.READ_AIRSPACE_BY_EXTENT_ERROR;

    constructor(public error: Error) {}
}


export type AirspaceActions =
    ReadAirspacesByExtentAction |
    ReadAirspacesByExtentSuccessAction |
    ReadAirspacesByExtentErrorAction;
