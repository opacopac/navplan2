import {AircraftListEntry} from '../../domain/model/aircraft-list-entry';
import {IRestAircraftListEntry} from '../model/i-rest-aircraft-list-entry';


export class RestAircraftListEntryConverter {
    public static fromRest(restListEntry: IRestAircraftListEntry): AircraftListEntry {
        return new AircraftListEntry(
            restListEntry.id,
            restListEntry.registration,
            restListEntry.type
        );
    }
}
