import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {Moment} from '../../../geo-physics/domain/model/quantities/moment';

export class WnbEnvelopeCoordinate {
    constructor(
        public weight: Weight,
        public moment: Moment,
    ) {
    }
}
