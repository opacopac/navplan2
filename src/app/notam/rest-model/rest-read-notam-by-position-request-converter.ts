import {environment} from '../../../environments/environment';
import {ReadNotamByPositionRequest} from '../domain-model/read-notam-by-position-request';


export class RestReadNotamByPositionRequestConverter {
    public static toUrl(request: ReadNotamByPositionRequest): string {
        return environment.notamRestServiceUrl + '?action=searchByPosition'
            + '&starttimestamp=' + request.starttimestamp
            + '&endtimestamp=' + request.endtimestamp
            + '&longitude=' + request.position.longitude
            + '&latitude=' + request.position.latitude;
    }
}
