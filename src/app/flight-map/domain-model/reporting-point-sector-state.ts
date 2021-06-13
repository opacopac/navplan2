import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {ReportingPoint} from '../../aerodrome/domain-model/reporting-point';
import {ReportingSector} from '../../aerodrome/domain-model/reporting-sector';


export interface ReportingPointSectorState {
    extent: Extent2d;
    zoom: number;
    reportingPoints: ReportingPoint[];
    reportingSectors: ReportingSector[];
}
