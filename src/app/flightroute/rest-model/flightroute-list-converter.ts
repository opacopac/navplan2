import {FlightrouteListEntry} from '../domain-model/flightroute-list-entry';
import {IRestFlightrouteListResponse} from './i-rest-flightroute-list-response';
import {FlightrouteListEntryConverter} from './flightroute-list-entry-converter';


export class FlightrouteListConverter {
    public static fromRest(restResponse: IRestFlightrouteListResponse): FlightrouteListEntry[] {
        if (!restResponse.navplanList || restResponse.navplanList.length === 0) {
            return [];
        }

        const flightrouteList: FlightrouteListEntry[] = [];
        for (let i = 0; i < restResponse.navplanList.length; i++) {
            const listEntry = FlightrouteListEntryConverter.fromRest(restResponse.navplanList[i]);
            flightrouteList.push(listEntry);
        }

        return flightrouteList;
    }
}
