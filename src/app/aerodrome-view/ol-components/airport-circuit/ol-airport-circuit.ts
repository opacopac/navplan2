import {AirportCircuit} from '../../../aerodrome/domain-model/airport-circuit';
import {OlVectorLayer} from '../../../base-map-view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map-view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map-view/ol-model/ol-geometry';
import {OlAirportCircuitStyle} from './ol-airport-circuit-style';


export class OlAirportCircuit {
    public static draw(circuit: AirportCircuit, layer: OlVectorLayer) {
        const olFeature = new OlFeature(circuit, false);
        olFeature.setStyle(OlAirportCircuitStyle.STYLE);
        olFeature.setGeometry(
            OlGeometry.fromMultiLine(
                circuit.multiLineString.lineStrings.map(lineString => lineString.positions)
            )
        );
        layer.addFeature(olFeature);
    }
}
