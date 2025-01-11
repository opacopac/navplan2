import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {PerspectiveCalculator} from './perspective-calculator';
import {PlanPerfLandingCalculationState} from '../../state/state-model/plan-perf-landing-calculation-state';


export class PlanPerfLandingPathSvg {
    public static create(ldgPerf: PlanPerfLandingCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(this.createLdg50ftSvg(ldgPerf, imgDim));
        rwyGroup.appendChild(this.createLdgGroundRollSvg(ldgPerf, imgDim));

        return rwyGroup;
    }


    private static createLdg50ftSvg(ldgPerf: PlanPerfLandingCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const quaterWidth = Length.ofM(ldgPerf.rwy.width.m / 4);
        const height50ft = Length.ofM(ldgPerf.rwy.width.m * 2);
        const startLength = ldgPerf.threshold.subtract(ldgPerf.ldgDist50ft.subtract(ldgPerf.ldgGroundRoll));
        const startXyGnd = PerspectiveCalculator.calcXy(startLength, quaterWidth, imgDim);
        const startXyAir = imgDim.calcXy(startLength, height50ft);
        const endXy = PerspectiveCalculator.calcXy(ldgPerf.threshold, quaterWidth, imgDim);

        return SvgLineElement.create(
            startXyGnd[0].toString(),
            endXy[0].toString(),
            startXyAir[1].toString(),
            endXy[1].toString(),
            'stroke:deepskyblue; stroke-width:2px'
        );
    }


    private static createLdgGroundRollSvg(ldgPerf: PlanPerfLandingCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const quaterWidth = Length.ofM(ldgPerf.rwy.width.m / 4);
        const startXy = PerspectiveCalculator.calcXy(ldgPerf.threshold, quaterWidth, imgDim);
        const endXy = PerspectiveCalculator.calcXy(ldgPerf.threshold.add(ldgPerf.ldgGroundRoll), quaterWidth, imgDim);

        return SvgLineElement.create(
            startXy[0].toString(),
            endXy[0].toString(),
            startXy[1].toString(),
            endXy[1].toString(),
            'stroke:lawngreen; stroke-width:2px'
        );
    }
}
