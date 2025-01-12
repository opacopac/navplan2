import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {PlanPerfTakeoffCalculationState} from '../../state/state-model/plan-perf-takeoff-calculation-state';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {PlanPerfRunwaySvg} from './plan-perf-runway-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {PlanPerfTakeoffPathSvg} from './plan-perf-takeoff-path-svg';
import {PlanPerfLandingCalculationState} from '../../state/state-model/plan-perf-landing-calculation-state';
import {PlanPerfLandingPathSvg} from './plan-perf-landing-path-svg';
import {SvgBuilder} from '../../../common/svg/svg-builder';
import {PlanPerfRwyFactorsState} from '../../state/state-model/plan-perf-rwy-factors-state';


export class PlanPerfTkofLdgChart {
    public static create(
        takeoffPerformance: PlanPerfTakeoffCalculationState,
        landingPerformance: PlanPerfLandingCalculationState,
        rwyFactors: PlanPerfRwyFactorsState,
        lengthUnit: LengthUnit,
        imageWidthPx: number,
        imageHeightPx: number,
    ): SVGSVGElement {
        const aspectRatio = imageHeightPx / imageWidthPx;
        const rwy = takeoffPerformance ? takeoffPerformance.rwy : landingPerformance.rwy;
        const oppRwy = takeoffPerformance ? takeoffPerformance.oppRwy : landingPerformance.oppRwy;
        const imgDim = new ImageDimensionsSvg(
            rwy.length,
            Length.ofM(rwy.length.m * aspectRatio),
            imageWidthPx,
            imageHeightPx,
        );
        const x1LenM = landingPerformance
            ? Math.min(0, landingPerformance.threshold.m  + rwyFactors.touchdownAfterThr.m
                - landingPerformance.ldgDist50ft.m + landingPerformance.ldgGroundRoll.m)
            : 0;
        const x2LenM = takeoffPerformance
            ? Math.max(rwy.length.m, takeoffPerformance.tkofDist50ft.m)
            : rwy.length.m;
        const x1 = imgDim.calcX(Length.ofM(x1LenM));
        const x2 = imgDim.calcX(Length.ofM(x2LenM));

        const svg = SvgBuilder.builder()
            .setWidth(imageWidthPx.toString())
            .setHeight(imageHeightPx.toString())
            .setViewBox(x1, 0, x2 - x1, imageHeightPx)
            .build();

        if (takeoffPerformance) {
            svg.appendChild(PlanPerfRunwaySvg.create(rwy, oppRwy, takeoffPerformance.threshold, takeoffPerformance.oppThreshold, imgDim));
            svg.appendChild(PlanPerfTakeoffPathSvg.create(takeoffPerformance, imgDim));
        } else if (landingPerformance) {
            svg.appendChild(PlanPerfRunwaySvg.create(rwy, oppRwy, landingPerformance.threshold, landingPerformance.oppThreshold, imgDim));
            svg.appendChild(PlanPerfLandingPathSvg.create(landingPerformance, rwyFactors, imgDim));
        }

        return svg;
    }
}
