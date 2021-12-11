import {IRestReportingpoint} from './i-rest-reportingpoint';
import {ReportingSector} from '../../aerodrome/domain-model/reporting-sector';
import {PolygonConverter} from '../../common/geo-math/rest-model/polygon-converter';
import {RestLengthConverter} from '../../common/geo-math/rest-model/rest-length-converter';


export class RestReportingsectorConverter {
    public static fromRest(restItem: IRestReportingpoint): ReportingSector {
        return new ReportingSector(
            restItem.id,
            restItem.airport_icao,
            restItem.name,
            restItem.heli,
            restItem.inbd_comp,
            restItem.outbd_comp,
            PolygonConverter.fromRest(restItem.polygon),
            restItem.alt_min ? RestLengthConverter.fromRest(restItem.alt_min) : undefined,
            restItem.alt_max ? RestLengthConverter.fromRest(restItem.alt_max) : undefined
        );
    }
}
