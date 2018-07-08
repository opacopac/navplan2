import {Action} from '@ngrx/store';


export enum TrafficActionTypes {
    TRAFFIC_TOGGLE_WATCH = '[Traffic button] toggle watch',
}


export class ToggleWatchTrafficAction implements Action {
    readonly type = TrafficActionTypes.TRAFFIC_TOGGLE_WATCH;

    constructor() {}
}


export type TrafficActions =
    ToggleWatchTrafficAction;
