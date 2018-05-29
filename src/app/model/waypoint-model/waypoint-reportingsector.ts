import {Position2d} from "../position";
import {Waypointaltitude, Waypointtype} from "../waypoint";
import {WaypointBase} from "./waypoint-base";
import {Reportingsector} from "../reportingsector";


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
        }
    }
}
