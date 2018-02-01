import { Position2d } from './position';


export class Airport {
    public runways: AirportRunway[];
    public radios: AirportRadio[];
    public webcams: AirportWebcam[];
    public charts: AirportChart[];
    public features: AirportFeature[];


    constructor(
        public id: number,
        public type: string,
        public name: string,
        public icao: string,
        public country: string,
        public position: Position2d,
        public elevation: number) {

        this.runways = [];
        this.radios = [];
        this.webcams = [];
        this.charts = [];
        this.features = [];
    }


    public hasRunways(): boolean {
        return (this.runways != null && this.runways.length > 0);
    }


    public hasFeatures(): boolean {
        return (this.features != null && this.features.length > 0);
    }


    public isHeliport(): boolean {
        return (this.type === 'HELI_CIVIL' || this.type === 'HELI_MIL');
    }


    public isMilitary(): boolean {
        return (this.type === 'AD_MIL');
    }


    public isClosed(): boolean {
        return (this.type === 'AD_CLOSED');
    }
}


export class AirportRunway {
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
        public papi2: boolean,
        public position: Position2d,
        public isMil: boolean) {
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


export class AirportFeature {
    constructor(
        public type: string,
        public name: string,
        public position: Position2d) {
    }
}
