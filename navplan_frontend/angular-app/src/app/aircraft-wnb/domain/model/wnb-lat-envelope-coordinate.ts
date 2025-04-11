import {Length} from '../../../geo-physics/domain/model/quantities/length';

export class WnbLatEnvelopeCoordinate {
    constructor(
        public latArmCg: Length,
        public lonArmCg: Length,
    ) {
    }


    public clone(): WnbLatEnvelopeCoordinate {
        return new WnbLatEnvelopeCoordinate(
            this.latArmCg?.clone(),
            this.lonArmCg?.clone()
        );
    }
}
