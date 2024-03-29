import {ReportingPoint} from '../../domain/model/reporting-point';
import {IRestReportingpoint} from '../model/i-rest-reportingpoint';
import {Position2dConverter} from '../../../geo-physics/rest/model/position2d-converter';
import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';


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
            restItem.alt_min ? RestLengthConverter.fromRest(restItem.alt_min) : undefined,
            restItem.alt_max ? RestLengthConverter.fromRest(restItem.alt_max) : undefined
        );
    }
}
