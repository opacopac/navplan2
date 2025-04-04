import {ReportingPoint} from '../../domain/model/reporting-point';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {OlReportingPointStyle} from './ol-reporting-point-style';


export class OlReportingPoint {
    public static draw(
        reportingPoint: ReportingPoint,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(reportingPoint, true);
        olFeature.setStyle(OlReportingPointStyle.createPointStyle(reportingPoint));
        olFeature.setGeometry(OlGeometry.fromPoint(reportingPoint.position));
        layer.addFeature(olFeature);
    }
}
