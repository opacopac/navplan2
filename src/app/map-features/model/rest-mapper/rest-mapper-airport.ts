import {
    Airport,
    AirportChart,
    AirportFeature,
    AirportRadio,
    AirportType,
    AirportWebcam
} from '../airport';
import { Position2d } from '../../../shared/model/geometry/position2d';
import {AirportRunway} from '../airport-runway';


// region interfaces

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


export interface AirportChartRestItem {
    id: number;
    source: string;
    type: string;
    filename: string;
    mercator_n: string;
    mercator_s: string;
    mercator_e: string;
    mercator_w: string;
}


export interface AirportRunwayRestItem {
    name: string;
    surface: string;
    length: number;
    width: number;
    direction1: number;
    direction2: number;
    tora1: number;
    tora2: number;
    lda1: number;
    lda2: number;
    papi1: boolean;
    papi2: boolean;
}


export interface AirportRadioRestItem {
    category: string;
    frequency: string;
    type: string;
    typespec: string;
    description: string;
}


export interface AirportFeatureRestItem {
    type: string;
    name: string;
}


export interface AirportWebcamRestItem {
    name: string;
    url: string;
}

// endregion


export class RestMapperAirport {
    public static getAirportFromRestItem(restItem: AirportRestItem): Airport {
        const airport = new Airport(
            restItem.id,
            AirportType[restItem.type],
            restItem.name,
            restItem.icao,
            restItem.country,
            new Position2d(restItem.longitude, restItem.latitude),
            restItem.elevation);

        for (const item of restItem.runways) {
            airport.runways.push(this.getAirportRunwayFromRestItem(item));
        }

        for (const item of restItem.radios) {
            airport.radios.push(this.getAirportRadioFromRestItem(item));
        }

        for (const item of restItem.webcams) {
            airport.webcams.push(this.getAirportWebcamFromRestItem(item));
        }

        for (const item of restItem.charts) {
            airport.charts.push(this.getAirportChartFromRestItem(item));
        }

        for (const item of restItem.mapfeatures) {
            airport.features.push(this.getAirportFeatureFromRestItem(item));
        }

        return airport;
    }


    private static getAirportRunwayFromRestItem(restItem: AirportRunwayRestItem): AirportRunway {
        return new AirportRunway(
            restItem.name,
            restItem.surface,
            restItem.length,
            restItem.width,
            restItem.direction1,
            restItem.direction2,
            restItem.tora1,
            restItem.tora2,
            restItem.lda1,
            restItem.lda2,
            restItem.papi1,
            restItem.papi2);
    }


    private static getAirportRadioFromRestItem(restItem: AirportRadioRestItem): AirportRadio {
        return new AirportRadio(
            restItem.category,
            restItem.frequency,
            restItem.type,
            restItem.typespec,
            restItem.description
        );
    }


    private static getAirportWebcamFromRestItem(restItem: AirportWebcamRestItem): AirportWebcam {
        return new AirportWebcam(
            restItem.name,
            restItem.url
        );
    }


    private static getAirportChartFromRestItem(restItem: AirportChartRestItem): AirportChart {
        return new AirportChart(
            restItem.id,
            restItem.source,
            restItem.type,
            restItem.filename,
            restItem.mercator_n,
            restItem.mercator_s,
            restItem.mercator_e,
            restItem.mercator_w);
    }


    private static getAirportFeatureFromRestItem(restItem: AirportFeatureRestItem): AirportFeature {
        return new AirportFeature(
            restItem.type,
            restItem.name);
    }
}
