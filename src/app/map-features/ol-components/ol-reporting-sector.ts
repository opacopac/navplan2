import * as ol from 'openlayers';
import { Reportingsector } from '../model/reportingsector';
import { OlFeaturePolygon } from '../../shared/model/ol-feature';


export class OlReportingSector extends OlFeaturePolygon {
    public constructor(
        public reportingSector: Reportingsector) {

        super(reportingSector);
    }


    protected getPolygon() {
        return this.reportingSector.polygon;
    }


    protected createPolygonStyle(): ol.style.Style {
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(124, 47, 215, 0.3)'}),
            stroke: new ol.style.Stroke({
                color: 'rgba(124, 47, 215, 0.5)',
                width: 2}),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: this.reportingSector.name,
                fill: new ol.style.Fill({color: '#7C4AD7'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
            })
        });
    }
}
