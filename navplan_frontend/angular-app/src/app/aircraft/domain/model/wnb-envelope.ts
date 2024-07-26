import {WnbEnvelopeCoordinate} from './wnb-envelope-coordinate';

export class WnbEnvelope {
    constructor(
        public name: string,
        public coordinates: WnbEnvelopeCoordinate[],
    ) {
    }
}
