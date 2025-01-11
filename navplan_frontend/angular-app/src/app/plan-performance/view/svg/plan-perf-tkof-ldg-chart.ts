import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {PlanPerfTakeoffCalculationState} from '../../state/state-model/plan-perf-takeoff-calculation-state';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {PlanPerfRunwaySvg} from './plan-perf-runway-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {PlanPerfTakeoffPathSvg} from './plan-perf-takeoff-path-svg';
import {PlanPerfLandingCalculationState} from '../../state/state-model/plan-perf-landing-calculation-state';
import {PlanPerfLandingPathSvg} from './plan-perf-landing-path-svg';
import {SvgBuilder} from '../../../common/svg/svg-builder';


export class PlanPerfTkofLdgChart {
    public static create(
        takeoffPerformance: PlanPerfTakeoffCalculationState,
        landingPerformance: PlanPerfLandingCalculationState,
        lengthUnit: LengthUnit,
        imageWidthPx: number,
        imageHeightPx: number,
    ): SVGSVGElement {
        const aspectRatio = imageHeightPx / imageWidthPx;
        const rwy = takeoffPerformance ? takeoffPerformance.rwy : landingPerformance.rwy;
        const imgDim = new ImageDimensionsSvg(
            rwy.length,
            Length.ofM(rwy.length.m * aspectRatio),
            imageWidthPx,
            imageHeightPx,
        );
        const minXLen = landingPerformance
            ? Length.ofM(Math.min(0, landingPerformance.threshold.m - (landingPerformance.ldgDist50ft.m - landingPerformance.ldgGroundRoll.m)))
            : Length.ofZero();
        const maxXLen = takeoffPerformance
            ? Length.ofM(Math.max(rwy.length.m, takeoffPerformance.tkofDist50ft.m))
            : rwy.length;
        const minX = imgDim.calcX(minXLen);
        const maxX = imgDim.calcX(maxXLen);

        const svg = SvgBuilder.builder()
            .setWidth(imageWidthPx.toString())
            .setHeight(imageHeightPx.toString())
            .setViewBox(minX, 0, maxX - minX, imageHeightPx)
            .build();

        if (takeoffPerformance) {
            svg.appendChild(PlanPerfRunwaySvg.create(rwy, takeoffPerformance.threshold, takeoffPerformance.oppThreshold, imgDim));
            svg.appendChild(PlanPerfTakeoffPathSvg.create(takeoffPerformance, imgDim));
        } else {
            svg.appendChild(PlanPerfRunwaySvg.create(rwy, landingPerformance.threshold, landingPerformance.oppThreshold, imgDim));
            svg.appendChild(PlanPerfLandingPathSvg.create(landingPerformance, imgDim));
        }

        return svg;
    }
}
