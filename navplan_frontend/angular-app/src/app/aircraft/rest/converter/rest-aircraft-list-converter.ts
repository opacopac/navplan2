import {IRestAircraftListResponse} from '../model/i-rest-aircraft-list-response';
import {AircraftListEntry} from '../../domain/model/aircraft-list-entry';
import {RestAircraftListEntryConverter} from './rest-aircraft-list-entry-converter';


export class RestAircraftListConverter {
    public static fromRest(restResponse: IRestAircraftListResponse): AircraftListEntry[] {
        if (!restResponse.aircraftList || restResponse.aircraftList.length === 0) {
            return [];
        }

        const aircraftList: AircraftListEntry[] = [];
        for (let i = 0; i < restResponse.aircraftList.length; i++) {
            const listEntry = RestAircraftListEntryConverter.fromRest(restResponse.aircraftList[i]);
            aircraftList.push(listEntry);
        }

        return aircraftList;
    }
}
