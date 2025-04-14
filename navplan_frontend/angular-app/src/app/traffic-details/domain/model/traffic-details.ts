import {TrafficAddress} from '../../../traffic/domain/model/traffic-address';


export class TrafficDetails {
    constructor(
        public address: TrafficAddress,
        public registration: string,
        public model: string,
        public manufacturer: string,
        public icaoType: string,
        public acClass: string,
        public engClass: string
    ) {
    }
}
