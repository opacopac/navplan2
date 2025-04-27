import {Angle} from '../../../geo-physics/domain/model/quantities/angle';


export class PdfParameters {
    constructor(
        public page: number,
        public rotation: Angle,
        public dpi: number,
    ) {
    }


    public static createDefault(): PdfParameters {
        return new PdfParameters(0, Angle.fromDeg(0), 200);
    }
}
