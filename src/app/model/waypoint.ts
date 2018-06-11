import { Clonable } from './clonable';
import { Position2d } from './position';


export class Waypoint implements Clonable<Waypoint> {
    public mt = 0;
    public mtText = '';
    public vacTime = 0;
    public dist: number;
    public distText = '';
    public alt: Waypointaltitude = new Waypointaltitude();
    public eetText = '';
    public variation = 0;
    public isNew = false;


    constructor(
        public type?: Waypointtype,
        public freq = '',
        public callsign = '',
        public checkpoint = '',
        public remark = '',
        public supp_info = '',
        public position?: Position2d) {
    }


    public clone(): Waypoint {
        const wp = new Waypoint(
            this.type,
            this.freq,
            this.callsign,
            this.checkpoint,
            this.remark,
            this.supp_info,
            new Position2d(this.position.longitude, this.position.latitude)
        );
        wp.mt = this.mt;
        wp.mtText = this.mtText;
        wp.vacTime = this.vacTime;
        wp.dist = this.dist;
        wp.distText = this.distText;
        wp.alt = this.alt.clone();
        wp.eetText = this.eetText;
        wp.variation = this.variation;

        return wp;
    }
}


export enum Waypointtype {
    airport,
    navaid,
    report,
    user,
    geoname
}


export class Waypointaltitude implements Clonable<Waypointaltitude> {
    constructor(
        public alt?: number,
        public isminalt = false,
        public ismaxalt = false,
        public isaltatlegstart = false) {
    }


    public clone(): Waypointaltitude {
        return new Waypointaltitude(
            this.alt,
            this.isminalt,
            this.ismaxalt,
            this.isaltatlegstart,
        );
    }
}
