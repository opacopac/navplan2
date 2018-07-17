import * as ol from 'openlayers';
import {Reportingsector} from '../model/reportingsector';
import {OlComponent} from '../../shared/ol-component/ol-component';


export class OlReportingSector extends OlComponent {
    private readonly olFeature: ol.Feature;


    public constructor(
        reportingSector: Reportingsector,
        private readonly source: ol.source.Vector) {

        super();

        this.olFeature = this.createFeature(reportingSector);
        this.olFeature.setStyle(this.createPolygonStyle(reportingSector));
        this.setPolygonGeometry(this.olFeature, reportingSector.polygon);
        this.source.addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPolygonStyle(reportingSector: Reportingsector): ol.style.Style {
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(124, 47, 215, 0.3)'}),
            stroke: new ol.style.Stroke({
                color: 'rgba(124, 47, 215, 0.5)',
                width: 2}),
            text: new ol.style.Text({
                font: 'bold 14px Calibri,sans-serif',
                text: reportingSector.name,
                fill: new ol.style.Fill({color: '#7C4AD7'}),
                stroke: new ol.style.Stroke({color: '#FFFFFF', width: 2}),
            })
        });
    }
}
