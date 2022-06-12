import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class VerticalMapAirspaceStep {
    constructor(
        public botAltAmsl: Length,
        public topAltAmsl: Length,
        public horDist: Length
    ) {
    }
}
