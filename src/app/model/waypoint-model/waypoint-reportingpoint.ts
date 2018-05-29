import { WaypointBase } from "./waypoint-base";
import { Position2d } from "../position";
import { Reportingpoint } from "../reportingpoint";
import {Waypointaltitude, Waypointtype} from "../waypoint";


export class WaypointReportingpoint extends WaypointBase {
    constructor(public reportingpoint: Reportingpoint) {
        super();
    }


    public getType(): Waypointtype {
        return Waypointtype.report;
    }


    public getPosition(): Position2d {
        return this.reportingpoint.position;
    }


    public getCheckpoint(): string {
        return this.reportingpoint.name;
    }


    public getAltitude(): Waypointaltitude {
        if (this.reportingpoint.max_ft) {
            return new Waypointaltitude(this.reportingpoint.max_ft, false, true, false);
        } else if (this.reportingpoint.min_ft) {
            return new Waypointaltitude(this.reportingpoint.min_ft, true, false, false);
        }
    }
}
