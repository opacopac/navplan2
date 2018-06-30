import {Action} from '@ngrx/store';
import {FlightrouteListEntry} from "../model/flightroute/flightroute-list-entry";
import {Flightroute} from "./model/flightroute";


export enum FlightrouteActionTypes {
    FLIGHTROUTE_LIST_READ = '[Flightroute] Read flightroute list',
    FLIGHTROUTE_LIST_READ_SUCCESS = '[FlightrouteService] Read flightroute list success',
    FLIGHTROUTE_LIST_READ_ERROR = '[FlightrouteService] Read flightroute list error',
    FLIGHTROUTE_READ = '[Flightroute] Read flightroute',
    FLIGHTROUTE_READ_SUCCESS = '[FlightrouteService] Read flightroute success',
    FLIGHTROUTE_READ_ERROR = '[FlightrouteService] Read flightroute error',
    FLIGHTROUTE_CREATE = '[Flightroute] Create flightroute',
    FLIGHTROUTE_UPDATE = '[Flightroute] Update flightroute',
    FLIGHTROUTE_DUPLICATE = '[Flightroute] Duplicate flightroute',
    FLIGHTROUTE_SAVE_SUCCESS = '[FlightrouteService] Save/duplicate flightroute success',
    FLIGHTROUTE_SAVE_ERROR = '[FlightrouteService] Save/duplicate flightroute error',
    FLIGHTROUTE_DELETE = '[Flightroute] Delete flightroute',
    FLIGHTROUTE_DELETE_SUCCESS = '[FlightrouteService] Delete flightroute success',
    FLIGHTROUTE_DELETE_ERROR = '[FlightrouteService] Delete flightroute error',
    FLIGHTROUTE_READ_SHARED = '[Router] Read shared flightroute',
    FLIGHTROUTE_READ_SHARED_SUCCESS = '[FlightrouteService] Read shared flightroute success',
    FLIGHTROUTE_READ_SHARED_ERROR = '[FlightrouteService] Read shared flightroute error',
    FLIGHTROUTE_CREATE_SHARED = '[Flightroute] Create shared flightroute',
    FLIGHTROUTE_CREATE_SHARED_SUCCESS = '[FlightrouteService] Create shared flightroute success',
    FLIGHTROUTE_CREATE_SHARED_ERROR = '[FlightrouteService] Create shared flightroute error',
    FLIGHTROUTE_HIDE_SHARED_URL = '[Share flightroute URL dialog] Hide shared URL',
    FLIGHTROUTE_UPDATE_AIRCRAFT_SPEED = '[Flightroute Page] Update aircraft speed',
    FLIGHTROUTE_UPDATE_AIRCRAFT_CONSUMPTION = '[Flightroute Page] Update aircraft consumption',
    FLIGHTROUTE_UPDATE_EXTRA_TIME = '[Flightroute Page] Update extra time',
    FLIGHTROUTE_UPDATE_TITLE = '[Flightroute Page] Update route title',
    FLIGHTROUTE_UPDATE_COMMENTS = '[Flightroute Page] Update route comments',
}


// region flightroute list

export class ReadFlightrouteListAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_LIST_READ;

    constructor() {}
}


export class ReadFlightrouteListSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_LIST_READ_SUCCESS;

    constructor(public flightrouteList: FlightrouteListEntry[]) {}
}


export class ReadFlightrouteListErrorAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_LIST_READ_ERROR;

    constructor(public error: string) {}
}

// endregion


// region flightroute CRUD

export class ReadFlightrouteAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_READ;

    constructor(public flightrouteId: number) {}
}


export class ReadFlightrouteSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_READ_SUCCESS;

    constructor(public flightroute: Flightroute) {}
}


export class ReadFlightrouteErrorAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_READ_ERROR;

    constructor(public error: string) {}
}


export class CreateFlightrouteAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_CREATE;

    constructor() {}
}


export class UpdateFlightrouteAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE;

    constructor() {}
}


export class DuplicateFlightrouteAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_DUPLICATE;

    constructor() {}
}


export class SaveFlightrouteSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_SAVE_SUCCESS;

    constructor(public flightroute: Flightroute) {}
}


export class SaveFlightrouteErrorAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_SAVE_ERROR;

    constructor(public error: string) {}
}


export class DeleteFlightrouteAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_DELETE;

    constructor(public flightrouteId: number) {}
}


export class DeleteFlightrouteSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_DELETE_SUCCESS;

    constructor() {}
}


export class DeleteFlightrouteErrorAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_DELETE_ERROR;

    constructor(public error: string) {}
}

// endregion


// region shared flightroute

export class ReadSharedFlightrouteAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_READ_SHARED;

    constructor(public shareId: string) {}
}


export class ReadSharedFlightrouteSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_READ_SHARED_SUCCESS;

    constructor(public flightroute: Flightroute) {}
}


export class ReadSharedFlightrouteErrorAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_READ_SHARED_ERROR;

    constructor(public error: string) {}
}


export class CreateSharedFlightrouteAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_CREATE_SHARED;

    constructor() {}
}


export class CreateSharedFlightrouteSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_CREATE_SHARED_SUCCESS;

    constructor(public shareId: string) {}
}


export class CreateSharedFlightrouteErrorAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_CREATE_SHARED_ERROR;

    constructor(public error: string) {}
}


export class HideSharedFlightrouteUrlAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_HIDE_SHARED_URL;

    constructor() {}
}

// endregion


// region flightroute parameters (title/speed/fuel/comments)

export class UpdateAircraftSpeed implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE_AIRCRAFT_SPEED;

    constructor(public aircraftSpeedValue: number) {}
}


export class UpdateAircraftConsumption implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE_AIRCRAFT_CONSUMPTION;

    constructor(public aircraftConsumptionValue: number) {}
}


export class UpdateExtraTime implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE_EXTRA_TIME;

    constructor(public extraTimeValue: number) {}
}


export class UpdateFlightrouteTitle implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE_TITLE;

    constructor(public title: string) {}
}


export class UpdateFlightrouteComments implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE_COMMENTS;

    constructor(public comments: string) {}
}

// endregion


export type FlightrouteActions =
    ReadFlightrouteListAction
    | ReadFlightrouteListSuccessAction
    | ReadFlightrouteListErrorAction
    | ReadFlightrouteAction
    | ReadFlightrouteSuccessAction
    | ReadFlightrouteErrorAction
    | CreateFlightrouteAction
    | UpdateFlightrouteAction
    | DuplicateFlightrouteAction
    | SaveFlightrouteSuccessAction
    | SaveFlightrouteErrorAction
    | DeleteFlightrouteAction
    | DeleteFlightrouteSuccessAction
    | DeleteFlightrouteErrorAction
    | ReadSharedFlightrouteAction
    | ReadSharedFlightrouteSuccessAction
    | ReadSharedFlightrouteErrorAction
    | CreateSharedFlightrouteAction
    | CreateSharedFlightrouteSuccessAction
    | CreateSharedFlightrouteErrorAction
    | HideSharedFlightrouteUrlAction
    | UpdateAircraftSpeed
    | UpdateAircraftConsumption
    | UpdateExtraTime
    | UpdateFlightrouteTitle
    | UpdateFlightrouteComments;
