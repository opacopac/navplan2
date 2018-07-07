import {Position2d} from '../../../shared/model/geometry/position2d';
import {WaypointBase} from './waypoint-base';
import {WaypointType} from '../../../flightroute/model/waypoint-type';
import {Reportingpoint} from '../reportingpoint';
import {WaypointAltitude} from '../../../flightroute/model/waypoint-altitude';


export class WaypointReportingpoint extends WaypointBase {
    constructor(public reportingpoint: Reportingpoint) {
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
        if (this.reportingpoint.max_ft) {
            return new WaypointAltitude(this.reportingpoint.max_ft, false, true, false);
        } else if (this.reportingpoint.min_ft) {
            return new WaypointAltitude(this.reportingpoint.min_ft, true, false, false);
        } else {
            return new WaypointAltitude();
        }
    }
}
