import {IRestNotamResponse} from '../../../notam/rest/model/i-rest-notam-response';
import {RestNotamConverter} from '../../../notam/rest/model/rest-notam-converter';
import {Notam} from '../../../notam/domain/model/notam';


export class RestRouteNotamConverter {
    public static fromRest(restResponse: IRestNotamResponse): Notam[] {
        return RestNotamConverter.fromRestList(restResponse.notams);
    }
}
