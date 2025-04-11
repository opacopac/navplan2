import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {Length} from '../../../geo-physics/domain/model/quantities/length';

export class WnbLonEnvelopeCoordinate {
    constructor(
        public weight: Weight,
        public armCg: Length,
    ) {
    }


    public clone(): WnbLonEnvelopeCoordinate {
        return new WnbLonEnvelopeCoordinate(
            this.weight?.clone(),
            this.armCg?.clone()
        );
    }
}
