import { Speed } from "../../../geo-physics/domain/model/quantities/speed";
import { RwyCorrectionFactors } from "../model/rwy-correction-factors";


export class MockZeroRwyCorrectionFactors {
    public static create(): RwyCorrectionFactors {
        return new RwyCorrectionFactors(
            false,
            false,
            0,
            Speed.ofZero(),
        );
    }
}
