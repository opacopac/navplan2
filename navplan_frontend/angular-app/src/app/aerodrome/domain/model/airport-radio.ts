import {Frequency} from '../../../geo-physics/domain/model/quantities/frequency';

export class AirportRadio {
    constructor(
        public type: string,
        public category: string,
        public name: string,
        public frequency: Frequency
    ) {
    }
}
