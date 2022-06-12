import {Navaid} from '../../../domain/model/navaid';
import {OlVectorLayer} from '../../../../base-map/view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../../base-map/view/ol-model/ol-feature';
import {OlGeometry} from '../../../../base-map/view/ol-model/ol-geometry';
import {OlNavaidStyle} from './ol-navaid-style';


export class OlNavaid {
    public static draw(
        navaid: Navaid,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(navaid, true);
        olFeature.setStyle(OlNavaidStyle.createPointStyle(navaid));
        olFeature.setGeometry(OlGeometry.fromPoint(navaid.position));
        layer.addFeature(olFeature);
    }
}
