import {Feature} from 'ol';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {ReportingPoint} from '../domain-model/reporting-point';
import {OlReportingpointIcon} from './ol-reportingpoint-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorLayer from 'ol/layer/Vector';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


export class OlReportingPoint {
    private readonly olFeature: Feature;


    public constructor(
        reportingPoint: ReportingPoint,
        layer: VectorLayer
    ) {
        this.olFeature = OlHelper.createFeature(reportingPoint, true);
        this.olFeature.setStyle(this.createPointStyle(reportingPoint));
        this.olFeature.setGeometry(OlHelper.getPointGeometry(reportingPoint.position));
        layer.getSource().addFeature(this.olFeature);
    }


    private createPointStyle(rp: ReportingPoint): Style {
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
