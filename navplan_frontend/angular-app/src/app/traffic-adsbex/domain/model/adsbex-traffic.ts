import {TrafficAddress} from '../../../traffic/domain/model/traffic-address';
import {TrafficPosition} from '../../../traffic/domain/model/traffic-position';


export class AdsbexTraffic {
    constructor(
        public address: TrafficAddress,
        public icaoType: string,
        public registration: string,
        public callsign: string,
        public opIcao: string,
        public positions: TrafficPosition[]
    ) {
    }
}
