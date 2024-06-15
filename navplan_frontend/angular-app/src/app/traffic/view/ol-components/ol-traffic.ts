import {Traffic} from '../../domain/model/traffic';
import {OlTrafficTrail} from './ol-traffic-trail';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlFeature} from '../../../base-map/view/ol-model/ol-feature';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {OlTrafficStyle} from './ol-traffic-style';
import { LengthUnit } from '../../../geo-physics/domain/model/quantities/length-unit';


export class OlTraffic {
    public olDotTrailFeature: OlTrafficTrail;


    constructor(
        private readonly traffic: Traffic,
        private readonly altitudeUnit: LengthUnit
    ) {
        this.olDotTrailFeature = new OlTrafficTrail(this.traffic);
    }


    public draw(trafficLayer: OlVectorLayer): void {
        // dot trail feature
        this.olDotTrailFeature.draw(trafficLayer);

        // traffic feature
        const olTrafficFeature = new OlFeature(this.traffic, true);
        olTrafficFeature.setStyle(OlTrafficStyle.getTrafficStyle(this.traffic, this.altitudeUnit));
        olTrafficFeature.setGeometry(OlGeometry.fromPoint(this.traffic.getCurrentPosition().position));
        trafficLayer.addFeature(olTrafficFeature);

        // call sign feature
        const olCallsignFeature = new OlFeature(this.traffic, true);
        olCallsignFeature.setStyle(OlTrafficStyle.getCallsignStyle(this.traffic));
        olCallsignFeature.setGeometry(OlGeometry.fromPoint(this.traffic.getCurrentPosition().position));
        trafficLayer.addFeature(olCallsignFeature);
    }
}
