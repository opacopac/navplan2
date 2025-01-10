import {SvgPolygonElement} from '../../../common/svg/svg-polygon-element';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {PlanPerfTakeoffCalculationState} from '../../state/state-model/plan-perf-takeoff-calculation-state';
import {PerspectiveCalculator} from './perspective-calculator';


export class PlanPerfRunwaySvg {
    public static create(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(this.createRwySvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createRwyThresholdSvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createRwyOppThresholdSvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createCenterLineSvg(tkofPerf, imgDim));

        return rwyGroup;
    }


    private static createRwySvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const points: [number, number][] = [];

        // rwy rectangle
        points.push(PerspectiveCalculator.calcXy(Length.ofZero(), Length.ofZero(), imgDim));
        points.push(PerspectiveCalculator.calcXy(Length.ofZero(), tkofPerf.rwy.width, imgDim));
        points.push(PerspectiveCalculator.calcXy(tkofPerf.rwy.length, tkofPerf.rwy.width, imgDim));
        points.push(PerspectiveCalculator.calcXy(tkofPerf.rwy.length, Length.ofZero(), imgDim));

        return SvgPolygonElement.create(
            points,
            'fill:gray; stroke:black; stroke-width:2px'
        );
    }


    private static createRwyThresholdSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const startXy = PerspectiveCalculator.calcXy(tkofPerf.threshold, Length.ofZero(), imgDim);
        const endXy = PerspectiveCalculator.calcXy(tkofPerf.threshold, tkofPerf.rwy.width, imgDim);

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


    private static createRwyOppThresholdSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const startXy = PerspectiveCalculator.calcXy(tkofPerf.oppThreshold, Length.ofZero(), imgDim);
        const endXy = PerspectiveCalculator.calcXy(tkofPerf.oppThreshold, tkofPerf.rwy.width, imgDim);

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


    private static createCenterLineSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const halfWidth = Length.ofM(tkofPerf.rwy.width.m / 2);
        const thresholdNumberLen = Length.ofM(6 + 30 + 12 + 9 + 12);
        const thresholdBegin = Length.ofM(tkofPerf.rwy.length.m - tkofPerf.rwy.lda.m);
        const thresholdEnd = Length.ofM(tkofPerf.rwy.tora.m);
        const startXy = PerspectiveCalculator.calcXy(thresholdBegin.add(thresholdNumberLen), halfWidth, imgDim);
        const endXy = PerspectiveCalculator.calcXy(thresholdEnd.subtract(thresholdNumberLen), halfWidth, imgDim);
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
