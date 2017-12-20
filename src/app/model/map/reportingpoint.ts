import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Position2d } from '../position';
import { Polygon } from '../polygon';


export interface ReportingPointRestItem {
    id: number;
    type: string;
    airport_icao: string;
    name: string;
    heli: boolean;
    inbd_comp: boolean;
    outbd_comp: boolean;
    min_ft: number;
    max_ft: number;
    latitude: number;
    longitude: number;
    polygon: [number, number][];
}


export class Reportingpoint {
    id: number;
    type: string;
    airport_icao: string;
    name: string;
    heli: boolean;
    inbd_comp: boolean;
    outbd_comp: boolean;
    min_ft: number;
    max_ft: number;
    position: Position2d;
    polygon: Polygon;


    constructor(restItem: ReportingPointRestItem) {
        this.id = restItem.id;
        this.type = restItem.type;
        this.airport_icao = restItem.airport_icao;
        this.name = restItem.name;
        this.heli = restItem.heli;
        this.inbd_comp = restItem.inbd_comp;
        this.outbd_comp = restItem.outbd_comp;
        this.min_ft = restItem.min_ft;
        this.max_ft = restItem.max_ft;
        this.position = new Position2d(restItem.longitude, restItem.latitude);
        this.polygon = Polygon.createFromLonLatList(restItem.polygon);
    }
}


export class ReportingPointOlFeatureFactory {
    public static createOlFeature(rp: Reportingpoint): ol.Feature {
        const feature = new ol.Feature({
            geometry: new ol.geom.Point(rp.position.getMercator())
        });

        const style = this.createOlStyle(rp);

        if (style) {
            feature.setStyle(style);
            return feature;
        } else {
            return undefined;
        }
    }


    private static createOlStyle(rp: Reportingpoint): ol.style.Style {
        let src = environment.iconBaseUrl;

        if ((rp.inbd_comp && rp.outbd_comp) || (rp.inbd_comp == null && rp.outbd_comp == null)) {
            src += 'rp_comp.png';
        } else if (rp.inbd_comp || rp.outbd_comp) {
            src += 'rp_inbd.png';
        } else {
            src += 'rp.png';
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
                text: rp.name,
                fill: new ol.style.Fill({color: '#0077FF'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 20
            })
        });
    }
}


export class ReportingSectorOlFeatureFactory {
    public static createOlFeature(rp: Reportingpoint): ol.Feature {
        const feature = new ol.Feature({
            geometry: new ol.geom.Polygon([rp.polygon.getMercatorList()])
        });

        const style = this.createOlStyle(rp);

        if (style) {
            feature.setStyle(style);
            return feature;
        } else {
            return undefined;
        }
    }


    private static createOlStyle(rp: Reportingpoint): ol.style.Style {
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(124, 47, 215, 0.3)'}),
            stroke: new ol.style.Stroke({
                color: 'rgba(124, 47, 215, 0.5)',
                width: 2}),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: rp.name,
                fill: new ol.style.Fill({color: '#7C4AD7'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
            })
        });
    }
}
