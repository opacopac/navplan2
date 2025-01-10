import {SvgPolygonElement} from '../../../common/svg/svg-polygon-element';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgLineElement} from '../../../common/svg/svg-line-element';


export class PlanPerfRunwaySvg {
    public static create(rwyLength: Length, rwyWidth: Length, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyGroup = SvgGroupElement.create();

        const points: [number, number][] = [];

        // rwy rectangle
        points.push(this.calcPerspectiveXy(Length.ofZero(), Length.ofZero(), imgDim));
        points.push(this.calcPerspectiveXy(Length.ofZero(), rwyWidth, imgDim));
        points.push(this.calcPerspectiveXy(rwyLength, rwyWidth, imgDim));
        points.push(this.calcPerspectiveXy(rwyLength, Length.ofZero(), imgDim));
        rwyGroup.appendChild(SvgPolygonElement.create(
            points,
            'fill:gray; stroke:black; stroke-width:2px'
        ));

        // center line
        const halfWidth = Length.ofM(rwyWidth.m / 2);
        const offset = Length.ofM(6 + 30 + 12 + 9 + 12);
        const startXy = this.calcPerspectiveXy(halfWidth.add(offset), halfWidth, imgDim);
        const endXy = this.calcPerspectiveXy(rwyLength.subtract(offset), halfWidth, imgDim);
        const dashLenOnPx = imgDim.calcXy(Length.ofM(30), Length.ofZero())[0];
        const dashLenOffPx = imgDim.calcXy(Length.ofM(20), Length.ofZero())[0];
        rwyGroup.appendChild(SvgLineElement.create(
            startXy[0].toString(),
            endXy[0].toString(),
            startXy[1].toString(),
            endXy[1].toString(),
            'stroke:white; stroke-width:2px',
            '',
            '',
            dashLenOnPx.toString() + ',' + dashLenOffPx.toString() // '30, 20'
        ));

        return rwyGroup;
    }


    private static calcPerspectiveXy(width: Length, height: Length, imgDim: ImageDimensionsSvg): [number, number] {
        const xy = imgDim.calcXy(width, height);
        const y = xy[1];
        const x = (xy[0] - imgDim.imageWidthPx / 2) * (1 - (imgDim.imageHeightPx - y) / imgDim.imageWidthPx * 2) + imgDim.imageWidthPx / 2;

        return [x, y];
    }
}
