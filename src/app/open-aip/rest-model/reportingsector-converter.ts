import {IRestReportingpoint} from './i-rest-reportingpoint';
import {Reportingsector} from '../domain-model/reportingsector';
import {PolygonConverter} from '../../common/geo-math/rest-model/polygon-converter';
import {LengthConverter} from '../../common/geo-math/rest-model/length-converter';


export class ReportingsectorConverter {
    public static fromRest(restItem: IRestReportingpoint): Reportingsector {
        return new Reportingsector(
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
