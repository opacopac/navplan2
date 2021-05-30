import {environment} from '../../../environments/environment';
import {ReadNotamByIcaoRequest} from '../domain-model/read-notam-by-icao-request';


export class RestReadNotamByIcaoRequestConverter {
    public static toUrl(request: ReadNotamByIcaoRequest): string {
        return environment.notamRestServiceUrl + '?action=searchByIcao'
            + '&icao=' + request.airportIcao
            + '&starttimestamp=' + request.starttimestamp
            + '&endtimestamp=' + request.endtimestamp;
    }
}
