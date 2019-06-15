import {IRestReportingpoint} from './i-rest-reportingpoint';
import {Reportingsector} from '../domain/reportingsector';
import {RestPolygon} from '../../shared/model/rest/rest-polygon';
import {RestLength} from '../../shared/model/rest/rest-length';


export class RestReportingsector {
    public static fromRest(restItem: IRestReportingpoint): Reportingsector {
        return new Reportingsector(
            restItem.id,
            restItem.airport_icao,
            restItem.name,
            restItem.heli,
            restItem.inbd_comp,
            restItem.outbd_comp,
            RestPolygon.fromRest(restItem.polygon),
            restItem.alt_min ? RestLength.fromRest(restItem.alt_min) : undefined,
            restItem.alt_max ? RestLength.fromRest(restItem.alt_max) : undefined
        );
    }
}
