import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {PerspectiveCalculator} from './perspective-calculator';
import {PlanPerfLandingCalculationState} from '../../state/state-model/plan-perf-landing-calculation-state';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';


export class PlanPerfLandingPathSvg {
    public static create(ldgPerf: PlanPerfLandingCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(this.createLdg50ftSvg(ldgPerf, imgDim));
        rwyGroup.appendChild(this.createLdgGroundRollSvg(ldgPerf, imgDim));

        return rwyGroup;
    }


    private static createLdg50ftSvg(ldgPerf: PlanPerfLandingCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const quarterWidth = ldgPerf.rwy.width.divideBy(4);
        const height50ft = ldgPerf.rwy.width.multiplyBy(2);
        const startLength = ldgPerf.threshold.subtract(ldgPerf.ldgDist50ft.subtract(ldgPerf.ldgGroundRoll));
        const startXyGnd = PerspectiveCalculator.calcXy(startLength, quarterWidth, imgDim);
        const startXyAir = imgDim.calcXy(startLength, height50ft);
        const startXy: [number, number] = [startXyGnd[0], startXyAir[1]];
        const endXy = PerspectiveCalculator.calcXy(ldgPerf.threshold, quarterWidth, imgDim);

        return SvgLineBuilder.builder()
            .setStartXy(startXy)
            .setEndXy(endXy)
            .setStrokeStyle('deepskyblue', 2)
            .build();
    }


    private static createLdgGroundRollSvg(ldgPerf: PlanPerfLandingCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const quarterWidth = ldgPerf.rwy.width.divideBy(4);
        const startXy = PerspectiveCalculator.calcXy(ldgPerf.threshold, quarterWidth, imgDim);
        const endXy = PerspectiveCalculator.calcXy(ldgPerf.threshold.add(ldgPerf.ldgGroundRoll), quarterWidth, imgDim);

        return SvgLineBuilder.builder()
            .setStartXy(startXy)
            .setEndXy(endXy)
            .setStrokeStyle('lawngreen', 2)
            .build();
    }
}
