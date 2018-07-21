import { Position2d } from '../../shared/model/geometry/position2d';
import { DataItem } from '../../shared/model/data-item';
import { MetarTaf } from '../../metar-taf/model/metar-taf';
import { Notam } from '../../notam/model/notam';


export enum AirportType {
    AD_CLOSED,
    AD_MIL,
    AF_CIVIL,
    AF_MIL_CIVIL,
    AF_WATER,
    APT,
    GLIDING,
    HELI_CIVIL,
    HELI_MIL,
    INTL_APT,
    LIGHT_AIRCRAFT
}


export class Airport extends DataItem  {
    public runways: AirportRunway[];
    public radios: AirportRadio[];
    public webcams: AirportWebcam[];
    public charts: AirportChart[];
    public features: AirportFeature[];
    public notams: Notam[];
    public metarTaf: MetarTaf;


    constructor(
        public id: number,
        public type: AirportType,
        public name: string,
        public icao: string,
        public country: string,
        public position: Position2d,
        public elevation_m: number) {

        super();
        this.runways = [];
        this.radios = [];
        this.webcams = [];
        this.charts = [];
        this.features = [];
        this.notams = [];
    }


    public get hasRunways(): boolean {
        return (this.runways != null && this.runways.length > 0);
    }


    public get hasRadios(): boolean {
        return (this.radios != null && this.radios.length > 0);
    }


    public get hasFeatures(): boolean {
        return (this.features != null && this.features.length > 0);
    }


    public get isHeliport(): boolean {
        return (this.type === AirportType.HELI_CIVIL || this.type === AirportType.HELI_MIL);
    }


    public get isMilitary(): boolean {
        return (this.type === AirportType.AD_MIL);
    }


    public get isClosed(): boolean {
        return (this.type === AirportType.AD_CLOSED);
    }

}


export class AirportRunway extends DataItem {
    constructor(
        public name: string,
        public surface: string,
        public length: number,
        public width: number,
        public direction1: number,
        public direction2: number,
        public tora1: number,
        public tora2: number,
        public lda1: number,
        public lda2: number,
        public papi1: boolean,
        public papi2: boolean) {

        super();
    }
}


export class AirportRadio {
    constructor(
        public category: string,
        public frequency: string,
        public type: string,
        public typespec: string,
        public description: string) {
    }
}


export class AirportWebcam {
    constructor(
        public name: string,
        public url: string) {
    }
}


export class AirportChart {
    constructor(
        public id: number,
        public source: string,
        public type: string,
        public filename: string,
        public mercator_n: string, // TODO: => extent
        public mercator_s: string,
        public mercator_e: string,
        public mercator_w: string) {
    }
}


export class AirportFeature extends DataItem {
    constructor(
        public type: string,
        public name: string) {

        super();
    }
}