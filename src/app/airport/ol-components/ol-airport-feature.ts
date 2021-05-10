import {Feature} from 'ol';
import {Icon, Style} from 'ol/style';
import {environment} from '../../../environments/environment';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorLayer from 'ol/layer/Vector';
import {ShortAirport} from '../domain-model/short-airport';


export class OlAirportFeature extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(
        airport: ShortAirport,
        featureType: string,
        layer: VectorLayer
    ) {
        super();

        this.olFeature = this.createFeature(airport);
        this.olFeature.setStyle(this.createPointStyle(featureType));
        this.setPointGeometry(this.olFeature, airport.position);
        layer.getSource().addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return false;
    }


    protected createPointStyle(featureType: string): Style {
        const src = environment.iconBaseUrl;

        if (featureType !== 'PARACHUTE') {
            return undefined;
        }

        return new Style({
            image: new Icon(({
                anchor: [45, 16],
                anchorXUnits: IconAnchorUnits.PIXELS,
                anchorYUnits: IconAnchorUnits.PIXELS,
                scale: 1,
                rotateWithView: false,
                opacity: 0.8,
                src: src + 'feature_parachute.png'
            }))
        });
    }
}
