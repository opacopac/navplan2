import {Feature} from 'ol';
import {Fill, Stroke, Style, Text} from 'ol/style';
import {ReportingSector} from '../../../aerodrome/domain-model/reporting-sector';
import VectorLayer from 'ol/layer/Vector';
import {OlHelper} from '../../../base-map/ol-service/ol-helper';


export class OlReportingSector {
    private readonly olFeature: Feature;


    public constructor(
        reportingSector: ReportingSector,
        layer: VectorLayer
    ) {
        this.olFeature = OlHelper.createFeature(reportingSector, true);
        this.olFeature.setStyle(this.createPolygonStyle(reportingSector));
        this.olFeature.setGeometry(OlHelper.getPolygonGeometry(reportingSector.polygon));
        layer.getSource().addFeature(this.olFeature);
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
