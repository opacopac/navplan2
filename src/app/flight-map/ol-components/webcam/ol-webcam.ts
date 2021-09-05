import {Icon, Style} from 'ol/style';
import {environment} from '../../../../environments/environment';
import {Webcam} from '../../../webcam/domain-model/webcam';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {OlFeature} from '../../../base-map/ol-model/ol-feature';
import {OlVectorLayer} from '../../../base-map/ol-model/ol-vector-layer';
import {OlGeometry} from '../../../base-map/ol-model/ol-geometry';


export class OlWebcam {
    public static draw(
        webcam: Webcam,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(webcam, true);
        olFeature.setStyle(this.createPointStyle());
        olFeature.setGeometry(OlGeometry.fromPoint(webcam.position));
        layer.addFeature(olFeature);
    }


    private static createPointStyle(): Style {
        const src = environment.iconBaseUrl;

        return new Style({
            image: new Icon(({
                anchor: [0.5, 0.5],
                anchorXUnits: IconAnchorUnits.FRACTION,
                anchorYUnits: IconAnchorUnits.FRACTION,
                scale: 1,
                opacity: 0.9,
                src: src + 'webcam.svg'
            }))
        });
    }
}
