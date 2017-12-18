import { Waypoint } from './waypoint';
import { WaypointService } from '../services/waypoint.service';


export class Flightroute {
    waypoints: Waypoint[];
    alternate: Waypoint;
    fuel: Routefuel;
    aircraft: Aircraft;

    constructor(
        public id: number = undefined,
        public title = '',
        public comments = '') {

        this.id = id;
        this.title = title;
        this.waypoints = [];
        this.aircraft = new Aircraft();
        this.fuel = new Routefuel();
    }


    public recalcWaypointsAndFuel() {
        WaypointService.recalcWaypoints(this.waypoints, this.alternate, 2, this.aircraft.speed); // TODO
        this.calcRouteFuel();
    }


    private calcRouteFuel() {
        this.fuel.tripTime = 0;
        this.fuel.alternateTime = 0;

        for (let i = 0; i < this.waypoints.length; i++) {
            this.fuel.tripTime += this.getEetMin(this.waypoints[i], this.aircraft.speed);
        }

        if (this.alternate) {
            this.fuel.alternateTime = this.getEetMin(this.alternate, this.aircraft.speed);
        }
    }


    private getEetMin(wp: Waypoint, speedKt: number): number {
        if (!wp || !wp.dist || wp.dist <= 0 || !speedKt || speedKt <= 0) {
            return 0;
        }

        const eet = Math.ceil(wp.dist / speedKt * 60);

        if (wp.vacTime > 0) {
            return eet + wp.vacTime;
        } else {
            return eet;
        }
    }
}


export class Routefuel {
    constructor(
        public tripTime = 0,
        public alternateTime = 0,
        public reserveTime = 45,
        public extraTime = 0) {

        this.tripTime = tripTime;
        this.alternateTime = alternateTime;
        this.reserveTime = reserveTime;
        this.extraTime = extraTime;
    }
}


export class Aircraft {
    constructor(
        public speed = 100,
        public consumption = 20) {

        this.speed = speed;
        this.consumption = consumption;
    }
}
