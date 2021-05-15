import {Feature} from 'ol';
import {Stroke, Style} from 'ol/style';
import {AirportCircuit} from '../domain-model/airport-circuit';
import VectorLayer from 'ol/layer/Vector';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


export class OlAirportCircuit {
    private readonly olFeature: Feature;


    public constructor(circuit: AirportCircuit, layer: VectorLayer) {
        this.olFeature = OlHelper.createFeature(circuit, false);
        this.olFeature.setStyle(this.createLineStyle());
        this.olFeature.setGeometry(
            OlHelper.getMultiLineGeometry(circuit.multiLineString.lineStrings.map(lineString => lineString.positions))
        );
        layer.getSource().addFeature(this.olFeature);
    }


    private createLineStyle(): Style {
        return new Style({
            stroke: new Stroke({
                color: 'rgba(0, 0, 0, 1)',
                width: 2})
        });
    }
}
