import {IRestFlightroute} from '../../flightroute/rest-model/i-rest-flightroute';
import {IRestTrack} from '../../track-rest/rest-model/i-rest-track';


export interface IRestExportGpxRequest {
    action: string;
    flightroute: IRestFlightroute;
    track: IRestTrack;
}
