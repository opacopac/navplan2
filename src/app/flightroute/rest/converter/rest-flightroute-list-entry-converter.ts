import {FlightrouteListEntry} from '../../domain/model/flightroute-list-entry';
import {IRestFlightrouteListEntry} from '../model/i-rest-flightroute-list-entry';


export class RestFlightrouteListEntryConverter {
    public static fromRest(restListEntry: IRestFlightrouteListEntry): FlightrouteListEntry {
        return new FlightrouteListEntry(restListEntry.id, restListEntry.title);
    }
}
