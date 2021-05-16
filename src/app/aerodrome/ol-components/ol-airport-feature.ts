import {Feature} from 'ol';
import {Icon, Style} from 'ol/style';
import {environment} from '../../../environments/environment';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorLayer from 'ol/layer/Vector';
import {ShortAirport} from '../domain-model/short-airport';
import {OlHelper} from '../../base-map/ol-service/ol-helper';
import {AirportFeatureType} from '../domain-model/airport-feature-type';


export class OlAirportFeature {
    private readonly olFeature: Feature;


    public constructor(
        airport: ShortAirport,
        featureType: AirportFeatureType,
        layer: VectorLayer
    ) {
        this.olFeature = OlHelper.createFeature(airport, false);
        this.olFeature.setStyle(this.createPointStyle(featureType));
        this.olFeature.setGeometry(OlHelper.getPointGeometry(airport.position));
        layer.getSource().addFeature(this.olFeature);
    }


    protected createPointStyle(featureType: AirportFeatureType): Style {
        const src = environment.iconBaseUrl;

        if (featureType !== AirportFeatureType.PARACHUTE) {
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
