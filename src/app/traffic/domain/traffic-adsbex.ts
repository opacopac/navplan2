import {TrafficAddress} from './traffic-address';
import {TrafficPosition} from './traffic-position';


export class TrafficAdsbex {
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
