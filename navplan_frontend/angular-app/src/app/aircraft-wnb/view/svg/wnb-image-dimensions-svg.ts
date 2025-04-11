import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class WnbImageDimensionsSvg {
    public constructor(
        public minWidth: Length,
        public maxWidth: Length,
        public minHeight: Weight,
        public maxHeight: Weight,
        public imageWidthPx: number,
        public imageHeightPx: number,
    ) {
    }


    public calcXy(width: Length, height: Weight): [number, number] {
        const diffWidthM = this.maxWidth.m - this.minWidth.m;
        const diffHeightM = this.maxHeight.kg - this.minHeight.kg;
        const x = Math.round((width.m - this.minWidth.m) / diffWidthM * this.imageWidthPx);
        const y = Math.round((this.maxHeight.kg - height.kg) / diffHeightM * this.imageHeightPx);

        return [x, y];
    }
}
