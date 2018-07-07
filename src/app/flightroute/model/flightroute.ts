import {Aircraft} from './aircraft';
import {Waypoint} from './waypoint';
import {RouteFuel} from './routefuel';
import {Clonable} from '../../shared/model/clonable';
import {Time} from '../../shared/model/quantities/time';


export class Flightroute implements Clonable<Flightroute> {
    public fuel: RouteFuel;


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
            this.aircraft.clone(),
            newWaypoints,
            this.alternate.clone(),
            this.extraTime.clone());
    }
}
