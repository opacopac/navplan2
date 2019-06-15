import {Feature} from 'ol';
import {Vector} from 'ol/source';
import {Circle, Fill, Style} from 'ol/style';
import {OlComponentBase} from '../../base-map/ol/ol-component-base';
import {Traffic} from '../domain/traffic';


const MAX_AGE_SEC_TRACK_DOT = 120;
const DOT_STYLE = new Style({
    image: new Circle({
        radius: 2,
        fill: new Fill({
            color: '#FF0000'
        })
    })
});


export class OlTrafficTrail extends OlComponentBase {
    private readonly dotFeatures: Feature[];


    constructor(
        traffic: Traffic,
        private readonly source: Vector) {

        super();

        this.dotFeatures = [];
        for (let i = traffic.positions.length - 1; i >= 0; i--) {
            const pos4d = traffic.positions[i].position;
            if (Date.now() - pos4d.timestamp.epochMs < MAX_AGE_SEC_TRACK_DOT * 1000) {
                const dotFeature = this.createFeature(traffic);
                dotFeature.setStyle(DOT_STYLE);
                this.setPointGeometry(dotFeature, pos4d);
                this.source.addFeature(dotFeature);
                this.dotFeatures.push(dotFeature);
            } else {
                break;
            }
        }
    }


    public get isSelectable(): boolean {
        return false;
    }
}
