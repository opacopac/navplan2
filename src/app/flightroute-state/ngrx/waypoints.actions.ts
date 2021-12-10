import {createAction, props} from '@ngrx/store';
import {Waypoint} from '../../flightroute/domain-model/waypoint';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';


export class WaypointActions {
    public static readonly insert = createAction(
        '[Map Overlay] Insert waypoint',
        props<{ newWaypoint: Waypoint, index: number }>()
    );
    public static readonly insertByPos = createAction(
        '[Route Line Interaction] Insert object at position',
        props<{ newPosition: Position2d, index: number, zoom: number }>()
    );
    public static readonly update = createAction(
        '[Edit Waypoint Dialog] Update waypoint',
        props<{ oldWp: Waypoint, newWp: Waypoint }>()
    );
    public static readonly replace = createAction(
        '[Waypoint Page] Replace waypoint',
        props<{ newWaypoint: Waypoint, index: number }>()
    );
    public static readonly replaceByPos = createAction(
        '[Route Line Interaction] Replace waypoint by object at position',
        props<{ newPosition: Position2d, index: number, zoom: number }>()
    );
    public static readonly delete = createAction(
        '[Waypoint Page / MapFeature Overlay] Delete waypoint',
        props<{ waypoint: Waypoint }>()
    );
    public static readonly reverse = createAction(
        '[Waypoint List] Reverse waypoints'
    );
    public static readonly setAlternate = createAction(
        '[Map Overlay] Set alternate',
        props<{ alternate: Waypoint }>()
    );
}
