import {SvgElement} from '../../../common/svg/svg-element';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {PlanPerfTakeoffCalculationState} from '../../state/state-model/plan-perf-takeoff-calculation-state';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {PlanPerfRunwaySvg} from './plan-perf-runway-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {PlanPerfTakeoffPathSvg} from './plan-perf-takeoff-path-svg';
import {PlanPerfLandingCalculationState} from '../../state/state-model/plan-perf-landing-calculation-state';
import {PlanPerfLandingPathSvg} from './plan-perf-landing-path-svg';


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

        const svg = SvgElement.create(
            imageWidthPx.toString(),
            imageHeightPx.toString()
        );

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
