import {Action} from '@ngrx/store';
import {TrafficMap} from '../domain-model/traffic-map';


export enum TrafficActionTypes {
    TRAFFIC_WATCH_TOGGLE = '[Traffic button] toggle watch',
    TRAFFIC_WATCH_START = '[TrafficEffects] start watch',
    TRAFFIC_WATCH_STOP = '[TrafficEffects] stop watch',
    TRAFFIC_TIMER_TICK = '[TrafficEffects] timer tick',
    TRAFFIC_READ_SUCCESS = '[TrafficEffects] read traffic success',
    TRAFFIC_READ_ERROR = '[TrafficEffects] read traffic error',
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
    readonly type = TrafficActionTypes.TRAFFIC_TIMER_TICK;

    constructor(public count: number) {}
}


export class ReadTrafficSuccessAction implements Action {
    readonly type = TrafficActionTypes.TRAFFIC_READ_SUCCESS;

    constructor(public newTrafficMap: TrafficMap) {}
}


export class ReadTrafficErrorAction implements Action {
    readonly type = TrafficActionTypes.TRAFFIC_READ_ERROR;

    constructor(public error: Error) {}
}


export type TrafficActions =
    ToggleWatchTrafficAction |
    StartWatchTrafficAction |
    StopWatchTrafficAction |
    ReadTrafficTimerAction |
    ReadTrafficSuccessAction |
    ReadTrafficErrorAction;
