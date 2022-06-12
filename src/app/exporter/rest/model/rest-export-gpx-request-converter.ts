import {Flightroute} from '../../../flightroute/domain/model/flightroute';
import {RestFlightrouteConverter} from '../../../flightroute/rest/model/rest-flightroute-converter';
import {Track} from '../../../track/domain/model/track';
import {RestTrackConverter} from '../../../track/rest/model/rest-track-converter';
import {IRestExportGpxRequest} from './i-rest-export-gpx-request';


export class RestExportGpxRequestConverter {
    public static toRest(flightroute: Flightroute, track: Track): IRestExportGpxRequest {
        return {
            action: 'exportgpx',
            flightroute: RestFlightrouteConverter.toRest(flightroute),
            track: RestTrackConverter.toRest(track),
        };
    }
}
