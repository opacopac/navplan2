import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../../common/svg/image-dimensions-svg';


export class PerspectiveCalculator {
    public static calcXy(width: Length, height: Length, imgDim: ImageDimensionsSvg): [number, number] {
        const xy = imgDim.calcXy(width, height);
        const y = xy[1];
        const x = (xy[0] - imgDim.imageWidthPx / 2) * (1 - (imgDim.imageHeightPx - y) / imgDim.imageWidthPx * 2) + imgDim.imageWidthPx / 2;

        return [x, y];
    }
}
