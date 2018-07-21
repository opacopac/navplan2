import {Action} from '@ngrx/store';
import {Position4d} from '../shared/model/geometry/position4d';


export enum LocationActionTypes {
    LOCATION_WATCH_TOGGLE = '[Location button] toggle watch',
    LOCATION_WATCH_START = '[LocationEffects] start watch',
    LOCATION_WATCH_STOP = '[LocationEffects] stop watch',
    LOCATION_READ_TIMER_SUCCESS = '[LocationEffects] read location success',
    LOCATION_READ_TIMER_ERROR = '[LocationEffects] read location error',
    LOCATION_TIMER_GET_INTERIM_TIME = '[Timer Button] get interim time'
}


export class ToggleWatchLocationAction implements Action {
    readonly type = LocationActionTypes.LOCATION_WATCH_TOGGLE;

    constructor() {}
}


export class StartWatchLocationAction implements Action {
    readonly type = LocationActionTypes.LOCATION_WATCH_START;

    constructor() {}
}


export class StopWatchLocationAction implements Action {
    readonly type = LocationActionTypes.LOCATION_WATCH_STOP;

    constructor() {}
}


export class ReadLocationSuccessAction implements Action {
    readonly type = LocationActionTypes.LOCATION_READ_TIMER_SUCCESS;

    constructor(public position: Position4d) {}
}


export class ReadLocationErrorAction implements Action {
    readonly type = LocationActionTypes.LOCATION_READ_TIMER_ERROR;

    constructor(public error: string) {}
}


export class TimerGetInterimTimeAction implements Action {
    readonly type = LocationActionTypes.LOCATION_TIMER_GET_INTERIM_TIME;

    constructor(public interimTime: Date) {}
}


export type LocationActions =
    ToggleWatchLocationAction |
    StartWatchLocationAction |
    StopWatchLocationAction |
    ReadLocationSuccessAction |
    ReadLocationErrorAction |
    TimerGetInterimTimeAction;