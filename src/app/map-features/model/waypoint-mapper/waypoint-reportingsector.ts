import {Position2d} from '../../../shared/model/geometry/position2d';
import {WaypointBase} from './waypoint-base';
import {Reportingsector} from '../reportingsector';
import {WaypointType} from '../../../flightroute/model/waypoint-type';
import {WaypointAltitude} from '../../../flightroute/model/waypoint-altitude';


export class WaypointReportingsector extends WaypointBase {
    constructor(public reportingsector: Reportingsector, public clickPosition: Position2d) {
        super();
    }


    public getType(): WaypointType {
        return WaypointType.report;
    }


    public getPosition(): Position2d {
        return this.clickPosition;
    }


    public getCheckpoint(): string {
        return this.reportingsector.name;
    }


    public getAltitude(): WaypointAltitude {
        if (this.reportingsector.max_ft) {
            return new WaypointAltitude(this.reportingsector.max_ft, false, true, false);
        } else if (this.reportingsector.min_ft) {
            return new WaypointAltitude(this.reportingsector.min_ft, true, false, false);
        } else {
            return new WaypointAltitude();
        }
    }
}
