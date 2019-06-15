import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Icon, Style} from 'ol/style';
import {environment} from '../../../environments/environment';
import {Webcam} from '../domain/webcam';
import {OlComponentBase} from '../../base-map/ol/ol-component-base';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';


export class OlWebcam extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        public webcam: Webcam,
        private readonly source: Vector) {

        super();

        this.olFeature = this.createFeature(webcam);
        this.olFeature.setStyle(this.createPointStyle());
        this.setPointGeometry(this.olFeature, webcam.position);
        this.source.addFeature(this.olFeature);
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
