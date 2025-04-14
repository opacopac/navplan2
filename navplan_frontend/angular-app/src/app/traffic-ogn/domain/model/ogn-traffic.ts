import {TrafficAddress} from '../../../traffic/domain/model/traffic-address';
import {TrafficAircraftType} from '../../../traffic/domain/model/traffic-aircraft-type';
import {TrafficPosition} from '../../../traffic/domain/model/traffic-position';


export class OgnTraffic {
    constructor(
        public address: TrafficAddress,
        public acType: TrafficAircraftType,
        public positions: TrafficPosition[]) {
    }
}
