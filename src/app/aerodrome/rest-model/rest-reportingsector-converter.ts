import {IRestReportingpoint} from './i-rest-reportingpoint';
import {ReportingSector} from '../domain-model/reporting-sector';
import {PolygonConverter} from '../../common/geo-math/rest-model/polygon-converter';
import {LengthConverter} from '../../common/geo-math/rest-model/length-converter';


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
            restItem.alt_min ? LengthConverter.fromRest(restItem.alt_min) : undefined,
            restItem.alt_max ? LengthConverter.fromRest(restItem.alt_max) : undefined
        );
    }
}
