import {FlightrouteListEntry} from '../../model/flightroute/flightroute-list-entry';
import {Flightroute} from './flightroute';
import {Waypoint} from './waypoint';


export interface FlightrouteState {
    flightrouteList: FlightrouteListEntry[];
    flightroute: Flightroute;
    editWaypoint: Waypoint;
    showShareId: string;
}
