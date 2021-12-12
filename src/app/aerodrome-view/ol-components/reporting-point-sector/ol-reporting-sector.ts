import {Fill, Stroke, Style, Text} from 'ol/style';
import {ReportingSector} from '../../../aerodrome/domain-model/reporting-sector';
import {OlVectorLayer} from '../../../base-map-view/ol-model/ol-vector-layer';
import {OlGeometry} from '../../../base-map-view/ol-model/ol-geometry';
import {OlFeature} from '../../../base-map-view/ol-model/ol-feature';


export class OlReportingSector {
    public static draw(
        reportingSector: ReportingSector,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(reportingSector, true);
        olFeature.setStyle(this.createPolygonStyle(reportingSector));
        olFeature.setGeometry(OlGeometry.fromPolygon(reportingSector.polygon));
        layer.addFeature(olFeature);
    }


    private static createPolygonStyle(reportingSector: ReportingSector): Style {
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
