import {ImageDimensionsSvg} from '../../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../../common/svg/svg-group-element';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {PlanPerfTakeoffCalculationState} from '../../state/state-model/plan-perf-takeoff-calculation-state';
import {PlanPerfRwyLegendRowSvg} from './plan-perf-rwy-legend-row-svg';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';


export class PlanPerfRwyLegendTkofSvg {
    public static create(
        tkofPerf: PlanPerfTakeoffCalculationState,
        distUnit: LengthUnit,
        imgDim: ImageDimensionsSvg
    ): SVGGElement {
        const g = SvgGroupElement.create();
        const startY = imgDim.calcY(Length.ofZero()) + 30;
        const rwy = tkofPerf.rwy;
        const chartState = tkofPerf.tkofChartState;

        // ground roll
        g.appendChild(PlanPerfRwyLegendRowSvg.createLegendEntry(
            'GND Roll: ' + tkofPerf.groundRoll.getValueAndUnit(distUnit, 0),
            imgDim.calcX(chartState.tkofGroundRollStart),
            imgDim.calcX(chartState.tkofGroundRollEnd),
            startY,
            'limegreen'));

        // tkof dist 50ft
        g.appendChild(PlanPerfRwyLegendRowSvg.createLegendEntry(
            'TKOF Distance 50ft: ' + tkofPerf.tkofDist50ft.getValueAndUnit(distUnit, 0),
            imgDim.calcX(chartState.tkofDist50ftStart),
            imgDim.calcX(chartState.tkofDist50ftEnd),
            startY + PlanPerfRwyLegendRowSvg.LEGEND_ROW_HEIGHT_PX,
            'deepskyblue'));

        // tkof abort point
        g.appendChild(PlanPerfRwyLegendRowSvg.createLegendEntry(
            'TKOF Abort Point: ' + tkofPerf.tkofAbortPoint.getValueAndUnit(distUnit, 0),
            imgDim.calcX(chartState.tkofAbortPointStart),
            imgDim.calcX(chartState.tkofAbortPoint),
            startY + 2 * PlanPerfRwyLegendRowSvg.LEGEND_ROW_HEIGHT_PX,
            'red'));
        g.appendChild(PlanPerfRwyLegendRowSvg.createLegendEntry(
            tkofPerf.tkofAbortDist.getValueAndUnit(distUnit, 0),
            imgDim.calcX(chartState.tkofAbortPoint),
            imgDim.calcX(chartState.tkofAbortStop),
            startY + 2 * PlanPerfRwyLegendRowSvg.LEGEND_ROW_HEIGHT_PX,
            'red'));

        // tkof len avbl
        g.appendChild(PlanPerfRwyLegendRowSvg.createLegendEntry(
            'TKOF LEN AVBL: ' + rwy.tora.getValueAndUnit(distUnit, 0),
            imgDim.calcX(chartState.toraStart),
            imgDim.calcX(chartState.toraEnd),
            startY + 3 * PlanPerfRwyLegendRowSvg.LEGEND_ROW_HEIGHT_PX,
            'gray'));

        // rwy length
        g.appendChild(PlanPerfRwyLegendRowSvg.createLegendEntry(
            'RWY LEN: ' + rwy.length.getValueAndUnit(distUnit, 0),
            imgDim.calcX(chartState.rwyStart),
            imgDim.calcX(chartState.rwyEnd),
            startY + 4 * PlanPerfRwyLegendRowSvg.LEGEND_ROW_HEIGHT_PX,
            'gray'));

        return g;
    }
}
