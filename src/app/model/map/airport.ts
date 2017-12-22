import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Position2d } from '../position';
import { AirportRunway, AirportRunwayOlFeature, AirportRunwayRestItem } from './airport-runway';
import { AirportRadio, AirportRadioRestItem } from './airport-radio';
import { AirportWebcam, AirportWebcamRestItem } from './airport-webcam';
import { AirportChart, AirportChartRestItem } from './airport-chart';
import { AirportFeature, AirportFeatureOlFeature, AirportFeatureRestItem } from './airport-feature';
import { MapItemGeometryType, MapItemModel, MapItemOlFeature } from './map-item-model';


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


export class Airport implements MapItemModel {
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


    public getGeometryType(): MapItemGeometryType {
        return MapItemGeometryType.POINT;
    }


    public getGeometry(): Position2d {
        return this.position;
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


export class AirportOlFeature extends MapItemOlFeature<Airport> {
    public draw(source: ol.source.Vector) {
        super.draw(source);

        // runways
        if (this.mapItemModel.runways && this.mapItemModel.runways.length > 0) {
            const rwyOlFeature = new AirportRunwayOlFeature(this.mapItemModel.runways[0]);
            rwyOlFeature.draw(source);
        }

        // airportfeatures
        for (const adFeature of this.mapItemModel.features) {
            const adFeatureOlFeature = new AirportFeatureOlFeature(adFeature);
            adFeatureOlFeature.draw(source);
        }
    }


    protected createOlStyle(): ol.style.Style {
        let src = environment.iconBaseUrl;
        let textColor = '#451A57';
        let name = this.mapItemModel.icao ? this.mapItemModel.icao : '';

        switch (this.mapItemModel.type) {
            case 'APT':
            case 'INTL_APT':
                src += 'ad_civ.png';
                break;
            case 'AF_CIVIL':
            case 'GLIDING':
            case 'LIGHT_AIRCRAFT':
                src += 'ad_civ_nofac.png';
                break;
            case 'AF_MIL_CIVIL':
                src += 'ad_civmil.png';
                break;
            case 'HELI_CIVIL':
                src += 'ad_heli.png';
                break;
            case 'HELI_MIL':
                src += 'ad_heli_mil.png';
                break;
            case 'AF_WATER':
                src += 'ad_water.png';
                break;
            case 'AD_MIL':
                src += 'ad_mil.png';
                textColor = '#AE1E22';
                break;
            case 'AD_CLOSED':
                src += 'ad_closed.png';
                name = '';
                break;
            default:
                return undefined;
        }

        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                scale: 1,
                opacity: 0.75,
                src: src
            })),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: name,
                fill: new ol.style.Fill({color: textColor}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 25
            })
        });
    }
}
