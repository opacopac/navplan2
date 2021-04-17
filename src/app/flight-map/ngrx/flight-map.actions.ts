import {Action} from '@ngrx/store';


export enum FlightMapActionTypes {
    FLIGHT_MAP_ACTIVATE = '[Flight Map] activate flight map',
}


export class FlightMapActivateAction implements Action {
    readonly type = FlightMapActionTypes.FLIGHT_MAP_ACTIVATE;

    constructor(public isActive: boolean) {}
}


export type FlightMapActions =
    FlightMapActivateAction;
