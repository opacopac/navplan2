import { Position2d } from './position';
import { AirportRunway, AirportRunwayRestItem } from './airport-runway';
import { AirportRadio, AirportRadioRestItem } from './airport-radio';
import { AirportWebcam, AirportWebcamRestItem } from './airport-webcam';
import { AirportChart, AirportChartRestItem } from './airport-chart';
import { AirportFeature, AirportFeatureRestItem } from './airport-feature';


export interface AirportRestItem {
    id: number;
    type: string;
    name: string;
    icao: string;
    country: string;
    latitude: number;
    longitude: number;
    elevation: number;
    runways: AirportRunwayRestItem[];
    radios: AirportRadioRestItem[];
    webcams: AirportWebcamRestItem[];
    charts: AirportChartRestItem[];
    mapfeatures: AirportFeatureRestItem[];
}


export class Airport {
    public id: number;
    public type: string;
    public name: string;
    public icao: string;
    public country: string;
    public position: Position2d;
    public elevation: number;
    public runways: AirportRunway[];
    public radios: AirportRadio[];
    public webcams: AirportWebcam[];
    public charts: AirportChart[];
    public features: AirportFeature[];


    constructor(restItem: AirportRestItem) {
        this.id = restItem.id;
        this.type = restItem.type;
        this.name = restItem.name;
        this.icao = restItem.icao;
        this.country = restItem.country;
        this.position = new Position2d(restItem.longitude, restItem.latitude);
        this.elevation = restItem.elevation;

        this.runways = [];
        for (const item of restItem.runways) {
            this.runways.push(new AirportRunway(item, this.position, this.isMilitary()));
        }

        this.radios = [];
        for (const item of restItem.radios) {
            this.radios.push(new AirportRadio(item));
        }

        this.webcams = [];
        for (const item of restItem.webcams) {
            this.webcams.push(new AirportWebcam(item));
        }

        this.charts = [];
        for (const item of restItem.charts) {
            this.charts.push(new AirportChart(item));
        }

        this.features = [];
        for (const item of restItem.mapfeatures) {
            this.features.push(new AirportFeature(item, this.position));
        }
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
