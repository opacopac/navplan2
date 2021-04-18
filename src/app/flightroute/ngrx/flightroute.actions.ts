import {Action} from '@ngrx/store';
import {FlightrouteListEntry} from '../domain-model/flightroute-list-entry';
import {Flightroute} from '../domain-model/flightroute';
import {Waypoint} from '../domain-model/waypoint';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';


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
    SHARED_FLIGHTROUTE_READ = '[Router] Read shared flightroute',
    SHARED_FLIGHTROUTE_READ_SUCCESS = '[FlightrouteService] Read shared flightroute success',
    SHARED_FLIGHTROUTE_READ_ERROR = '[FlightrouteService] Read shared flightroute error',
    SHARED_FLIGHTROUTE_CREATE = '[Flightroute] Create shared flightroute',
    SHARED_FLIGHTROUTE_CREATE_SUCCESS = '[FlightrouteService] Create shared flightroute success',
    SHARED_FLIGHTROUTE_CREATE_ERROR = '[FlightrouteService] Create shared flightroute error',
    SHARED_FLIGHTROUTE_HIDE_URL = '[Share flightroute URL dialog] Hide shared URL',
    FLIGHTROUTE_UPDATE_AIRCRAFT_SPEED = '[Flightroute Page] Update aircraft speed',
    FLIGHTROUTE_UPDATE_AIRCRAFT_CONSUMPTION = '[Flightroute Page] Update aircraft consumption',
    FLIGHTROUTE_UPDATE_EXTRA_TIME = '[Flightroute Page] Update extra time',
    FLIGHTROUTE_UPDATE_TITLE = '[Flightroute Page] Update route title',
    FLIGHTROUTE_UPDATE_COMMENTS = '[Flightroute Page] Update route comments',
    FLIGHTROUTE_EXPORT_PDF = '[Flightroute Page] Export route as PDF',
    FLIGHTROUTE_EXPORT_EXCEL = '[Flightroute Page] Export route as Excel',
    WAYPOINT_UPDATE = '[Edit Waypoint Dialog] Update waypoint',
    WAYPOINT_DELETE = '[Waypoint Page / MapFeature Overlay] Delete waypoint',
    WAYPOINT_INSERT = '[MapFeature Overlay] Add waypoint',
    WAYPOINT_REPLACE = '[Waypoint Page] Update waypoint',
    WAYPOINT_REVERSE = '[Waypoint List] Reverse waypoints',
    WAYPOINT_ROUTELINE_MODIFIED = '[NavMap] Route line modified',
    WAYPOINT_SET_ALTERNATE = '[MapFeature Overlay] Set alternate',
    FLIGHTROUTE_UPDATE_RECALC = '[FlightrouteEffects] Flightroute recalculated'
}


// region flightroute list

export class FlightrouteReadListAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_LIST_READ;

    constructor() {}
}


export class FlightrouteReadListSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_LIST_READ_SUCCESS;

    constructor(public flightrouteList: FlightrouteListEntry[]) {}
}


export class FlightrouteReadListErrorAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_LIST_READ_ERROR;

    constructor(public error: Error) {}
}

// endregion


// region flightroute CRUD

export class FlightrouteReadAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_READ;

    constructor(public flightrouteId: number) {}
}


export class FlightrouteReadSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_READ_SUCCESS;

    constructor(public flightroute: Flightroute) {}
}


export class FlightrouteReadErrorAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_READ_ERROR;

    constructor(public error: Error) {}
}


export class FlightrouteCreateAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_CREATE;

    constructor() {}
}


export class FlightrouteUpdateAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE;

    constructor() {}
}


export class FlightrouteDuplicateAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_DUPLICATE;

    constructor(public flightrouteId: number) {}
}


export class FlightrouteSaveSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_SAVE_SUCCESS;

    constructor(public flightroute: Flightroute) {}
}


export class FlightrouteSaveErrorAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_SAVE_ERROR;

    constructor(public error: Error) {}
}


export class FlightrouteDeleteAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_DELETE;

    constructor(public flightrouteId: number) {}
}


export class FlightrouteDeleteSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_DELETE_SUCCESS;

    constructor() {}
}


export class FlightrouteDeleteErrorAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_DELETE_ERROR;

    constructor(public error: Error) {}
}

// endregion


// region shared flightroute

export class SharedFlightrouteReadAction implements Action {
    readonly type = FlightrouteActionTypes.SHARED_FLIGHTROUTE_READ;

    constructor(public shareId: string) {}
}


export class SharedFlightrouteReadSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.SHARED_FLIGHTROUTE_READ_SUCCESS;

    constructor(public flightroute: Flightroute) {}
}


export class SharedFlightrouteReadErrorAction implements Action {
    readonly type = FlightrouteActionTypes.SHARED_FLIGHTROUTE_READ_ERROR;

    constructor(public error: Error) {}
}


