import {WnbEnvelopeCoordinate} from './wnb-envelope-coordinate';

export class WnbEnvelope {
    constructor(
        public name: string,
        public coordinates: WnbEnvelopeCoordinate[],
    ) {
    }


    public clone(): WnbEnvelope {
        return new WnbEnvelope(
            this.name,
            this.coordinates.map(c => c.clone())
        );
    }
}
