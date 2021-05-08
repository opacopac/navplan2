import {Feature} from 'ol';
import {Fill, Stroke, Style, Text} from 'ol/style';
import {Reportingsector} from '../domain-model/reportingsector';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';


export class OlReportingSector extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(reportingSector: Reportingsector) {
        super();

        this.olFeature = this.createFeature(reportingSector);
        this.olFeature.setStyle(this.createPolygonStyle(reportingSector));
        this.setPolygonGeometry(this.olFeature, reportingSector.polygon);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPolygonStyle(reportingSector: Reportingsector): Style {
        return new Style({
            fill: new Fill({
                color: 'rgba(124, 47, 215, 0.3)'}),
            stroke: new Stroke({
                color: 'rgba(124, 47, 215, 0.5)',
                width: 2}),
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: reportingSector.name,
                fill: new Fill({color: '#7C4AD7'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
            })
        });
    }
}