import {Waypoint} from "../../flightroute/model/waypoint";
import {Position2d} from "../../model/geometry/position2d";
import {Angle} from "../../model/quantities/angle";


export interface MapState {
    position: Position2d;
    zoom: number;
    rotation: Angle;
    selectedWaypoint: Waypoint;
}
