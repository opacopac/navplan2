import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import {UserPoint} from '../../domain/model/user-point';
import {OlUserpointIcon} from './ol-userpoint-icon';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';


export class OlUserPoint {
    public constructor(
        userPoint: UserPoint,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(userPoint, true);
        olFeature.setStyle(this.createPointStyle(userPoint));
        olFeature.setGeometry(OlGeometry.fromPoint(userPoint.position));
        layer.addFeature(olFeature);
    }


    protected createPointStyle(userPoint: UserPoint): Style {
        const src = OlUserpointIcon.getUrl();

        return new Style({
            image: new Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
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
