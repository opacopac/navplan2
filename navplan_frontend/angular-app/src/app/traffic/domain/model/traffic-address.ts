import {TrafficAddressType} from './traffic-address-type';
import {Clonable} from '../../../system/domain/model/clonable';


export class TrafficAddress implements Clonable<TrafficAddress> {
    constructor(
        public value: string,
        public type: TrafficAddressType
    ) {
        if (value === undefined || type === undefined) {
            throw new Error('aircraft address & type must be defined');
        }

        this.value = value.trim().toUpperCase();
    }


    public clone(): TrafficAddress {
        return new TrafficAddress(this.value, this.type);
    }
}
