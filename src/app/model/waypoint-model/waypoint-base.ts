import { Position2d } from "../position";
import {Waypointaltitude, Waypointtype} from "../waypoint";


export abstract class WaypointBase {
    public abstract getType(): Waypointtype;


    public abstract getPosition(): Position2d;


    public getFrequency(): string {
        return '';
    }


    public getCallsign(): string {
        return '';
    }


    public abstract getCheckpoint(): string;


    public getAltitude(): Waypointaltitude {
        return new Waypointaltitude();
    }


    public getRemarks(): string {
        return '';
    }


    public getSuppInfo(): string {
        return '';
    }
}
