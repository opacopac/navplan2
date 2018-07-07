import {Position2d} from '../../shared/model/geometry/position2d';
import {Angle} from '../../shared/model/quantities/angle';
import {Waypoint} from '../../flightroute/model/waypoint';


export interface MapState {
    position: Position2d;
    zoom: number;
    rotation: Angle;
    selectedWaypoint: Waypoint;
}
