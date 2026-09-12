import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {AltitudeSpan} from "./altitude-span";


export class AltitudeMetadata {
    public user: AltitudeSpan = AltitudeSpan.empty()
    public perfEnv: AltitudeSpan = AltitudeSpan.empty()
    public perfEnvSteep: AltitudeSpan = AltitudeSpan.empty()
    public displayAlt: Length;


    constructor() {
    }
}

