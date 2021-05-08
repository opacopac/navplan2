import {Feature} from 'ol';
import {Stroke, Style} from 'ol/style';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {Circuit} from '../domain-model/circuit';
import VectorLayer from 'ol/layer/Vector';


export class OlCircuit extends OlComponentBase {
    private readonly olFeature: Feature;


    public constructor(circuit: Circuit, layer: VectorLayer) {
        super();

        this.olFeature = this.createFeature(circuit);
        this.olFeature.setStyle(this.createLineStyle());
        this.setMultiLineGeometry(this.olFeature, circuit.multiLineString.lineStrings.map(lineString => lineString.positions));
        layer.getSource().addFeature(this.olFeature);
    }


    public get isSelectable(): boolean {
        return false;
    }


    private createLineStyle(): Style {
        return new Style({
            stroke: new Stroke({
                color: 'rgba(0, 0, 0, 1)',
                width: 2})
        });
    }
}