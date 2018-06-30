import {Action} from '@ngrx/store';


export enum WaypointActionTypes {
    WAYPOINTS_EDIT = '[Waypoint List or Map] Edit waypoint',
    WAYPOINTS_UPDATE = '[Edit Waypoint Dialog] Update waypoint',
    WAYPOINTS_DELETE = '[Waypoint List or Map] Delete waypoint',
    WAYPOINTS_INSERT = '[Map] Insert waypoint',
    WAYPOINTS_REORDER = '[Waypoint List] Re-order waypoints',
    WAYPOINTS_REVERSE = '[Waypoint List] Reverse waypoints',
    WAYPOINTS_MOVE = '[Map] Move waypoint'
}


export class ReverseWaypointsAction implements Action {
    readonly type = WaypointActionTypes.WAYPOINTS_REVERSE;

    constructor() {}
}


export class InsertWaypointAction implements Action {
    readonly type = WaypointActionTypes.WAYPOINTS_INSERT;

    constructor() {}
}


export type WaypointsActions =
    ReverseWaypointsAction |
    InsertWaypointAction;
