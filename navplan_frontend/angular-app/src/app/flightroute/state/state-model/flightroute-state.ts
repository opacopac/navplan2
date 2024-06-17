import {Flightroute} from '../../domain/model/flightroute';
import {FlightrouteListEntry} from '../../domain/model/flightroute-list-entry';


export interface FlightrouteState {
    flightrouteList: FlightrouteListEntry[];
    flightroute: Flightroute;
    showShareId: string;
}
