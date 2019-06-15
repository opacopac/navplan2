import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Style, Stroke} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import {OlComponentBase} from '../../base-map/ol/ol-component-base';
import {Flightroute} from '../domain/flightroute';


export class OlAlternateLine extends OlComponentBase {
    private readonly lineFeature: Feature;


    public constructor(
        private readonly flightroute: Flightroute,
        private readonly source: Vector,
        private readonly snapToLayers: VectorLayer[]) {

        super();

        this.lineFeature = new Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.setGeometry(this.lineFeature, flightroute);
        this.source.addFeature(this.lineFeature);
    }


    public get isSelectable(): boolean {
        return false;
    }


    private setGeometry(lineFeature: Feature, flightroute: Flightroute) {
        if (flightroute.waypoints.length > 0 && flightroute.alternate) {
            const pos1 = flightroute.waypoints[flightroute.waypoints.length - 1].position;
            const pos2 = flightroute.alternate.position;
            this.setLineGeometry(lineFeature, [pos1, pos2]);
        } else {
            this.hideFeature(lineFeature);
        }
    }


    private getStyle(): Style {
        return new Style({
            stroke: new Stroke({
                color: '#FF00FF',
                width: 4,
                lineDash: [10, 10]
            })
        });
    }
}
