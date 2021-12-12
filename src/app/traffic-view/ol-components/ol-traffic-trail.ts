import {Circle, Fill, Style} from 'ol/style';
import {Traffic} from '../../traffic/domain-model/traffic';
import {OlVectorLayer} from '../../base-map-view/ol-model/ol-vector-layer';
import {OlFeature} from '../../base-map-view/ol-model/ol-feature';
import {OlGeometry} from '../../base-map-view/ol-model/ol-geometry';


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

    public draw(trafficLayer: OlVectorLayer): void {
        for (let i = this.traffic.positions.length - 1; i >= 0; i--) {
            const pos4d = this.traffic.positions[i].position;
            if (Date.now() - pos4d.timestamp.epochMs < MAX_AGE_SEC_TRACK_DOT * 1000) {
                const dotFeature = new OlFeature(this.traffic, false);
                dotFeature.setStyle(DOT_STYLE);
                dotFeature.setGeometry(OlGeometry.fromPoint(pos4d));
                trafficLayer.addFeature(dotFeature);
            } else {
                break;
            }
        }
    }
}
