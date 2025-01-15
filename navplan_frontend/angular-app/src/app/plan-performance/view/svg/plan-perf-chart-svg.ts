import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {PlanPerfTakeoffCalculationState} from '../../state/state-model/plan-perf-takeoff-calculation-state';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {PlanPerfRunwaySvg} from './plan-perf-runway-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {PlanPerfPathTkofSvg} from './plan-perf-path-tkof-svg';
import {PlanPerfLandingCalculationState} from '../../state/state-model/plan-perf-landing-calculation-state';
import {PlanPerfPathLdgSvg} from './plan-perf-path-ldg-svg';
import {SvgBuilder} from '../../../common/svg/svg-builder';
import {PlanPerfRwyLegendTkofSvg} from './plan-perf-rwy-legend-tkof-svg';
import {PlanPerfRwyLegendLdgSvg} from './plan-perf-rwy-legend-ldg-svg';
import {SvgRectangleBuilder} from '../../../common/svg/svg-rectangle-builder';


export class PlanPerfChartSvg {
    private static readonly RWY_TOP_SIDE_STRIP_WIDTH_PX = 10;
    private static readonly RWY_BOTTOM_SIDE_STRIP_WIDTH_PX = 15;

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

        // background
        const rwyWidthPx = imgDim.calcX(rwy.width);
        svg.appendChild(this.createChartBg(rwyWidthPx));
        svg.appendChild(this.createLegendBg());

        // charts & legends
        if (takeoffPerformance) {
            svg.appendChild(PlanPerfRunwaySvg.create(rwy, oppRwy, takeoffPerformance.threshold, takeoffPerformance.oppThreshold, imgDim));
            svg.appendChild(PlanPerfPathTkofSvg.create(takeoffPerformance.tkofChartState, rwy, imgDim));
            svg.appendChild(PlanPerfRwyLegendTkofSvg.create(takeoffPerformance, lengthUnit, imgDim));
        } else if (landingPerformance) {
            svg.appendChild(PlanPerfRunwaySvg.create(rwy, oppRwy, landingPerformance.threshold, landingPerformance.oppThreshold, imgDim));
            svg.appendChild(PlanPerfPathLdgSvg.create(landingPerformance.ldgChartState, rwy, imgDim));
            svg.appendChild(PlanPerfRwyLegendLdgSvg.create(landingPerformance, lengthUnit, imgDim));
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


    private static createChartBg(rwyWidthPx: number): SVGRectElement {
        const sidestripStartY = 300 - rwyWidthPx - this.RWY_TOP_SIDE_STRIP_WIDTH_PX;
        return SvgRectangleBuilder.builder()
            .setX(0)
            .setY(sidestripStartY)
            .setWidthPercent(100)
            .setHeight(rwyWidthPx + this.RWY_TOP_SIDE_STRIP_WIDTH_PX + this.RWY_BOTTOM_SIDE_STRIP_WIDTH_PX)
            .setStyle('fill: yellowgreen;')
            .build();
    }


    private static createLegendBg(): SVGRectElement {
        return SvgRectangleBuilder.builder()
            .setX(0)
            .setY(300 + this.RWY_BOTTOM_SIDE_STRIP_WIDTH_PX)
            .setWidthPercent(100)
            .setHeight(200 - this.RWY_BOTTOM_SIDE_STRIP_WIDTH_PX)
            .setStyle('fill: white')
            .build();
    }
}
