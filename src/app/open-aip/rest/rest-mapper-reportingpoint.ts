import {Reportingpoint} from '../domain/reportingpoint';
import {IRestReportingpoint} from './i-rest-reportingpoint';
import {RestPosition2d} from '../../geo-math/rest/rest-position2d';
import {RestLength} from '../../geo-math/rest/rest-length';


export class RestMapperReportingpoint {
    public static fromRest(restItem: IRestReportingpoint): Reportingpoint {
        return new Reportingpoint(
            restItem.id,
            restItem.airport_icao,
            restItem.name,
            restItem.heli,
            restItem.inbd_comp,
            restItem.outbd_comp,
            RestPosition2d.fromRest(restItem.pos),
            restItem.alt_min ? RestLength.fromRest(restItem.alt_min) : undefined,
            restItem.alt_max ? RestLength.fromRest(restItem.alt_max) : undefined
        );
    }
}
