import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {WaypointBase} from './waypoint-base';
import {WaypointType} from '../waypoint-type';
import {ReportingPoint} from '../../../aerodrome/domain-model/reporting-point';
import {WaypointAltitude} from '../waypoint-altitude';


export class WaypointReportingpoint extends WaypointBase {
    constructor(public reportingpoint: ReportingPoint) {
        super();
    }


    public getType(): WaypointType {
        return WaypointType.report;
    }


    public getPosition(): Position2d {
        return this.reportingpoint.position;
    }


    public getCheckpoint(): string {
        return this.reportingpoint.name;
    }


    public getAltitude(): WaypointAltitude {
        if (this.reportingpoint.alt_max) {
            return new WaypointAltitude(this.reportingpoint.alt_max.ft, false, true, false);
        } else if (this.reportingpoint.alt_min) {
            return new WaypointAltitude(this.reportingpoint.alt_min.ft, true, false, false);
        } else {
            return new WaypointAltitude();
        }
    }
}
