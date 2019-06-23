import {FlightrouteListEntry} from '../domain/flightroute-list-entry';
import {IRestFlightrouteListEntry} from './i-rest-flightroute-list-entry';


export class RestFlightrouteListEntry {
    public static fromRest(restListEntry: IRestFlightrouteListEntry): FlightrouteListEntry {
        return new FlightrouteListEntry(restListEntry.id, restListEntry.title);
    }
}
