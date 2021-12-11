import {Icon, Style} from 'ol/style';
import {environment} from '../../../../environments/environment';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {ShortAirport} from '../../../aerodrome/domain-model/short-airport';
import {AirportFeatureType} from '../../../aerodrome/domain-model/airport-feature-type';
import {OlVectorLayer} from '../../../base-map/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/ol-model/ol-geometry';


export class OlAirportFeature {
    public static draw(
        airport: ShortAirport,
        featureType: AirportFeatureType,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(airport, false);
        olFeature.setStyle(this.createPointStyle(featureType));
        olFeature.setGeometry(OlGeometry.fromPoint(airport.position));
        layer.addFeature(olFeature);
    }


    private static createPointStyle(featureType: AirportFeatureType): Style {
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
