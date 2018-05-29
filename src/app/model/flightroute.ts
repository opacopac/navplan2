import { Waypoint } from './waypoint';
import { Aircraft } from './aircraft';


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
