import {ReportingSector} from '../../../domain/model/reporting-sector';
import {OlVectorLayer} from '../../../../base-map/view/ol-model/ol-vector-layer';
import {OlGeometry} from '../../../../base-map/view/ol-model/ol-geometry';
import {OlFeature} from '../../../../base-map/view/ol-model/ol-feature';
import {OlReportingSectorStyle} from './ol-reporting-sector-style';


export class OlReportingSector {
    public static draw(
        reportingSector: ReportingSector,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(reportingSector, true);
        olFeature.setStyle(OlReportingSectorStyle.createPolygonStyle(reportingSector));
        olFeature.setGeometry(OlGeometry.fromPolygon(reportingSector.polygon));
        layer.addFeature(olFeature);
    }
}
