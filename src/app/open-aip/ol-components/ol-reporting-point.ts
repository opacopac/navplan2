import {Feature} from 'ol';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {Reportingpoint} from '../domain-model/reportingpoint';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {OlReportingpointIcon} from './ol-reportingpoint-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorLayer from 'ol/layer/Vector';


export class OlReportingPoint extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        reportingpoint: Reportingpoint,
        layer: VectorLayer
    ) {
        super();

        this.olFeature = this.createFeature(reportingpoint);
        this.olFeature.setStyle(this.createPointStyle(reportingpoint));
        this.setPointGeometry(this.olFeature, reportingpoint.position);
        layer.getSource().addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
    }


    private createPointStyle(rp: Reportingpoint): Style {
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
