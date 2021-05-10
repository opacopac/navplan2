import {TrafficAddress} from './traffic-address';
import {TrafficPosition} from './traffic-position';


export class OpenskyTraffic {
    constructor(
        public address: TrafficAddress,
        public callsign: string,
        public positions: TrafficPosition[]
    ) {
    }
}
