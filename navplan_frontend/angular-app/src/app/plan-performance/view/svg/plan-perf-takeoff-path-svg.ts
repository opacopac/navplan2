import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {PlanPerfTakeoffCalculationState} from '../../state/state-model/plan-perf-takeoff-calculation-state';
import {PerspectiveCalculator} from './perspective-calculator';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';


export class PlanPerfTakeoffPathSvg {
    public static create(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(this.createGroundRollSvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createAbortLineSvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createTkof50ftSvg(tkofPerf, imgDim));

        return rwyGroup;
    }


    private static createGroundRollSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const quaterWidth = Length.ofM(tkofPerf.rwy.width.m / 4);
        const startXy = PerspectiveCalculator.calcXy(Length.ofZero(), quaterWidth, imgDim);
        const endXy = PerspectiveCalculator.calcXy(tkofPerf.groundRoll, quaterWidth, imgDim);

        return SvgLineBuilder.builder()
            .setStartXy(startXy)
            .setEndXy(endXy)
            .setStrokeStyle('lawngreen', 2)
            .build();
    }


    private static createTkof50ftSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyQuaterWidth = Length.ofM(tkofPerf.rwy.width.m / 4);
        const height50ft = Length.ofM(tkofPerf.rwy.width.m * 2);
        const startXy = PerspectiveCalculator.calcXy(tkofPerf.groundRoll, rwyQuaterWidth, imgDim);
        const endXyGnd = PerspectiveCalculator.calcXy(tkofPerf.tkofDist50ft, rwyQuaterWidth, imgDim);
        const endXyAir = imgDim.calcXy(tkofPerf.tkofDist50ft, height50ft);
        const endXy: [number, number] = [endXyGnd[0], endXyAir[1]];

        return SvgLineBuilder.builder()
            .setStartXy(startXy)
            .setEndXy(endXy)
            .setStrokeStyle('deepskyblue', 2)
            .build();
    }


    private static createAbortLineSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyHalfWidth = Length.ofM(tkofPerf.rwy.width.m / 2);
        const rwyQuaterWidth = Length.ofM(tkofPerf.rwy.width.m / 4);
        const abortStart = Length.ofM(Math.min(tkofPerf.rwy.tora.m, tkofPerf.rwy.length.m - tkofPerf.tkofAbortDist.m));
        const abortStop = abortStart.add(tkofPerf.tkofAbortDist);
        const startXy = PerspectiveCalculator.calcXy(abortStart, rwyQuaterWidth, imgDim);
        const endXy = PerspectiveCalculator.calcXy(abortStop, rwyQuaterWidth, imgDim);

        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(SvgLineBuilder.builder()
            .setStartXy(startXy)
            .setEndXy(endXy)
            .setStrokeStyle('red', 2)
            .setStrokeDashArrayOnOff(10, 10)
            .build());

        // cross
        const crossHalfWidth = Length.ofM(tkofPerf.rwy.width.m / 5 * 2);
        const crossHalfHeight = Length.ofM(tkofPerf.rwy.width.m / 5);
        const c1StartXy = PerspectiveCalculator.calcXy(abortStart.subtract(crossHalfWidth), rwyQuaterWidth.subtract(crossHalfHeight), imgDim);
        const c1EndXy = PerspectiveCalculator.calcXy(abortStart.add(crossHalfWidth), rwyQuaterWidth.add(crossHalfHeight), imgDim);
        rwyGroup.appendChild(SvgLineBuilder.builder()
            .setStartXy(c1StartXy)
            .setEndXy(c1EndXy)
            .setStrokeStyle('red', 2)
            .build());

        const c2StartXy = PerspectiveCalculator.calcXy(abortStart.add(crossHalfWidth), rwyQuaterWidth.subtract(crossHalfHeight), imgDim);
        const c2EndXy = PerspectiveCalculator.calcXy(abortStart.subtract(crossHalfWidth), rwyQuaterWidth.add(crossHalfHeight), imgDim);
        rwyGroup.appendChild(SvgLineBuilder.builder()
            .setStartXy(c2StartXy)
            .setEndXy(c2EndXy)
            .setStrokeStyle('red', 2)
            .build());

        // stop line
        const stopLineStartXy = PerspectiveCalculator.calcXy(abortStop, Length.ofZero(), imgDim);
        const stopLineEndXy = PerspectiveCalculator.calcXy(abortStop, rwyHalfWidth, imgDim);
        rwyGroup.appendChild(SvgLineBuilder.builder()
            .setStartXy(stopLineStartXy)
            .setEndXy(stopLineEndXy)
            .setStrokeStyle('red', 2)
            .build());

        return rwyGroup;
    }
}
