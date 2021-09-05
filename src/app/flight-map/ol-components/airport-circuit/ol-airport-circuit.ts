import {Stroke, Style} from 'ol/style';
import {AirportCircuit} from '../../../aerodrome/domain-model/airport-circuit';
import {OlVectorLayer} from '../../../base-map/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/ol-model/ol-geometry';


export class OlAirportCircuit {
    public static draw(circuit: AirportCircuit, layer: OlVectorLayer) {
        const olFeature = new OlFeature(circuit, false);
        olFeature.setStyle(this.createLineStyle());
        olFeature.setGeometry(
            OlGeometry.fromMultiLine(
                circuit.multiLineString.lineStrings.map(lineString => lineString.positions)
            )
        );
        layer.addFeature(olFeature);
    }


    private static createLineStyle(): Style {
        return new Style({
            stroke: new Stroke({
                color: 'rgba(0, 0, 0, 1)',
                width: 2})
        });
    }
}
