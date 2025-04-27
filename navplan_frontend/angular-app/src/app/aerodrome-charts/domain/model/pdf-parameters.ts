import {Angle} from '../../../geo-physics/domain/model/quantities/angle';


export class PdfParameters {
    public static readonly DEFAULT_DPI = 200;
    public static readonly DEFAULT_ROTATION_DEG = 0;
    public static readonly DEFAULT_PAGE = 0;


    constructor(
        public page: number,
        public rotation: Angle,
        public dpi: number,
    ) {
    }


    public static createDefault(): PdfParameters {
        return new PdfParameters(
            this.DEFAULT_PAGE,
            Angle.fromDeg(this.DEFAULT_ROTATION_DEG),
            this.DEFAULT_DPI
        );
    }
}
