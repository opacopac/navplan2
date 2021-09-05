import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {ReportingPoint} from '../../../aerodrome/domain-model/reporting-point';
import {OlReportingpointIcon} from './ol-reportingpoint-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {OlVectorLayer} from '../../../base-map/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/ol-model/ol-geometry';


export class OlReportingPoint {
    public static draw(
        reportingPoint: ReportingPoint,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(reportingPoint, true);
        olFeature.setStyle(this.createPointStyle(reportingPoint));
        olFeature.setGeometry(OlGeometry.fromPoint(reportingPoint.position));
        layer.addFeature(olFeature);
    }


    private static createPointStyle(rp: ReportingPoint): Style {
        const src = OlReportingpointIcon.getUrl(rp);

        return new Style({
            image: new Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: IconAnchorUnits.FRACTION,
                anchorYUnits: IconAnchorUnits.FRACTION,
                scale: 1,
                opacity: 0.9,
                src: src
            })),
            text: new Text({
                font: 'bold 14px Calibri,sans-serif',
                text: rp.name,
                fill: new Fill({color: '#0077FF'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 20
            })
        });
    }
}
