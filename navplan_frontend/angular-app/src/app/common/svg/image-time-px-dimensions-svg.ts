export class ImageTimePxDimensionsSvg {
    public constructor(
        public minDate: Date,
        public maxDate: Date,
        public imageWidthPx: number,
        public imageHeightPx: number,
    ) {
    }


    public calcX(date: Date): number {
        const dateWidthMs = this.maxDate.getTime() - this.minDate.getTime();
        const x = date.getTime() - this.minDate.getTime();

        return Math.round(x / dateWidthMs * this.imageWidthPx);
    }


    public calcY(y: number): number {
        return y;
    }


    public calcXy(date: Date, y: number): [number, number] {
        return [this.calcX(date), this.calcY(y)];
    }
}
