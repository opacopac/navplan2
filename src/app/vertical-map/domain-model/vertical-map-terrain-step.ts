import {Length} from '../../common/geo-math/domain-model/quantities/length';


export class VerticalMapTerrainStep {
    constructor(
        public elevationAmsl: Length,
        public horDist: Length
    ) {
    }
}
