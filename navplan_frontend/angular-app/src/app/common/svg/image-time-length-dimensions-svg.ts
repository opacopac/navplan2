import {Length} from '../../geo-physics/domain/model/quantities/length';

export class ImageTimeLengthDimensionsSvg {
    public constructor(
        public minDate: Date,
        public maxDate: Date,
        public minLength: Length,
        public maxLength: Length,
        public imageWidthPx: number,
        public imageHeightPx: number,
    ) {
    }


    public calcX(date: Date): number {
        const dateWidthMs = this.maxDate.getTime() - this.minDate.getTime();
        const x = date.getTime() - this.minDate.getTime();

        return Math.round(x / dateWidthMs * this.imageWidthPx);
    }


    public calcY(len: Length): number {
        const lengthHeight = this.maxLength.m - this.minLength.m;
        const y = len.m - this.minLength.m;

        return this.imageHeightPx - Math.round(y / lengthHeight * this.imageHeightPx);
    }


    public calcXy(date: Date, len: Length): [number, number] {
        return [this.calcX(date), this.calcY(len)];
    }
}
