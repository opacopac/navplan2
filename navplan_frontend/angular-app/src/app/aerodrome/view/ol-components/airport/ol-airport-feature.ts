import {Icon, Style} from 'ol/style';
import {environment} from '../../../../../environments/environment';
import {ShortAirport} from '../../../domain/model/short-airport';
import {AirportFeatureType} from '../../../domain/model/airport-feature-type';
import {OlVectorLayer} from '../../../../base-map/view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../../base-map/view/ol-model/ol-feature';
import {OlGeometry} from '../../../../base-map/view/ol-model/ol-geometry';


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
                anchorXUnits: 'pixels',
                anchorYUnits: 'pixels',
                scale: 1,
                rotateWithView: false,
                opacity: 0.8,
                src: src + 'feature_parachute.png'
            }))
        });
    }
}
