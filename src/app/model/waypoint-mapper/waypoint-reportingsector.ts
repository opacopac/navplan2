import {Position2d} from '../geometry/position2d';
import {Waypointaltitude, Waypointtype} from '../waypoint';
import {WaypointBase} from './waypoint-base';
import {Reportingsector} from '../reportingsector';
import {WaypointAltitude2} from '../flightroute/waypoint-altitude2';


export class WaypointReportingsector extends WaypointBase {
    constructor(public reportingsector: Reportingsector, public clickPosition: Position2d) {
        super();
    }


    public getType(): Waypointtype {
        return Waypointtype.report;
    }


    public getPosition(): Position2d {
        return this.clickPosition;
    }


    public getCheckpoint(): string {
        return this.reportingsector.name;
    }


    public getAltitude(): Waypointaltitude {
        if (this.reportingsector.max_ft) {
            return new Waypointaltitude(this.reportingsector.max_ft, false, true, false);
        } else if (this.reportingsector.min_ft) {
            return new Waypointaltitude(this.reportingsector.min_ft, true, false, false);
        } else {
            return new Waypointaltitude();
        }
    }


    public getAltitude2(): WaypointAltitude2 {
        if (this.reportingsector.max_ft) {
            return new WaypointAltitude2(this.reportingsector.max_ft, false, true, false);
        } else if (this.reportingsector.min_ft) {
            return new WaypointAltitude2(this.reportingsector.min_ft, true, false, false);
        } else {
            return new WaypointAltitude2();
        }
    }
}
