import {Feature} from 'ol';
import {Fill, Stroke, Style, Text} from 'ol/style';
import {ReportingSector} from '../domain-model/reporting-sector';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import VectorLayer from 'ol/layer/Vector';


export class OlReportingSector extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        reportingSector: ReportingSector,
        layer: VectorLayer
    ) {
        super();

        this.olFeature = this.createFeature(reportingSector);
        this.olFeature.setStyle(this.createPolygonStyle(reportingSector));
        this.setPolygonGeometry(this.olFeature, reportingSector.polygon);
        layer.getSource().addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPolygonStyle(reportingSector: ReportingSector): Style {
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
