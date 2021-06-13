import {Feature} from 'ol';
import {Icon, Style} from 'ol/style';
import {environment} from '../../../../environments/environment';
import {Webcam} from '../../../webcam/domain-model/webcam';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorLayer from 'ol/layer/Vector';
import {OlHelper} from '../../../base-map/ol-service/ol-helper';


export class OlWebcam {
    private readonly olFeature: Feature;


    public constructor(
        public webcam: Webcam,
        layer: VectorLayer
    ) {
        this.olFeature = OlHelper.createFeature(webcam, true);
        this.olFeature.setStyle(this.createPointStyle());
        this.olFeature.setGeometry(OlHelper.getPointGeometry(webcam.position));
        layer.getSource().addFeature(this.olFeature);
    }


    protected createPointStyle(): Style {
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
