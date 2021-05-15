import {Feature} from 'ol';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {UserPoint} from '../domain-model/user-point';
import {OlUserpointIcon} from './ol-userpoint-icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorLayer from 'ol/layer/Vector';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


export class OlUserPoint {
    private readonly olFeature: Feature;


    public constructor(
        userPoint: UserPoint,
        layer: VectorLayer
    ) {
        this.olFeature = OlHelper.createFeature(userPoint, true);
        this.olFeature.setStyle(this.createPointStyle(userPoint));
        this.olFeature.setGeometry(OlHelper.getPointGeometry(userPoint.position));
        layer.getSource().addFeature(this.olFeature);
    }


    protected createPointStyle(userPoint: UserPoint): Style {
        const src = OlUserpointIcon.getUrl();

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
                text: userPoint.name,
                fill: new Fill({color: '#0077FF'}),
                stroke: new Stroke({color: '#FFFFFF', width: 2}),
                offsetX: 0,
                offsetY: 20
            })
        });
    }
}
