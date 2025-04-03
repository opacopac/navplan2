import {ImageDimensionsSvg} from '../../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../../common/svg/svg-group-element';
import {PerspectiveCalculator} from './perspective-calculator';
import {SvgLineBuilder} from '../../../../common/svg/svg-line-builder';
import {PlanPerfLandingChartState} from '../../state/state-model/plan-perf-landing-chart-state';
import {AirportRunway} from '../../../../aerodrome/domain/model/airport-runway';


export class PlanPerfPathLdgSvg {
    private static LINE_OPACITY = 0.8;


    public static create(
        chartState: PlanPerfLandingChartState,
        rwy: AirportRunway,
        imgDim: ImageDimensionsSvg
    ): SVGGElement {
        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(this.createLdg50ftSvg(chartState, rwy, imgDim));
        rwyGroup.appendChild(this.createLdgGroundRollSvg(chartState, rwy, imgDim));

        return rwyGroup;
    }


    private static createLdg50ftSvg(
        chartState: PlanPerfLandingChartState,
        rwy: AirportRunway,
        imgDim: ImageDimensionsSvg
    ): SVGGElement {
        const lineY = rwy.width.divideBy(2);
        const height50ft = rwy.width.multiplyBy(2);
        const startXyGnd = PerspectiveCalculator.calcXy(chartState.ldgDist50ftStart, lineY, imgDim);
        const startXyAir = imgDim.calcXy(chartState.ldgDist50ftStart, height50ft);
        const startXy: [number, number] = [startXyGnd[0], startXyAir[1]];

        return SvgLineBuilder.builder()
            .setStartXy(startXy)
            .setEndXy(PerspectiveCalculator.calcXy(chartState.ldgGroundRollStart, lineY, imgDim))
            .setStrokeStyle('deepskyblue', 2)
            .setOpacity(this.LINE_OPACITY)
            .build();
    }


    private static createLdgGroundRollSvg(
        chartState: PlanPerfLandingChartState,
        rwy: AirportRunway,
        imgDim: ImageDimensionsSvg
    ): SVGGElement {
        const g = SvgGroupElement.create();
        const rwyWidth = rwy.width;
        const lineY = rwyWidth.divideBy(2);

        g.appendChild(SvgLineBuilder.builder()
            .setStartXy(PerspectiveCalculator.calcXy(chartState.ldgGroundRollStart, lineY, imgDim))
            .setEndXy(PerspectiveCalculator.calcXy(chartState.ldgGroundRollEnd, lineY, imgDim))
            .setStrokeStyle('limegreen', 2)
            .setOpacity(this.LINE_OPACITY)
            .build());

        // stop line
        g.appendChild(SvgLineBuilder.builder()
            .setStartXy(PerspectiveCalculator.calcXy(chartState.ldgGroundRollEnd, rwyWidth.divideBy(4), imgDim))
            .setEndXy(PerspectiveCalculator.calcXy(chartState.ldgGroundRollEnd, rwyWidth.multiplyBy(3 / 4), imgDim))
            .setStrokeStyle('limegreen', 2)
            .setOpacity(this.LINE_OPACITY)
            .build());

        return g;
    }
}
