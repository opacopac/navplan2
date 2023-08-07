import {IRestPrecipitation} from './i-rest-precipitation';
import {Precipitation} from '../../domain/model/quantities/precipitation';
import {PrecipitationUnit} from '../../domain/model/quantities/precipitation-unit';


export class RestPrecipitationConverter {
    public static fromRest(restPrecip: IRestPrecipitation): Precipitation {
        return new Precipitation(
            restPrecip[0],
            PrecipitationUnit[restPrecip[1]],
        );
    }


    public static toRest(precip: Precipitation): IRestPrecipitation {
        return [
            precip.value,
            PrecipitationUnit[precip.unit]
        ];
    }
}
