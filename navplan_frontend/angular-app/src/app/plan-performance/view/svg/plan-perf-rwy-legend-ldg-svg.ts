import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {PlanPerfRwyLegendRowSvg} from './plan-perf-rwy-legend-row-svg';
import {PlanPerfLandingCalculationState} from '../../state/state-model/plan-perf-landing-calculation-state';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';


export class PlanPerfRwyLegendLdgSvg {
    public static create(
        ldgPerf: PlanPerfLandingCalculationState,
        distUnit: LengthUnit,
        imgDim: ImageDimensionsSvg
    ): SVGGElement {
        const g = SvgGroupElement.create();
        const startY = imgDim.calcY(Length.ofZero()) + 30;
        const rwy = ldgPerf.rwy;
        const chartState = ldgPerf.ldgChartState;

        // touch down point
        g.appendChild(PlanPerfRwyLegendRowSvg.createLegendEntry(
            ldgPerf.touchdownAfterThr.getValueAndUnit(distUnit, 0),
            imgDim.calcX(chartState.touchdownOffsetStart),
            imgDim.calcX(chartState.touchdownOffsetEnd),
            startY,
            'gray'));

        // ldg ground roll
        g.appendChild(PlanPerfRwyLegendRowSvg.createLegendEntry(
            'GND Roll: ' + ldgPerf.ldgGroundRoll.getValueAndUnit(distUnit, 0),
            imgDim.calcX(chartState.ldgGroundRollStart),
            imgDim.calcX(chartState.ldgGroundRollEnd),
            startY,
            'limegreen'));

        // ldg dist from 50ft
        g.appendChild(PlanPerfRwyLegendRowSvg.createLegendEntry(
            'LDG Distance 50ft: ' + ldgPerf.ldgDist50ft.getValueAndUnit(distUnit, 0),
            imgDim.calcX(chartState.ldgDist50ftStart),
            imgDim.calcX(chartState.ldgDist50ftEnd),
            startY + PlanPerfRwyLegendRowSvg.LEGEND_ROW_HEIGHT_PX,
            'deepskyblue'));

        // ldg len avbl
        g.appendChild(PlanPerfRwyLegendRowSvg.createLegendEntry(
            'LDG LEN AVBL: ' + rwy.lda.getValueAndUnit(distUnit, 0),
            imgDim.calcX(chartState.ldaStart),
            imgDim.calcX(chartState.ldaEnd),
            startY + 2 * PlanPerfRwyLegendRowSvg.LEGEND_ROW_HEIGHT_PX,
            'gray'));

        // rwy length
        g.appendChild(PlanPerfRwyLegendRowSvg.createLegendEntry(
            'RWY LEN: ' + rwy.length.getValueAndUnit(distUnit, 0),
            imgDim.calcX(chartState.rwyStart),
            imgDim.calcX(chartState.rwyEnd),
            startY + 3 * PlanPerfRwyLegendRowSvg.LEGEND_ROW_HEIGHT_PX,
            'gray'));

        return g;
    }
}
