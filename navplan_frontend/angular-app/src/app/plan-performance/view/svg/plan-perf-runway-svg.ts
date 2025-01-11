import {SvgPolygonElement} from '../../../common/svg/svg-polygon-element';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {PerspectiveCalculator} from './perspective-calculator';
import {AirportRunway} from '../../../aerodrome/domain/model/airport-runway';


export class PlanPerfRunwaySvg {
    public static create(rwy: AirportRunway, threshold: Length, oppThreshold: Length, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(this.createRwySvg(rwy, imgDim));
        rwyGroup.appendChild(this.createRwyThresholdSvg(rwy, threshold, false, imgDim));
        rwyGroup.appendChild(this.createRwyThresholdSvg(rwy, oppThreshold, true, imgDim));
        rwyGroup.appendChild(this.createCenterLineSvg(rwy, threshold, oppThreshold, imgDim));

        return rwyGroup;
    }


    private static createRwySvg(rwy: AirportRunway, imgDim: ImageDimensionsSvg): SVGGElement {
        const points: [number, number][] = [];

        // rwy rectangle
        points.push(PerspectiveCalculator.calcXy(Length.ofZero(), Length.ofZero(), imgDim));
        points.push(PerspectiveCalculator.calcXy(Length.ofZero(), rwy.width, imgDim));
        points.push(PerspectiveCalculator.calcXy(rwy.length, rwy.width, imgDim));
        points.push(PerspectiveCalculator.calcXy(rwy.length, Length.ofZero(), imgDim));

        return SvgPolygonElement.create(
            points,
            'fill:gray; stroke:black; stroke-width:2px'
        );
    }


    private static createRwyThresholdSvg(rwy: AirportRunway, threshold: Length, isOpposite: boolean, imgDim: ImageDimensionsSvg): SVGGElement {
        const startXy = PerspectiveCalculator.calcXy(threshold, Length.ofZero(), imgDim);
        const endXy = PerspectiveCalculator.calcXy(threshold, rwy.width, imgDim);

        return SvgLineElement.create(
            startXy[0].toString(),
            endXy[0].toString(),
            startXy[1].toString(),
            endXy[1].toString(),
            'stroke:white; stroke-width:2px',
            '',
            '',
            ''
        );
    }


    private static createCenterLineSvg(rwy: AirportRunway, threshold: Length, oppThreshold: Length, imgDim: ImageDimensionsSvg): SVGGElement {
        const halfWidth = Length.ofM(rwy.width.m / 2);
        const thresholdNumberLen = Length.ofM(6 + 30 + 12 + 9 + 12);
        const startXy = PerspectiveCalculator.calcXy(threshold.add(thresholdNumberLen), halfWidth, imgDim);
        const endXy = PerspectiveCalculator.calcXy(oppThreshold.subtract(thresholdNumberLen), halfWidth, imgDim);
        const dashLenOnPx = imgDim.calcXy(Length.ofM(30), Length.ofZero())[0];
        const dashLenOffPx = imgDim.calcXy(Length.ofM(20), Length.ofZero())[0];

        return SvgLineElement.create(
            startXy[0].toString(),
            endXy[0].toString(),
            startXy[1].toString(),
            endXy[1].toString(),
            'stroke:white; stroke-width:2px',
            '',
            '',
            dashLenOnPx.toString() + ',' + dashLenOffPx.toString()
        );
    }
}
