import * as ol from 'openlayers';
import { environment } from '../../../environments/environment';
import { Position2d } from '../position';
import { MapItemGeometryType, MapItemModel, MapItemOlFeature } from './map-item-model';


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


export class Reportingpoint implements MapItemModel {
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
    }


    public getGeometryType(): MapItemGeometryType {
        return MapItemGeometryType.POINT;
    }


    public getGeometry(): Position2d {
        return this.position;
    }
}


export class ReportingPointOlFeature extends MapItemOlFeature<Reportingpoint> {
    protected createOlStyle(): ol.style.Style {
        let src = environment.iconBaseUrl;
        const rp = this.mapItemModel;

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
