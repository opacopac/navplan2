import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {RestFlightrouteConverter} from '../../../flightroute/rest/converter/rest-flightroute-converter';
import {IRestExportFplRequest} from './i-rest-export-fpl-request';


export class RestExportFplRequestConverter {
    public static toRest(flightroute: Flightroute): IRestExportFplRequest {
        return {
            flightroute: RestFlightrouteConverter.toRest(flightroute),
        };
    }
}
