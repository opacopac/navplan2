import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {RestFlightrouteConverter} from '../../../flightroute/rest/model/rest-flightroute-converter';
import {IRestExportFplRequest} from './i-rest-export-fpl-request';


export class RestExportFplRequestConverter {
    public static toRest(flightroute: Flightroute): IRestExportFplRequest {
        return {
            action: 'exportfpl',
            flightroute: RestFlightrouteConverter.toRest(flightroute),
        };
    }
}
