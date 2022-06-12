import {ReportingPoint} from './reporting-point';
import {ReportingSector} from './reporting-sector';


export class ReportingPointsAndSectors {
    constructor(
        public reportingPoints: ReportingPoint[],
        public reportingSectors: ReportingSector[]
    ) {
    }
}
