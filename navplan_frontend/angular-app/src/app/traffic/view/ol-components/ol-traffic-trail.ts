import {Traffic} from '../../domain/model/traffic';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {OlTrafficTrailStyle} from './ol-traffic-trail-style';


export class OlTrafficTrail {
    private static readonly MAX_AGE_SEC_TRACK_DOT = 120;


    public constructor(private readonly traffic: Traffic) {
    }


    public draw(trafficLayer: OlVectorLayer): void {
        for (let i = this.traffic.positions.length - 1; i >= 0; i--) {
            const pos4d = this.traffic.positions[i].position;
            if (Date.now() - pos4d.timestamp.epochMs < OlTrafficTrail.MAX_AGE_SEC_TRACK_DOT * 1000) {
                const dotFeature = new OlFeature(this.traffic, false);
                dotFeature.setStyle(OlTrafficTrailStyle.DOT_STYLE);
                dotFeature.setGeometry(OlGeometry.fromPoint(pos4d));
                trafficLayer.addFeature(dotFeature);
            } else {
                break;
            }
        }
    }
}
