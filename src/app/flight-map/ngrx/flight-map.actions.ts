import {Action} from '@ngrx/store';


export enum FlightMapActionTypes {
    FLIGHT_MAP_CLOSE_ALL_OVERLAYS = '[Flight Map] Close all overlays action',
}


export class FlightMapCloseAllOverlaysAction implements Action {
    readonly type = FlightMapActionTypes.FLIGHT_MAP_CLOSE_ALL_OVERLAYS;

    constructor() {}
}


export type FlightMapActions =
    FlightMapCloseAllOverlaysAction;
