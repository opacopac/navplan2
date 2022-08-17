import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {RestFlightrouteConverter} from '../../../flightroute/rest/converter/rest-flightroute-converter';
import {Track} from '../../../track/domain/model/track';
import {IRestExportKmlRequest} from './i-rest-export-kml-request';
import {RestTrackConverter} from '../../../track/rest/model/rest-track-converter';


export class RestExportKmlRequestConverter {
    public static toRest(flightroute: Flightroute, track: Track): IRestExportKmlRequest {
        return {
            action: 'exportkml',
            flightroute: RestFlightrouteConverter.toRest(flightroute),
            track: RestTrackConverter.toRest(track),
        };
    }
}
