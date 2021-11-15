import {Length} from '../../common/geo-math/domain-model/quantities/length';


export class VerticalMapAirspaceStep {
    constructor(
        public botAltAmsl: Length,
        public topAltAmsl: Length,
        public horDist: Length
    ) {
    }
}
