import {Action} from '@ngrx/store';
import {Waypoint} from './model/waypoint';


export enum WaypointActionTypes {
    WAYPOINTS_EDIT = '[Waypoint page] Edit waypoint',
    WAYPOINTS_UPDATE = '[Edit waypoint dialog] Update waypoint',
    WAYPOINTS_DELETE = '[Waypoint page] Delete waypoint',
    WAYPOINTS_REORDER = '[Waypoint page] Re-order waypoints',
    WAYPOINTS_REVERSE = '[Waypoint pist] Reverse waypoints',
}


export class EditWaypointAction implements Action {
    readonly type = WaypointActionTypes.WAYPOINTS_EDIT;

    constructor(waypoint: Waypoint) {}
}


export class UpdateWaypointAction implements Action {
    readonly type = WaypointActionTypes.WAYPOINTS_UPDATE;

    constructor(waypoint: Waypoint) {}
}


export class DeleteWaypointAction implements Action {
    readonly type = WaypointActionTypes.WAYPOINTS_DELETE;

    constructor(waypoint: Waypoint) {}
}


export class ReverseWaypointsAction implements Action {
    readonly type = WaypointActionTypes.WAYPOINTS_REVERSE;

    constructor() {}
}


export type WaypointsActions =
    EditWaypointAction |
    UpdateWaypointAction |
    DeleteWaypointAction |

    ReverseWaypointsAction;
