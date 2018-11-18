import {Action} from '@ngrx/store';
import {Traffic} from './model/traffic';


export enum TrafficActionTypes {
    TRAFFIC_WATCH_TOGGLE = '[Traffic button] toggle watch',
    TRAFFIC_WATCH_START = '[TrafficEffects] start watch',
    TRAFFIC_WATCH_STOP = '[TrafficEffects] stop watch',
    TRAFFIC_READ_TIMER = '[TrafficEffects] read timer',
    TRAFFIC_READ_OGN_SUCCESS = '[TrafficOgnService] read ogn traffic success',
    TRAFFIC_READ_OGN_ERROR = '[TrafficOgnService] read ogn traffic error',
    TRAFFIC_READ_ADSBEX_SUCCESS = '[TrafficAdsbExService] read adsbEx traffic success',
    TRAFFIC_READ_ADSBEX_ERROR = '[TrafficAdsbEXService] read adsbEx traffic error',
}


export class ToggleWatchTrafficAction implements Action {
    readonly type = TrafficActionTypes.TRAFFIC_WATCH_TOGGLE;

    constructor() {}
}


export class StartWatchTrafficAction implements Action {
    readonly type = TrafficActionTypes.TRAFFIC_WATCH_START;

    constructor() {}
}


export class StopWatchTrafficAction implements Action {
    readonly type = TrafficActionTypes.TRAFFIC_WATCH_STOP;

    constructor() {}
}


export class ReadTrafficTimerAction implements Action {
    readonly type = TrafficActionTypes.TRAFFIC_READ_TIMER;

    constructor(public count: number) {}
}


export class ReadOgnTrafficSuccessAction implements Action {
    readonly type = TrafficActionTypes.TRAFFIC_READ_OGN_SUCCESS;

    constructor(public traffic: Traffic[]) {}
}


export class ReadOgnTrafficSuccessError implements Action {
    readonly type = TrafficActionTypes.TRAFFIC_READ_OGN_ERROR;

    constructor(public error: Error) {}
}


export class ReadAdsbExTrafficSuccessAction implements Action {
    readonly type = TrafficActionTypes.TRAFFIC_READ_ADSBEX_SUCCESS;

    constructor(public traffic: Traffic[]) {}
}


export class ReadAdsbExTrafficSuccessError implements Action {
    readonly type = TrafficActionTypes.TRAFFIC_READ_ADSBEX_ERROR;

    constructor(public error: Error) {}
}


export type TrafficActions =
    ToggleWatchTrafficAction |
    StartWatchTrafficAction |
    StopWatchTrafficAction |
    ReadTrafficTimerAction |
    ReadOgnTrafficSuccessAction |
    ReadOgnTrafficSuccessError |
    ReadAdsbExTrafficSuccessAction |
    ReadAdsbExTrafficSuccessError;
