import * as ol from 'openlayers';
import { Polygon } from '../polygon';
import {MapItemGeometryType, MapItemModel, MapItemOlFeature} from './map-item-model';


export interface AirspaceRestItem {
    id: number;
    aip_id: number;
    category: string;
    country: string;
    name: string;
    alt: { top: AirspaceAltitudeRestItem, bottom: AirspaceAltitudeRestItem };
    polygon: [number, number][];
}


export interface AirspaceAltitudeRestItem {
    ref: string;
    height: number;
    unit: string;
}


export class Airspace implements MapItemModel {
    id: number;
    aip_id: number;
    category: string;
    country: string;
    name: string;
    alt: { top: AirspaceAltitude, bottom: AirspaceAltitude };
    polygon: Polygon;


    constructor(restItem: AirspaceRestItem) {
        this.id = restItem.id;
        this.aip_id = restItem.aip_id;
        this.category = restItem.category;
        this.country = restItem.country;
        this.name = restItem.name;
        this.alt = { top: undefined, bottom: undefined };
        this.alt.top = new AirspaceAltitude(restItem.alt.top);
        this.alt.bottom = new AirspaceAltitude(restItem.alt.bottom);
        this.polygon = Polygon.createFromLonLatList(restItem.polygon);
    }


    public getGeometryType(): MapItemGeometryType {
        return MapItemGeometryType.POLYGON;
    }


    public getGeometry(): Polygon {
        return this.polygon;
    }
}


export class AirspaceAltitude {
    ref: string;
    height: number;
    unit: string;

    constructor(restItem: AirspaceAltitudeRestItem) {
        this.ref = restItem.ref;
        this.height = restItem.height;
        this.unit = restItem.unit;
    }
}


export class AirspaceOlFeature extends MapItemOlFeature {
    public mapItemModel: Airspace;


    public constructor(airspace: Airspace) {
        super(airspace);
    }


    protected createOlStyle(): ol.style.Style {
        switch (this.mapItemModel.category) {
            case 'CTR':
                return new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(152, 206, 235, 0.3)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(23, 128, 194, 0.8)',
                        width: 3,
                        lineDash: [10, 7]
                    })
                });
            case 'A':
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(174, 30, 34, 0.8)',
                        width: 3
                    })
                });
            case 'B':
            case 'C':
            case 'D':
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(23, 128, 194, 0.8)',
                        width: 3
                    })
                });
            case 'E':
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(23, 128, 194, 0.8)',
                        width: 2
                    })
                });
            case 'DANGER':
            case 'RESTRICTED':
            case 'PROHIBITED':
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(174, 30, 34, 0.8)',
                        width: 2
                    })
                });
            case 'TMZ':
            case 'RMZ':
            case 'FIZ':
                return new ol.style.Style({
                    /*fill: new ol.style.Fill({
                     color: 'rgba(152, 206, 235, 0.3)'
                     }),*/
                    stroke: new ol.style.Stroke({
                        color: 'rgba(23, 128, 194, 0.8)',
                        // color: 'rgba(0, 0, 0, 1.0)',
                        width: 3,
                        lineDash: [1, 7]
                    })
                });
            case 'FIR':
            case 'UIR':
                return new ol.style.Style({
                    /*fill: new ol.style.Fill({
                     color: 'rgba(152, 206, 235, 0.3)'
                     }),*/
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 150, 64, 0.8)',
                        width: 3,
                        lineDash: [5, 20]
                    })
                });
            case 'GLIDING':
            case 'WAVE':
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 150, 64, 0.8)',
                        width: 2
                    })
                });
            default:
                return undefined;
        }
    }
}
