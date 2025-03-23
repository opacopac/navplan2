import {Speed} from '../../geo-physics/domain/model/quantities/speed';

export class ImageTimeSpeedDimensionsSvg {
    public constructor(
        public minDate: Date,
        public maxDate: Date,
        public minSpeed: Speed,
        public maxSpeed: Speed,
        public imageWidthPx: number,
        public imageHeightPx: number,
    ) {
    }


    public calcX(date: Date): number {
        const dateWidthMs = this.maxDate.getTime() - this.minDate.getTime();
        const x = date.getTime() - this.minDate.getTime();

        return Math.round(x / dateWidthMs * this.imageWidthPx);
    }


    public calcY(speed: Speed): number {
        const lengthHeight = this.maxSpeed.kt - this.minSpeed.kt;
        const y = speed.kt - this.minSpeed.kt;

        return this.imageHeightPx - Math.round(y / lengthHeight * this.imageHeightPx);
    }


    public calcXy(date: Date, speed: Speed): [number, number] {
        return [this.calcX(date), this.calcY(speed)];
    }
}
