import {OlAirportRunway} from './ol-airport-runway';
import {OlAirportFeature} from './ol-airport-feature';
import {ShortAirport} from '../../../aerodrome/domain-model/short-airport';
import {OlFeature} from '../../../base-map-view/ol-model/ol-feature';
import {OlVectorLayer} from '../../../base-map-view/ol-model/ol-vector-layer';
import {OlGeometry} from '../../../base-map-view/ol-model/ol-geometry';
import {OlAirportStyle} from './ol-airport-style';


export class OlAirport {
    public static draw(
        airport: ShortAirport,
        layer: OlVectorLayer
    ) {
        // airport
        const olFeature = new OlFeature(airport, true);
        olFeature.setStyle(OlAirportStyle.createPointStyle(airport));
        olFeature.setGeometry(OlGeometry.fromPoint(airport.position));
        layer.addFeature(olFeature);

        // runway
        if (airport.hasRunways && !airport.isClosed && !airport.isHeliport) {
            OlAirportRunway.draw(airport, layer);
        }

        // airport-features
        for (const adFeature of airport.featureTypes) {
            OlAirportFeature.draw(airport, adFeature, layer);
        }
    }
}
