export class Waypoint {
    mt: number;
    mtText = '';
    vacTime = 0;
    dist: number;
    distText = '';
    alt: Waypointaltitude = new Waypointaltitude();
    eetText = '';
    variation: number;

    constructor(
        public type?: Waypointtype,
        public freq = '',
        public callsign = '',
        public checkpoint = '',
        public remark = '',
        public supp_info = '',
        public latitude?: number,
        public longitude?: number) {
    }
}


export enum Waypointtype {
    airport,
    navaid,
    report,
    user
}


export class Waypointaltitude {
    constructor(
        public alt?: number,
        public isminalt = false,
        public ismaxalt = false,
        public isaltatlegstart = false) {
    }
}
