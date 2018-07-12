import {Aircraft} from './aircraft';
import {Waypoint} from './waypoint';
import {RouteFuel} from './routefuel';
import {Clonable} from '../../shared/model/clonable';
import {Time} from '../../shared/model/quantities/time';


export class Flightroute implements Clonable<Flightroute> {
    public fuel = new RouteFuel();


    constructor(
        public id: number,
        public title: string,
        public comments: string,
        public aircraft: Aircraft,
        public waypoints: Waypoint[],
        public alternate: Waypoint,
        public extraTime: Time) {
    }


    clone(): Flightroute {
        const newWaypoints: Waypoint[] = [];
        this.waypoints.forEach(wp => newWaypoints.push(wp.clone()));

        return new Flightroute(
            this.id,
            this.title,
            this.comments,
            this.aircraft ? this.aircraft.clone() : undefined,
            newWaypoints,
            this.alternate ? this.alternate.clone() : undefined,
            this.extraTime ? this.extraTime.clone() : undefined
        );
    }
}
