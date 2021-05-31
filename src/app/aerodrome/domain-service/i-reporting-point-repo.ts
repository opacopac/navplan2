import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {ReportingPointsAndSectors} from '../domain-model/reporting-points-and-sectors';


export abstract class IReportingPointRepo {
    public abstract readReportingPointsByExtent(extent: Extent2d): Observable<ReportingPointsAndSectors>;
}
