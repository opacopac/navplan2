import {Action} from '@ngrx/store';
import {Waypoint} from './model/waypoint';


export enum WaypointActionTypes {
    WAYPOINTS_EDIT = '[Waypoint page] Edit waypoint',
    WAYPOINTS_EDIT_SAVE = '[Edit waypoint dialog] Save edited waypoint',
    WAYPOINTS_EDIT_CANCEL = '[Edit waypoint dialog] Cancel edited waypoint',
    WAYPOINTS_DELETE = '[Waypoint page] Delete waypoint',
    WAYPOINTS_REORDER = '[Waypoint page] Re-order waypoints',
    WAYPOINTS_REVERSE = '[Waypoint pist] Reverse waypoints',
}


export class EditWaypointAction implements Action {
    readonly type = WaypointActionTypes.WAYPOINTS_EDIT;

    constructor(public waypoint: Waypoint) {}
}


export class SaveEditWaypointAction implements Action {
    readonly type = WaypointActionTypes.WAYPOINTS_EDIT_SAVE;

    constructor(public waypoint: Waypoint) {}
}


export class CancelEditWaypointAction implements Action {
    readonly type = WaypointActionTypes.WAYPOINTS_EDIT_CANCEL;

    constructor() {}
}


export class DeleteWaypointAction implements Action {
    readonly type = WaypointActionTypes.WAYPOINTS_DELETE;

    constructor(public waypoint: Waypoint) {}
}


export class ReverseWaypointsAction implements Action {
    readonly type = WaypointActionTypes.WAYPOINTS_REVERSE;

    constructor() {}
}


export type WaypointsActions =
    EditWaypointAction |
    SaveEditWaypointAction |
    CancelEditWaypointAction |
    DeleteWaypointAction |
    ReverseWaypointsAction;
