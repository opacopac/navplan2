import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class AltitudeMetadata {
    public minEnvelopeAlt: Length;
    public maxEnvelopeAlt: Length;
    public minUserAlt: Length;
    public maxUserAlt: Length;
    public displayAlt: Length;


    constructor() {
    }
}
