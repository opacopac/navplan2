import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {map} from 'rxjs/operators';
import {ReportingPointSectorState} from '../domain-model/reporting-point-sector-state';
import {ReportingPointRestService} from '../rest-service/reporting-point-rest.service';


@Injectable()
export class ReportingPointService {
    private readonly REPORTING_POINT_MIN_ZOOM = 11;


    constructor(private reportingPointRestService: ReportingPointRestService) {
    }


    public readByExtent(extent: Extent2d, zoom: number): Observable<ReportingPointSectorState> {
        if (zoom < this.REPORTING_POINT_MIN_ZOOM) {
            return of({ extent: extent, zoom: zoom, reportingPoints: [], reportingSectors: [] });
        }

        return this.reportingPointRestService.readReportingPointsByExtent(extent).pipe(
            map(repPointsSectors => ({
                extent: extent,
                zoom: zoom,
                reportingPoints: repPointsSectors.reportingPoints,
                reportingSectors: repPointsSectors.reportingSectors
            }))
        );
    }


    public isReloadRequired(
        requestedState: { extent: Extent2d, zoom: number },
        currentState: { extent: Extent2d, zoom: number }
    ): boolean {
        return !currentState.extent || !requestedState.extent ||
            !currentState.extent.containsExtent2d(requestedState.extent) ||
            (currentState.zoom < this.REPORTING_POINT_MIN_ZOOM && requestedState.zoom >= this.REPORTING_POINT_MIN_ZOOM);
    }
}
