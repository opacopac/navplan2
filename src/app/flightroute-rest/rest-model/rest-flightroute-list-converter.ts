import {FlightrouteListEntry} from '../../flightroute/domain-model/flightroute-list-entry';
import {IRestFlightrouteListResponse} from './i-rest-flightroute-list-response';
import {RestFlightrouteListEntryConverter} from './rest-flightroute-list-entry-converter';


export class RestFlightrouteListConverter {
    public static fromRest(restResponse: IRestFlightrouteListResponse): FlightrouteListEntry[] {
        if (!restResponse.navplanList || restResponse.navplanList.length === 0) {
            return [];
        }

        const flightrouteList: FlightrouteListEntry[] = [];
        for (let i = 0; i < restResponse.navplanList.length; i++) {
            const listEntry = RestFlightrouteListEntryConverter.fromRest(restResponse.navplanList[i]);
            flightrouteList.push(listEntry);
        }

        return flightrouteList;
    }
}
