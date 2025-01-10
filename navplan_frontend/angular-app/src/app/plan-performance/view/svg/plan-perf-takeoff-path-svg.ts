import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {PlanPerfTakeoffCalculationState} from '../../state/state-model/plan-perf-takeoff-calculation-state';
import {PerspectiveCalculator} from './perspective-calculator';


export class PlanPerfTakeoffPathSvg {
    public static create(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(this.createGroundRollSvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createTkof50ftSvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createAbortLineSvg(tkofPerf, imgDim));

        return rwyGroup;
    }


    private static createGroundRollSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const quaterWidth = Length.ofM(tkofPerf.rwy.width.m / 4);
        const startXy = PerspectiveCalculator.calcXy(Length.ofZero(), quaterWidth, imgDim);
        const endXy = PerspectiveCalculator.calcXy(tkofPerf.groundRoll, quaterWidth, imgDim);

        return SvgLineElement.create(
            startXy[0].toString(),
            endXy[0].toString(),
            startXy[1].toString(),
            endXy[1].toString(),
            'stroke:lawngreen; stroke-width:2px'
        );
    }


    private static createTkof50ftSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const quaterWidth = Length.ofM(tkofPerf.rwy.width.m / 4);
        const height50ft = Length.ofM(tkofPerf.rwy.width.m * 2);
        const startXy = PerspectiveCalculator.calcXy(tkofPerf.groundRoll, quaterWidth, imgDim);
        const endXyGnd = PerspectiveCalculator.calcXy(tkofPerf.tkofDist50ft, quaterWidth, imgDim);
        const endXyAir = imgDim.calcXy(tkofPerf.tkofDist50ft, height50ft);

        return SvgLineElement.create(
            startXy[0].toString(),
            endXyGnd[0].toString(),
            startXy[1].toString(),
            endXyAir[1].toString(),
            'stroke:deepskyblue; stroke-width:2px'
        );
    }


    private static createAbortLineSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const quaterWidth = Length.ofM(tkofPerf.rwy.width.m / 4);
        const abortPoint = Length.ofM(Math.min(tkofPerf.rwy.tora.m, tkofPerf.rwy.length.m - tkofPerf.tkofAbortDist.m));
        const startXy = PerspectiveCalculator.calcXy(abortPoint, quaterWidth, imgDim);
        const endXy = PerspectiveCalculator.calcXy(abortPoint.add(tkofPerf.tkofAbortDist), quaterWidth, imgDim);

        return SvgLineElement.create(
            startXy[0].toString(),
            endXy[0].toString(),
            startXy[1].toString(),
            endXy[1].toString(),
            'stroke:red; stroke-width:2px',
            '',
            '',
            '10,10'
        );
    }
}
