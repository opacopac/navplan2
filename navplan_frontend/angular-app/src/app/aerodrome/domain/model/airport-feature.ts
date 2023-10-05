import {AirportFeatureType} from './airport-feature-type';


export class AirportFeature {
    constructor(
        public type: AirportFeatureType,
        public name: string
    ) {
    }
}
