import {Circle, Fill, Style} from 'ol/style';
import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {Traffic} from '../domain-model/traffic';
import VectorLayer from 'ol/layer/Vector';


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
    public constructor(private readonly traffic: Traffic) {
        super();
    }

    public draw(trafficLayer: VectorLayer): void {
        for (let i = this.traffic.positions.length - 1; i >= 0; i--) {
            const pos4d = this.traffic.positions[i].position;
            if (Date.now() - pos4d.timestamp.epochMs < MAX_AGE_SEC_TRACK_DOT * 1000) {
                const dotFeature = this.createFeature(this.traffic);
                dotFeature.setStyle(DOT_STYLE);
                this.setPointGeometry(dotFeature, pos4d);
                trafficLayer.getSource().addFeature(dotFeature);
            } else {
                break;
            }
        }
    }


    public get isSelectable(): boolean {
        return false;
    }
}
