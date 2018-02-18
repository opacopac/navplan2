import { Clonable } from './clonable';


export class Waypoint implements Clonable<Waypoint> {
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


    public clone(): Waypoint {
        const wp = new Waypoint(
            this.type,
            this.freq,
            this.callsign,
            this.checkpoint,
            this.remark,
            this.supp_info,
            this.latitude,
            this.longitude
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
    user
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
