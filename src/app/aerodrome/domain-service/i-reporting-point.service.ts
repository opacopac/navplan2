import {Observable} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {ReportingPointSectorState} from '../domain-model/reporting-point-sector-state';


export abstract class IReportingPointService {
    public abstract readByExtent(extent: Extent2d, zoom: number): Observable<ReportingPointSectorState>;


    public abstract isReloadRequired(
        requestedState: { extent: Extent2d, zoom: number },
        currentState: { extent: Extent2d, zoom: number }
    ): boolean;
}
