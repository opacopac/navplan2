import {Action} from '@ngrx/store';


export enum FlightMapActionTypes {
    FLIGHT_MAP_DUMMY = '[Flight Map] Dummy Action',
}


export class FlightMapDummyAction implements Action {
    readonly type = FlightMapActionTypes.FLIGHT_MAP_DUMMY;

    constructor() {}
}


export type FlightMapActions =
    FlightMapDummyAction;
