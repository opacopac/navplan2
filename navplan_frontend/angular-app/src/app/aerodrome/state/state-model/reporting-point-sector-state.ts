import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {ReportingPoint} from '../../domain/model/reporting-point';
import {ReportingSector} from '../../domain/model/reporting-sector';


export interface ReportingPointSectorState {
    extent: Extent2d;
    zoom: number;
    reportingPoints: ReportingPoint[];
    reportingSectors: ReportingSector[];
}
