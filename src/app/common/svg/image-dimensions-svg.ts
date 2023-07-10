import {Length} from '../../geo-physics/domain/model/quantities/length';


export class ImageDimensionsSvg {
    public constructor(
        public maxWidth: Length,
        public maxHeight: Length,
        public imageWidthPx: number,
        public imageHeightPx: number,
    ) {
    }


    public calcXy(width: Length, height: Length): [number, number] {
        const x = Math.round(width.m / this.maxWidth.m * this.imageWidthPx);
        const y = Math.round((this.maxHeight.m - height.m) / this.maxHeight.m * this.imageHeightPx);

        return [x, y];
    }
}
