import {RestAircraftConverter} from './rest-aircraft-converter';
import {IRestAircraftResponse} from '../model/i-rest-aircraft-response';
import {Aircraft} from '../../domain/model/aircraft';


export class RestAircraftResponseConverter {
    public static fromRest(restAircraftResponse: IRestAircraftResponse): Aircraft {
        return RestAircraftConverter.fromRest(restAircraftResponse.aircraft);
    }
}
