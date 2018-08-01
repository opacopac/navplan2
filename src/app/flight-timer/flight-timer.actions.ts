import {Action} from '@ngrx/store';


export enum FlightTimerActionTypes {
    FLIGHTTIMER_GET_INTERIM_TIME = '[Timer Button] get interim time',
}


export class TimerGetInterimTimeAction implements Action {
    readonly type = FlightTimerActionTypes.FLIGHTTIMER_GET_INTERIM_TIME;

    constructor(public interimTime: Date) {}
}


export type FlightTimerActions =
    TimerGetInterimTimeAction;
