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
        points.push(imgDim.calcXy(Length.ofZero(), Length.ofZero()));
        points.push(imgDim.calcXy(rwyWidth, rwyWidth));
        points.push(imgDim.calcXy(rwyLength.subtract(rwyWidth), rwyWidth));
        points.push(imgDim.calcXy(rwyLength, Length.ofZero()));

        rwyGroup.appendChild(SvgPolygonElement.create(
            points,
            'fill:gray; stroke:black; stroke-width:2px'
        ));

        // center line
        const halfWidth = Length.ofM(rwyWidth.m / 2);
        const offset = Length.ofM(50);
        const startXy = imgDim.calcXy(halfWidth.add(offset), halfWidth);
        const endXy = imgDim.calcXy(rwyLength.subtract(halfWidth).subtract(offset), halfWidth);
        rwyGroup.appendChild(SvgLineElement.create(
            startXy[0].toString(),
            endXy[0].toString(),
            startXy[1].toString(),
            endXy[1].toString(),
            'stroke:white; stroke-width:2px',
            '',
            '',
            '30, 20'
        ));

        return rwyGroup;
    }
}
