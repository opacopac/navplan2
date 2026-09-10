import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {AltitudeSpan} from "./altitude-span";


export class AltitudeMetadata {
    public envelopeAlt: AltitudeSpan = AltitudeSpan.empty()
    public userAlt: AltitudeSpan = AltitudeSpan.empty()
    public minEnvelopeAlt: Length;
    public maxEnvelopeAlt: Length;
    public minUserAlt: Length;
    public maxUserAlt: Length;
    public displayAlt: Length;


    constructor() {
    }
}
