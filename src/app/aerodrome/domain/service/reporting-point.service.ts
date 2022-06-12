import {Observable} from 'rxjs';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {ReportingPointsAndSectors} from '../model/reporting-points-and-sectors';
import {IReportingPointService} from './i-reporting-point.service';
import {IReportingPointRepoService} from './i-reporting-point-repo.service';
import {Injectable} from '@angular/core';


@Injectable()
export class ReportingPointService implements IReportingPointService {
    public constructor(private reportingPointRepo: IReportingPointRepoService) {
    }


    public readReportingPointsByExtent(extent: Extent2d): Observable<ReportingPointsAndSectors> {
        return this.reportingPointRepo.readReportingPointsByExtent(extent);
    }
}
