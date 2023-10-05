import {Webcam} from '../../domain/model/webcam';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {OlWebcamStyle} from './ol-webcam-style';


export class OlWebcam {
    public static draw(
        webcam: Webcam,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(webcam, true);
        olFeature.setStyle(OlWebcamStyle.STYLE);
        olFeature.setGeometry(OlGeometry.fromPoint(webcam.position));
        layer.addFeature(olFeature);
    }
}
