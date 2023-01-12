import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class VerticalMapPointSvg {
    public static create(
        dist: Length,
        height: Length,
        maxdistance: Length,
        maxelevation: Length,
        imageWidthPx: number,
        imageHeightPx: number,
    ): [number, number] {
        const x = Math.round(dist.m / maxdistance.m * imageWidthPx);
        const y = Math.round((maxelevation.m - height.m) / maxelevation.m * imageHeightPx);

        return [x, y];
    }
}
