import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {WaypointBase} from './waypoint-base';
import {ReportingSector} from '../../../airport/domain-model/reporting-sector';
import {WaypointType} from '../waypoint-type';
import {WaypointAltitude} from '../waypoint-altitude';


export class WaypointReportingsector extends WaypointBase {
    constructor(public reportingsector: ReportingSector, public clickPosition: Position2d) {
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
        if (this.reportingsector.alt_max) {
            return new WaypointAltitude(this.reportingsector.alt_max.ft, false, true, false);
        } else if (this.reportingsector.alt_min) {
            return new WaypointAltitude(this.reportingsector.alt_min.ft, true, false, false);
        } else {
            return new WaypointAltitude();
        }
    }
}
