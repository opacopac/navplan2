import {ShortAirport} from '../../domain/model/short-airport';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';
import {OlAirportRunwayStyle} from './ol-airport-runway-style';


export class OlAirportRunway {
    public static draw(
        airport: ShortAirport,
        layer: OlVectorLayer
    ) {
        const olFeature = new OlFeature(airport, true);
        olFeature.setStyle(OlAirportRunwayStyle.createPointStyle(airport));
        olFeature.setGeometry(OlGeometry.fromPoint(airport.position));
        layer.addFeature(olFeature);
    }
}