export class SharedFlightrouteCreateAction implements Action {
    readonly type = FlightrouteActionTypes.SHARED_FLIGHTROUTE_CREATE;

    constructor() {}
}


export class SharedFlightrouteCreateSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.SHARED_FLIGHTROUTE_CREATE_SUCCESS;

    constructor(public shareId: string) {}
}


export class SharedFlightrouteCreateErrorAction implements Action {
    readonly type = FlightrouteActionTypes.SHARED_FLIGHTROUTE_CREATE_ERROR;

    constructor(public error: Error) {}
}


export class SharedFlightrouteHideUrlAction implements Action {
    readonly type = FlightrouteActionTypes.SHARED_FLIGHTROUTE_HIDE_URL;

    constructor() {}
}

// endregion


// region flightroute parameters (title/speed/fuel/comments)

export class UpdateAircraftSpeedAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE_AIRCRAFT_SPEED;

    constructor(public aircraftSpeedValue: number) {}
}


export class UpdateAircraftConsumptionAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE_AIRCRAFT_CONSUMPTION;

    constructor(public aircraftConsumptionValue: number) {}
}


export class UpdateExtraTimeAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE_EXTRA_TIME;

    constructor(public extraTimeMinutesValue: number) {}
}


export class UpdateFlightrouteTitleAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE_TITLE;

    constructor(public title: string) {}
}


export class UpdateFlightrouteCommentsAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE_COMMENTS;

    constructor(public comments: string) {}
}

// endregion


// region flightroute exports

export class ExportFlightroutePdfAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_EXPORT_PDF;

    constructor(public flightrouteId: number) {}
}


export class ExportFlightrouteExcelAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_EXPORT_EXCEL;

    constructor(public flightrouteId: number) {}
}

// endregion


// region waypoints

export class UpdateWaypointAction implements Action {
    readonly type = FlightrouteActionTypes.WAYPOINT_UPDATE;

    constructor(
        public oldWp: Waypoint,
        public newWp: Waypoint) {}
}


export class DeleteWaypointAction implements Action {
    readonly type = FlightrouteActionTypes.WAYPOINT_DELETE;

    constructor(public waypoint: Waypoint) {}
}


export class InsertWaypointAction implements Action {
    readonly type = FlightrouteActionTypes.WAYPOINT_INSERT;

    constructor(
        public newWaypoint: Waypoint,
        public index: number) {}
}


export class ReplaceWaypointAction implements Action {
    readonly type = FlightrouteActionTypes.WAYPOINT_REPLACE;

    constructor(
        public newWaypoint: Waypoint,
        public index: number) {}
}


export class ReverseWaypointsAction implements Action {
    readonly type = FlightrouteActionTypes.WAYPOINT_REVERSE;

    constructor() {}
}


export class RouteLineModifiedAction implements Action {
    readonly type = FlightrouteActionTypes.WAYPOINT_ROUTELINE_MODIFIED;

    constructor(
        public index: number,
        public isNewWaypoint: boolean,
        public newPosition: Position2d) {}
}


export class SetAlternateAction implements Action {
    readonly type = FlightrouteActionTypes.WAYPOINT_SET_ALTERNATE;

    constructor(public alternate: Waypoint) {}
}


export class FlightrouteRecalcSuccessAction implements Action {
    readonly type = FlightrouteActionTypes.FLIGHTROUTE_UPDATE_RECALC;

    constructor(public newFlightroute: Flightroute) {}
}


// endregion


export type FlightrouteActions =
    FlightrouteReadListAction
    | FlightrouteReadListSuccessAction
    | FlightrouteReadListErrorAction
    | FlightrouteReadAction
    | FlightrouteReadSuccessAction
    | FlightrouteReadErrorAction
    | FlightrouteCreateAction
    | FlightrouteUpdateAction
    | FlightrouteDuplicateAction
    | FlightrouteSaveSuccessAction
    | FlightrouteSaveErrorAction
    | FlightrouteDeleteAction
    | FlightrouteDeleteSuccessAction
    | FlightrouteDeleteErrorAction
    | SharedFlightrouteReadAction
    | SharedFlightrouteReadSuccessAction
    | SharedFlightrouteReadErrorAction
    | SharedFlightrouteCreateAction
    | SharedFlightrouteCreateSuccessAction
    | SharedFlightrouteCreateErrorAction
    | SharedFlightrouteHideUrlAction
    | UpdateAircraftSpeedAction
    | UpdateAircraftConsumptionAction
    | UpdateExtraTimeAction
    | UpdateFlightrouteTitleAction
    | UpdateFlightrouteCommentsAction
    | ExportFlightroutePdfAction
    | ExportFlightrouteExcelAction
    | UpdateWaypointAction
    | DeleteWaypointAction
    | InsertWaypointAction
    | ReplaceWaypointAction
    | ReverseWaypointsAction
    | SetAlternateAction
    | FlightrouteRecalcSuccessAction;
