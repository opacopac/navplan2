import {SvgPolygonElement} from '../../../common/svg/svg-polygon-element';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';


export class PlanPerfRunwaySvg {
    public static create(rwyLength: Length, rwyWidth: Length, imgDim: ImageDimensionsSvg): SVGPolygonElement {
        const points: [number, number][] = [];

        // point bottom left
        points.push(imgDim.calcXy(Length.ofZero(), Length.ofZero()));

        // point top left
        points.push(imgDim.calcXy(rwyWidth, rwyWidth));

        // point top right
        points.push(imgDim.calcXy(rwyLength.subtract(rwyWidth), rwyWidth));

        // point bottom right
        points.push(imgDim.calcXy(rwyLength, Length.ofZero()));

        return SvgPolygonElement.create(
            points,
            'fill:gray; stroke:black; stroke-width:2px'
        );
    }
}
