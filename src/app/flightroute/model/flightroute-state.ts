import {FlightrouteListEntry} from "../../model/flightroute/flightroute-list-entry";
import {Flightroute} from "./flightroute";


export interface FlightrouteState {
    flightrouteList: FlightrouteListEntry[],
    flightroute: Flightroute,
    showShareId: string,
}
