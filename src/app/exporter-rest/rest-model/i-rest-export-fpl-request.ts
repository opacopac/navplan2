import {IRestFlightroute} from '../../flightroute-rest/rest-model/i-rest-flightroute';


export interface IRestExportFplRequest {
    action: string;
    flightroute: IRestFlightroute;
}
