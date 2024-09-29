import { Speed } from "../../../geo-physics/domain/model/quantities/speed";


export class RwyCorrectionFactors {
    public constructor(
        public isGrassRwy: boolean,
        public isWetRwy: boolean,
        public rwyDownhillSlopePercent: number,
        public headwind: Speed
    ) {
    }
}
