import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {PerspectiveCalculator} from './perspective-calculator';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {PlanPerfTakeoffChartState} from '../../state/state-model/plan-perf-takeoff-chart-state';
import {AirportRunway} from '../../../aerodrome/domain/model/airport-runway';


export class PlanPerfTakeoffPathSvg {
    public static create(chartState: PlanPerfTakeoffChartState, rwy: AirportRunway, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(this.createGroundRollSvg(chartState, rwy, imgDim));
        rwyGroup.appendChild(this.createAbortLineSvg(chartState, rwy, imgDim));
        rwyGroup.appendChild(this.createTkof50ftSvg(chartState, rwy, imgDim));

        return rwyGroup;
    }


    private static createGroundRollSvg(chartState: PlanPerfTakeoffChartState, rwy: AirportRunway, imgDim: ImageDimensionsSvg): SVGGElement {
        const lineY = rwy.width.divideBy(2);

        return SvgLineBuilder.builder()
            .setStartXy(PerspectiveCalculator.calcXy(chartState.tkofGroundRollStart, lineY, imgDim))
            .setEndXy(PerspectiveCalculator.calcXy(chartState.tkofGroundRollEnd, lineY, imgDim))
            .setStrokeStyle('lawngreen', 2)
            .build();
    }


    private static createTkof50ftSvg(chartState: PlanPerfTakeoffChartState, rwy: AirportRunway, imgDim: ImageDimensionsSvg): SVGGElement {
        const lineY = rwy.width.divideBy(2);
        const height50ft = rwy.width.multiplyBy(2);
        const endXyGnd = PerspectiveCalculator.calcXy(chartState.tkofDist50ftEnd, lineY, imgDim);
        const endXyAir = imgDim.calcXy(chartState.tkofDist50ftEnd, height50ft);
        const endXy: [number, number] = [endXyGnd[0], endXyAir[1]];

        return SvgLineBuilder.builder()
            .setStartXy(PerspectiveCalculator.calcXy(chartState.tkofGroundRollEnd, lineY, imgDim))
            .setEndXy(endXy)
            .setStrokeStyle('deepskyblue', 2)
            .build();
    }


    private static createAbortLineSvg(chartState: PlanPerfTakeoffChartState, rwy: AirportRunway, imgDim: ImageDimensionsSvg): SVGGElement {
        const lineY = rwy.width.divideBy(2);

        const rwyGroup = SvgGroupElement.create();

        // abort line
        rwyGroup.appendChild(SvgLineBuilder.builder()
            .setStartXy(PerspectiveCalculator.calcXy(chartState.tkofAbortPoint, lineY, imgDim))
            .setEndXy(PerspectiveCalculator.calcXy(chartState.tkofAbortStop, lineY, imgDim))
            .setStrokeStyle('red', 2)
            .setStrokeDashArrayOnOff(10, 10)
            .build());

        // cross
        const crossHalfWidth = Length.ofM(rwy.width.m / 5 * 2);
        const crossHalfHeight = Length.ofM(rwy.width.m / 5);
        rwyGroup.appendChild(SvgLineBuilder.builder()
            .setStartXy(PerspectiveCalculator.calcXy(chartState.tkofAbortPoint.subtract(crossHalfWidth),
                lineY.subtract(crossHalfHeight), imgDim))
            .setEndXy(PerspectiveCalculator.calcXy(chartState.tkofAbortPoint.add(crossHalfWidth),
                lineY.add(crossHalfHeight), imgDim))
            .setStrokeStyle('red', 2)
            .build());

        rwyGroup.appendChild(SvgLineBuilder.builder()
            .setStartXy(PerspectiveCalculator.calcXy(chartState.tkofAbortPoint.add(crossHalfWidth),
                lineY.subtract(crossHalfHeight), imgDim))
            .setEndXy(PerspectiveCalculator.calcXy(chartState.tkofAbortPoint.subtract(crossHalfWidth),
                lineY.add(crossHalfHeight), imgDim))
            .setStrokeStyle('red', 2)
            .build());

        // stop line
        rwyGroup.appendChild(SvgLineBuilder.builder()
            .setStartXy(PerspectiveCalculator.calcXy(chartState.tkofAbortStop, rwy.width.divideBy(4), imgDim))
            .setEndXy(PerspectiveCalculator.calcXy(chartState.tkofAbortStop, rwy.width.multiplyBy(3 / 4), imgDim))
            .setStrokeStyle('red', 2)
            .build());

        return rwyGroup;
    }
}
