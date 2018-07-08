import {Action} from '@ngrx/store';


export enum LocationActionTypes {
    LOCATION_TOGGLE_WATCH = '[Location button] toggle watch',
}


export class ToggleWatchLocationAction implements Action {
    readonly type = LocationActionTypes.LOCATION_TOGGLE_WATCH;

    constructor() {}
}


export type LocationActions =
    ToggleWatchLocationAction;
