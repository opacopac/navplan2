import {SvgElement} from '../../../common/svg/svg-element';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {PlanPerfTakeoffCalculationState} from '../../state/state-model/plan-perf-takeoff-calculation-state';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {PlanPerfRunwaySvg} from './plan-perf-runway-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {PlanPerfTakeoffPathSvg} from './plan-perf-takeoff-path-svg';


export class PlanPerfTakeoffChart {
    public static create(
        takeoffPerformance: PlanPerfTakeoffCalculationState,
        lengthUnit: LengthUnit,
        imageWidthPx: number,
        imageHeightPx: number,
    ): SVGSVGElement {
        const aspectRatio = imageHeightPx / imageWidthPx;
        const imgDim = new ImageDimensionsSvg(
            takeoffPerformance.rwy.length,
            Length.ofM(takeoffPerformance.rwy.length.m * aspectRatio),
            imageWidthPx,
            imageHeightPx,
        );

        const svg = SvgElement.create(
            imageWidthPx.toString(),
            imageHeightPx.toString()
        );

        svg.appendChild(PlanPerfRunwaySvg.create(takeoffPerformance, imgDim));
        svg.appendChild(PlanPerfTakeoffPathSvg.create(takeoffPerformance, imgDim));

        return svg;
    }
}
