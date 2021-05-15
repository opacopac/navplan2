import {Circle, Fill, Style} from 'ol/style';
import {Traffic} from '../domain-model/traffic';
import VectorLayer from 'ol/layer/Vector';
import {OlHelper} from '../../base-map/ol-service/ol-helper';


const MAX_AGE_SEC_TRACK_DOT = 120;
const DOT_STYLE = new Style({
    image: new Circle({
        radius: 2,
        fill: new Fill({
            color: '#FF0000'
        })
    })
});


export class OlTrafficTrail {
    public constructor(private readonly traffic: Traffic) {
    }

    public draw(trafficLayer: VectorLayer): void {
        for (let i = this.traffic.positions.length - 1; i >= 0; i--) {
            const pos4d = this.traffic.positions[i].position;
            if (Date.now() - pos4d.timestamp.epochMs < MAX_AGE_SEC_TRACK_DOT * 1000) {
                const dotFeature = OlHelper.createFeature(this.traffic, false);
                dotFeature.setStyle(DOT_STYLE);
                dotFeature.setGeometry(OlHelper.getPointGeometry(pos4d));
                trafficLayer.getSource().addFeature(dotFeature);
            } else {
                break;
            }
        }
    }
}
