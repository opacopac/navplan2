import {AircraftParams} from './aircraftParams';
import {Waypoint} from './waypoint';
import {RouteFuel} from './routefuel';
import {Clonable} from '../../../system/domain/model/clonable';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {WaypointType} from './waypoint-type';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {TimeUnit} from '../../../geo-physics/domain/model/quantities/time-unit';


export class Flightroute implements Clonable<Flightroute> {
    public fuel = new RouteFuel();
    public tripDist = new Length(0, LengthUnit.NM);


    constructor(
        public id: number,
        public title: string,
        public comments: string,
        public aircraftParams: AircraftParams,
        public waypoints: Waypoint[],
        public alternate: Waypoint,
        public extraTime: Time
    ) {
    }


    public static createEmpty(title: string, aircraftParams: AircraftParams): Flightroute {
        return new Flightroute(
            0,
            title,
            undefined,
            undefined,
            [],
            undefined,
            new Time(0, TimeUnit.M)
        );
    }


    public clone(): Flightroute {
        return new Flightroute(
            this.id,
            this.title,
            this.comments,
            this.aircraftParams ? this.aircraftParams.clone() : undefined,
            this.waypoints.map(wp => wp.clone()),
            this.alternate ? this.alternate.clone() : undefined,
            this.extraTime ? this.extraTime.clone() : undefined
        );
    }


    public containsWaypoint(waypoint: Waypoint): boolean {
        return (this.getWaypointIndex(waypoint) >= 0);
    }


    public getWaypointIndex(waypoint: Waypoint, findLast: boolean = true): number {
        if (!waypoint || !this.waypoints || this.waypoints.length === 0) {
            return -1;
        }

        if (findLast) {
            for (let i = this.waypoints.length - 1; i >= 0; i--) {
                if (this.waypoints[i].position.equals(waypoint.position)) {
                    return i;
                }
            }
        } else {
            for (let i = 0; i < this.waypoints.length; i++) {
                if (this.waypoints[i].position.equals(waypoint.position)) {
                    return i;
                }
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


    public getWaypointsInclAlternate(): Waypoint[] {
        if (this.alternate) {
            return [...this.waypoints, this.alternate];
        } else {
            return this.waypoints;
        }
    }


    public getOriginWaypoint(): Waypoint {
        for (const wp of this.waypoints) {
            if (this.isOriginAirport(wp)) {
                return wp;
            }
        }

        return null;
    }


    public getDestinationWaypoint(): Waypoint {
        for (const wp of this.waypoints) {
            if (this.isDestinationAirport(wp)) {
                return wp;
            }
        }

        return null;
    }


    public getAlternateWaypoint(): Waypoint {
        if (this.isAlternateWaypoint(this.alternate)) {
            return this.alternate;
        } else {
            return null;
        }
    }
}
