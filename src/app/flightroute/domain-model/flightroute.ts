import {Aircraft} from './aircraft';
import {Waypoint} from './waypoint';
import {RouteFuel} from './routefuel';
import {Clonable} from '../../system/domain-model/clonable';
import {Time} from '../../common/geo-math/domain-model/quantities/time';
import {Length} from '../../common/geo-math/domain-model/quantities/length';
import {LengthUnit} from '../../common/geo-math/domain-model/quantities/units';
import {WaypointType} from './waypoint-type';


export class Flightroute implements Clonable<Flightroute> {
    public fuel = new RouteFuel();
    public tripDist = new Length(0, LengthUnit.NM);


    constructor(
        public id: number,
        public title: string,
        public comments: string,
        public aircraft: Aircraft,
        public waypoints: Waypoint[],
        public alternate: Waypoint,
        public extraTime: Time
    ) {
    }


    public clone(): Flightroute {
        return new Flightroute(
            this.id,
            this.title,
            this.comments,
            this.aircraft ? this.aircraft.clone() : undefined,
            this.waypoints.map(wp => wp.clone()),
            this.alternate ? this.alternate.clone() : undefined,
            this.extraTime ? this.extraTime.clone() : undefined
        );
    }


    public containsWaypoint(waypoint: Waypoint): boolean {
        return (this.getWaypointIndex(waypoint) >= 0);
    }


    public getWaypointIndex(waypoint: Waypoint): number {
        if (!waypoint || !waypoint.position || !this.waypoints || this.waypoints.length === 0) {
            return -1;
        }

        for (let i = 0; i < this.waypoints.length; i++) {
            if (this.waypoints[i].position.equals(waypoint.position)) {
                return i;
            }
        }

        return -1;
    }


    public isOriginAirport(waypoint: Waypoint): boolean {
        if (!waypoint || !waypoint.position || waypoint.type !== WaypointType.airport) {
            return false;
        }

        if (!this.waypoints || this.waypoints.length === 0) {
            return false;
        }

        return this.waypoints[0].position.equals(waypoint.position);
    }


    public isDestinationAirport(waypoint: Waypoint): boolean {
        if (!waypoint || !waypoint.position || waypoint.type !== WaypointType.airport) {
            return false;
        }

        if (!this.waypoints || this.waypoints.length <= 1) {
            return false;
        }

        return this.waypoints[this.waypoints.length - 1].position.equals(waypoint.position);
    }


    public isAlternateWaypoint(waypoint: Waypoint): boolean {
        if (!waypoint || !waypoint.position || ! this.alternate || !this.alternate.position) {
            return false;
        }

        return this.alternate.position.equals(waypoint.position);
    }


    public isALternateEligible(waypoint: Waypoint): boolean {
        if (!waypoint || !waypoint.position || waypoint.type !== WaypointType.airport) {
            return false;
        }

        return !this.isDestinationAirport(waypoint);
    }
}
