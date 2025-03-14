import {IRestFlightroute} from '../../../flightroute/rest/model/i-rest-flightroute';
import {IRestTrack} from '../../../track/rest/model/i-rest-track';


export interface IRestExportGpxRequest {
    flightroute: IRestFlightroute;
    track: IRestTrack;
}
