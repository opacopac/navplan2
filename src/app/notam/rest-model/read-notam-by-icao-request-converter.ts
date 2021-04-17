import {environment} from '../../../environments/environment';
import {ReadNotamByIcaoRequest} from '../domain-model/read-notam-by-icao-request';


export class ReadNotamByIcaoRequestConverter {
    public static toUrl(request: ReadNotamByIcaoRequest): string {
        return environment.notamRestServiceUrl + '?action=searchByIcao'
            + '&searchItems=notams'
            + '&icao=' + request.icaoList.join(',')
            + '&minnotamtime=' + request.starttimestamp
            + '&maxnotamtime=' + request.endtimestamp;
    }
}
