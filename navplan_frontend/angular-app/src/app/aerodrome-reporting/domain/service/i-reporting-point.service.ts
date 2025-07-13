import {Observable} from 'rxjs';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {ReportingPointsAndSectors} from '../model/reporting-points-and-sectors';


export abstract class IReportingPointService {
    public abstract readReportingPointsByExtent(extent: Extent2d): Observable<ReportingPointsAndSectors>;

    public abstract readReportingPointsByAirportIcao(airportIcao: string): Observable<ReportingPointsAndSectors>;
}
