import {ReportingPoint} from '../domain-model/reporting-point';
import {IRestReportingpoint} from './i-rest-reportingpoint';
import {Position2dConverter} from '../../common/geo-math/rest-model/position2d-converter';
import {LengthConverter} from '../../common/geo-math/rest-model/length-converter';


export class RestReportingpointConverter {
    public static fromRest(restItem: IRestReportingpoint): ReportingPoint {
        return new ReportingPoint(
            restItem.id,
            restItem.airport_icao,
            restItem.name,
            restItem.heli,
            restItem.inbd_comp,
            restItem.outbd_comp,
            Position2dConverter.fromRest(restItem.pos),
            restItem.alt_min ? LengthConverter.fromRest(restItem.alt_min) : undefined,
            restItem.alt_max ? LengthConverter.fromRest(restItem.alt_max) : undefined
        );
    }
}
