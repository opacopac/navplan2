import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {Length} from '../../../geo-physics/domain/model/quantities/length';

export class WnbEnvelopeCoordinate {
    constructor(
        public weight: Weight,
        public armCg: Length,
    ) {
    }


    public clone(): WnbEnvelopeCoordinate {
        return new WnbEnvelopeCoordinate(
            this.weight?.clone(),
            this.armCg?.clone()
        );
    }
}
