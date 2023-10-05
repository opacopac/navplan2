import {TrafficAddress} from './traffic-address';
import {TrafficAircraftType} from './traffic-aircraft-type';
import {TrafficPosition} from './traffic-position';


export class OgnTraffic {
    constructor(
        public address: TrafficAddress,
        public acType: TrafficAircraftType,
        public positions: TrafficPosition[]) {
    }
}
