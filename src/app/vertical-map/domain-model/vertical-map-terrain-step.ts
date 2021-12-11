import {Length} from '../../geo-physics/domain-model/quantities/length';


export class VerticalMapTerrainStep {
    constructor(
        public elevationAmsl: Length,
        public horDist: Length
    ) {
    }
}
