import * as ol from 'openlayers';
import { Polygon } from '../polygon';
import { MapItemGeometryType, MapItemModel, MapItemOlFeature } from './map-item-model';
import { ReportingPointRestItem } from './reportingpoint';


export class Reportingsector implements MapItemModel {
    id: number;
    type: string;
    airport_icao: string;
    name: string;
    heli: boolean;
    inbd_comp: boolean;
    outbd_comp: boolean;
    min_ft: number;
    max_ft: number;
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
        this.polygon = Polygon.createFromLonLatList(restItem.polygon);
    }


    public getGeometryType(): MapItemGeometryType {
        return MapItemGeometryType.POLYGON;
    }


    public getGeometry(): Polygon {
        return this.polygon;
    }
}


export class ReportingSectorOlFeature extends MapItemOlFeature<Reportingsector> {
    protected createOlStyle(): ol.style.Style {
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(124, 47, 215, 0.3)'}),
            stroke: new ol.style.Stroke({
                color: 'rgba(124, 47, 215, 0.5)',
                width: 2}),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: this.mapItemModel.name,
                fill: new ol.style.Fill({color: '#7C4AD7'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
            })
        });
    }
}
