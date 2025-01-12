import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {PerspectiveCalculator} from './perspective-calculator';
import {PlanPerfLandingCalculationState} from '../../state/state-model/plan-perf-landing-calculation-state';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {PlanPerfRwyFactorsState} from '../../state/state-model/plan-perf-rwy-factors-state';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class PlanPerfLandingPathSvg {
    public static create(
        ldgPerf: PlanPerfLandingCalculationState,
        rwyFactors: PlanPerfRwyFactorsState,
        imgDim: ImageDimensionsSvg
    ): SVGGElement {
        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(this.createLdg50ftSvg(ldgPerf, rwyFactors, imgDim));
        rwyGroup.appendChild(this.createLdgGroundRollSvg(ldgPerf, rwyFactors, imgDim));

        return rwyGroup;
    }


    private static createLdg50ftSvg(
        ldgPerf: PlanPerfLandingCalculationState,
        rwyFactors: PlanPerfRwyFactorsState,
        imgDim: ImageDimensionsSvg
    ): SVGGElement {
        const lineY = ldgPerf.rwy.width.divideBy(2);
        const height50ft = ldgPerf.rwy.width.multiplyBy(2);
        const startX = Length.ofM(ldgPerf.threshold.m + rwyFactors.touchdownAfterThr.m + ldgPerf.ldgGroundRoll.m - ldgPerf.ldgDist50ft.m);
        const startXyGnd = PerspectiveCalculator.calcXy(startX, lineY, imgDim);
        const startXyAir = imgDim.calcXy(startX, height50ft);
        const startXy: [number, number] = [startXyGnd[0], startXyAir[1]];
        const endX = ldgPerf.threshold.add(rwyFactors.touchdownAfterThr);
        const endXy = PerspectiveCalculator.calcXy(endX, lineY, imgDim);

        return SvgLineBuilder.builder()
            .setStartXy(startXy)
            .setEndXy(endXy)
            .setStrokeStyle('deepskyblue', 2)
            .build();
    }


    private static createLdgGroundRollSvg(
        ldgPerf: PlanPerfLandingCalculationState,
        rwyFactors: PlanPerfRwyFactorsState,
        imgDim: ImageDimensionsSvg
    ): SVGGElement {
        const g = SvgGroupElement.create();
        const rwyWidth = ldgPerf.rwy.width;
        const lineY = rwyWidth.divideBy(2);
        const startX = Length.ofM(ldgPerf.threshold.m + rwyFactors.touchdownAfterThr.m);
        const endX = Length.ofM(startX.m + ldgPerf.ldgGroundRoll.m + rwyFactors.touchdownAfterThr.m + ldgPerf.ldgGroundRoll.m);
        const startXy = PerspectiveCalculator.calcXy(startX, lineY, imgDim);
        const endXy = PerspectiveCalculator.calcXy(endX, lineY, imgDim);

        g.appendChild(SvgLineBuilder.builder()
            .setStartXy(startXy)
            .setEndXy(endXy)
            .setStrokeStyle('lawngreen', 2)
            .build());

        // stop line
        const stopLineStartXy = PerspectiveCalculator.calcXy(endX, rwyWidth.divideBy(4), imgDim);
        const stopLineEndXy = PerspectiveCalculator.calcXy(endX, rwyWidth.multiplyBy(3 / 4), imgDim);
        g.appendChild(SvgLineBuilder.builder()
            .setStartXy(stopLineStartXy)
            .setEndXy(stopLineEndXy)
            .setStrokeStyle('lawngreen', 2)
            .build());

        return g;
    }
}
