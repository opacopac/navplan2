import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {PlanPerfTakeoffCalculationState} from '../../state/state-model/plan-perf-takeoff-calculation-state';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {PlanPerfRunwaySvg} from './plan-perf-runway-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {PlanPerfTakeoffPathSvg} from './plan-perf-takeoff-path-svg';
import {PlanPerfLandingCalculationState} from '../../state/state-model/plan-perf-landing-calculation-state';
import {PlanPerfLandingPathSvg} from './plan-perf-landing-path-svg';
import {SvgBuilder} from '../../../common/svg/svg-builder';
import {PlanPerfTkofRwyLegendSvg} from './plan-perf-tkof-rwy-legend-svg';
import {PlanPerfLdgRwyLegendSvg} from './plan-perf-ldg-rwy-legend-svg';


export class PlanPerfTkofLdgChart {
    public static create(
        takeoffPerformance: PlanPerfTakeoffCalculationState,
        landingPerformance: PlanPerfLandingCalculationState,
        lengthUnit: LengthUnit,
        imageWidthPx: number,
        imageHeightPx: number,
    ): SVGSVGElement {
        const rwy = takeoffPerformance ? takeoffPerformance.rwy : landingPerformance.rwy;
        const oppRwy = takeoffPerformance ? takeoffPerformance.oppRwy : landingPerformance.oppRwy;
        const chartStart = takeoffPerformance
            ? takeoffPerformance.tkofChartState.chartStart
            : landingPerformance.ldgChartState.chartStart;
        const chartEnd = takeoffPerformance
            ? takeoffPerformance.tkofChartState.chartEnd
            : landingPerformance.ldgChartState.chartEnd;
        const imgDim = this.createImgDim(imageWidthPx, imageHeightPx, chartEnd.subtract(chartStart));
        const svg = this.createRootSvg(chartStart, chartEnd, imageWidthPx, imageHeightPx, imgDim);

        if (takeoffPerformance) {
            svg.appendChild(PlanPerfRunwaySvg.create(rwy, oppRwy, takeoffPerformance.threshold, takeoffPerformance.oppThreshold, imgDim));
            svg.appendChild(PlanPerfTakeoffPathSvg.create(takeoffPerformance.tkofChartState, rwy, imgDim));
            svg.appendChild(PlanPerfTkofRwyLegendSvg.create(takeoffPerformance, lengthUnit, imgDim));
        } else if (landingPerformance) {
            svg.appendChild(PlanPerfRunwaySvg.create(rwy, oppRwy, landingPerformance.threshold, landingPerformance.oppThreshold, imgDim));
            svg.appendChild(PlanPerfLandingPathSvg.create(landingPerformance.ldgChartState, rwy, imgDim));
            svg.appendChild(PlanPerfLdgRwyLegendSvg.create(landingPerformance, lengthUnit, imgDim));
        }

        return svg;
    }


    private static createImgDim(imageWidthPx: number, imageHeightPx: number, chartWidth: Length): ImageDimensionsSvg {
        const aspectRatio = imageHeightPx / imageWidthPx;
        return new ImageDimensionsSvg(
            chartWidth,
            Length.ofM(chartWidth.m * aspectRatio),
            imageWidthPx,
            imageHeightPx,
        );
    }


    private static createRootSvg(
        chartStart: Length,
        chartEnd: Length,
        imageWidthPx: number,
        imageHeightPx: number,
        imgDim: ImageDimensionsSvg
    ): SVGSVGElement {
        const x1 = imgDim.calcX(chartStart);
        const x2 = imgDim.calcX(chartEnd);

        return SvgBuilder.builder()
            .setWidth(imageWidthPx.toString())
            .setHeight(imageHeightPx.toString())
            .setViewBox(x1, 200, x2 - x1, imageHeightPx)
            .build();
    }
}
