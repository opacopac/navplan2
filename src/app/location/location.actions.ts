import {Action} from '@ngrx/store';
import {Position4d} from '../shared/model/geometry/position4d';
import {Track} from './model/track';


export enum LocationActionTypes {
    LOCATION_WATCH_TOGGLE = '[Location button] toggle watch',
    LOCATION_WATCH_START = '[LocationEffects] start watch',
    LOCATION_WATCH_STOP = '[LocationEffects] stop watch',
    LOCATION_READ_TIMER_SUCCESS = '[LocationEffects] read location success',
    LOCATION_READ_TIMER_ERROR = '[LocationEffects] read location error',
    LOCATION_TIMER_GET_INTERIM_TIME = '[Timer Button] get interim time',
    LOCATION_READ_TRACK_LIST = '[Tracks Page] read track list',
    LOCATION_READ_TRACK_LIST_SUCCESS = '[Tracks Service] read track list success',
    LOCATION_READ_TRACK_LIST_ERROR = '[Tracks Service] read track list error',
    LOCATION_READ_TRACK = '[Tracks Page] read track',
    LOCATION_READ_TRACK_SUCCESS = '[Tracks Service] read track success',
    LOCATION_READ_TRACK_ERROR = '[Tracks Service] read track error',
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


export class ReadTrackListAction implements Action {
    readonly type = LocationActionTypes.LOCATION_READ_TRACK_LIST;

    constructor() {}
}


export class ReadTrackListSuccessAction implements Action {
    readonly type = LocationActionTypes.LOCATION_READ_TRACK_LIST_SUCCESS;

    constructor(public trackList: Track[]) {}
}


export class ReadTrackListErrorAction implements Action {
    readonly type = LocationActionTypes.LOCATION_READ_TRACK_LIST_ERROR;

    constructor(public error: string) {}
}


export class ReadTrackAction implements Action {
    readonly type = LocationActionTypes.LOCATION_READ_TRACK;

    constructor(public id: number) {}
}


export class ReadTrackSuccessAction implements Action {
    readonly type = LocationActionTypes.LOCATION_READ_TRACK_SUCCESS;

    constructor(public track: Track) {}
}


export class ReadTrackErrorAction implements Action {
    readonly type = LocationActionTypes.LOCATION_READ_TRACK_ERROR;

    constructor(public error: string) {}
}


export type LocationActions =
    ToggleWatchLocationAction |
    StartWatchLocationAction |
    StopWatchLocationAction |
    ReadLocationSuccessAction |
    ReadLocationErrorAction |
    TimerGetInterimTimeAction |
    ReadTrackListAction |
    ReadTrackListSuccessAction |
    ReadTrackListErrorAction |
    ReadTrackAction |
    ReadTrackSuccessAction |
    ReadTrackErrorAction;
