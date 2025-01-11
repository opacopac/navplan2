import {Length} from '../../geo-physics/domain/model/quantities/length';


export class ImageDimensionsSvg {
    public constructor(
        public maxWidth: Length,
        public maxHeight: Length,
        public imageWidthPx: number,
        public imageHeightPx: number,
    ) {
    }


    public calcX(x: Length): number {
        return Math.round(x.m / this.maxWidth.m * this.imageWidthPx);
    }


    public calcY(y: Length): number {
        return Math.round((this.maxHeight.m - y.m) / this.maxHeight.m * this.imageHeightPx);
    }


    public calcXy(x: Length, y: Length): [number, number] {
        return [this.calcX(x), this.calcY(y)];
    }
}
