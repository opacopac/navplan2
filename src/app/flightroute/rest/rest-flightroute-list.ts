import {FlightrouteListEntry} from '../domain/flightroute-list-entry';
import {IRestFlightrouteListResponse} from './i-rest-flightroute-list-response';
import {RestFlightrouteListEntry} from './rest-flightroute-list-entry';


export class RestFlightrouteList {
    public static fromRest(restResponse: IRestFlightrouteListResponse): FlightrouteListEntry[] {
        if (!restResponse.navplanList || restResponse.navplanList.length === 0) {
            return [];
        }

        const flightrouteList: FlightrouteListEntry[] = [];
        for (let i = 0; i < restResponse.navplanList.length; i++) {
            const listEntry = RestFlightrouteListEntry.fromRest(restResponse.navplanList[i]);
            flightrouteList.push(listEntry);
        }

        return flightrouteList;
    }
}
