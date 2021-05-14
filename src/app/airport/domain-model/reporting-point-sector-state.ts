import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {ReportingPoint} from './reporting-point';
import {ReportingSector} from './reporting-sector';


export interface ReportingPointSectorState {
    extent: Extent2d;
    zoom: number;
    reportingPoints: ReportingPoint[];
    reportingSectors: ReportingSector[];
}
