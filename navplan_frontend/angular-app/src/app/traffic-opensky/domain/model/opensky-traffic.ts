import {TrafficAddress} from '../../../traffic/domain/model/traffic-address';
import {TrafficPosition} from '../../../traffic/domain/model/traffic-position';


export class OpenskyTraffic {
    constructor(
        public address: TrafficAddress,
        public callsign: string,
        public positions: TrafficPosition[]
    ) {
    }
}
