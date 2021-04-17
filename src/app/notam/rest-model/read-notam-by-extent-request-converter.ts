import {ReadNotamByExtentRequest} from '../domain-model/read-notam-by-extent-request';
import {environment} from '../../../environments/environment';


export class ReadNotamByExtentRequestConverter {
    public static toUrl(request: ReadNotamByExtentRequest): string {
        return environment.notamRestServiceUrl + '?action=searchByExtent'
            + '&starttimestamp=' + request.starttimestamp
            + '&endtimestamp=' + request.endtimestamp
            + '&minlon=' + request.extent.minLon
            + '&minlat=' + request.extent.minLat
            + '&maxlon=' + request.extent.maxLon
            + '&maxlat=' + request.extent.maxLat
            + '&zoom=' + request.zoom;
    }
}
