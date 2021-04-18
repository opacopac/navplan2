import {Feature} from 'ol';
import {Icon, Style} from 'ol/style';
import {environment} from '../../../environments/environment';
import {Webcam} from '../domain-model/webcam';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorLayer from 'ol/layer/Vector';


export class OlWebcam extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        public webcam: Webcam,
        layer: VectorLayer
    ) {
        super();

        this.olFeature = this.createFeature(webcam);
        this.olFeature.setStyle(this.createPointStyle());
        this.setPointGeometry(this.olFeature, webcam.position);
        layer.getSource().addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return true;
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
