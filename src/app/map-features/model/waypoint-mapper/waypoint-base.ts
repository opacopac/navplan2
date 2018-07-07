import {Position2d} from '../../../shared/model/geometry/position2d';
import {WaypointType} from '../../../flightroute/model/waypoint-type';
import {WaypointAltitude} from '../../../flightroute/model/waypoint-altitude';


export abstract class WaypointBase {
    public abstract getType(): WaypointType;


    public abstract getPosition(): Position2d;


    public getFrequency(): string {
        return '';
    }


    public getCallsign(): string {
        return '';
    }


    public abstract getCheckpoint(): string;


    public getAltitude(): WaypointAltitude {
        return new WaypointAltitude();
    }


    public getRemarks(): string {
        return '';
    }


    public getSuppInfo(): string {
        return '';
    }
}
