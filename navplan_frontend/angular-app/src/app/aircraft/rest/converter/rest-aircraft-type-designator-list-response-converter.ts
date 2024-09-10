import {IRestAircraftTypeDesignatorListResponse} from '../service/i-rest-aircraft-type-designator-list-response';
import {AircraftTypeDesignator} from '../../domain/model/aircraft-type-designator';
import {RestAircraftTypeDesignatorConverter} from './rest-aircraft-type-designator-converter';


export class RestAircraftTypeDesignatorListResponseConverter {
    public static fromRest(respone: IRestAircraftTypeDesignatorListResponse): AircraftTypeDesignator[] {
        return RestAircraftTypeDesignatorConverter.fromRestList(respone.acTypeDesignators);
    }
}
