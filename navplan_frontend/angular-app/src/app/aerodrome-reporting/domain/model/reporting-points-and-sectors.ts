import {ReportingPoint} from './reporting-point';
import {ReportingSector} from './reporting-sector';
import {ReportingPointOrSector} from './reporting-point-or-sector';


export class ReportingPointsAndSectors {
    constructor(
        public reportingPoints: ReportingPoint[],
        public reportingSectors: ReportingSector[]
    ) {
    }


    public isEmpty(): boolean {
        return this.reportingPoints.length === 0 && this.reportingSectors.length === 0;
    }


    public getPointsAndSectors(): ReportingPointOrSector[] {
        return [...this.reportingPoints, ...this.reportingSectors];
    }
}
