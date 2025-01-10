import {SvgPolygonElement} from '../../../common/svg/svg-polygon-element';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {PlanPerfTakeoffCalculationState} from '../../state/state-model/plan-perf-takeoff-calculation-state';


export class PlanPerfRunwaySvg {
    public static create(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(this.createRwySvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createRwyBeginThresholdSvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createRwyEndThresholdSvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createCenterLineSvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createGroundRollSvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createTkof50ftSvg(tkofPerf, imgDim));
        rwyGroup.appendChild(this.createAbortLineSvg(tkofPerf, imgDim));

        return rwyGroup;
    }


    private static createRwySvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const points: [number, number][] = [];

        // rwy rectangle
        points.push(this.calcPerspectiveXy(Length.ofZero(), Length.ofZero(), imgDim));
        points.push(this.calcPerspectiveXy(Length.ofZero(), tkofPerf.rwyWidth, imgDim));
        points.push(this.calcPerspectiveXy(tkofPerf.rwyLength, tkofPerf.rwyWidth, imgDim));
        points.push(this.calcPerspectiveXy(tkofPerf.rwyLength, Length.ofZero(), imgDim));

        return SvgPolygonElement.create(
            points,
            'fill:gray; stroke:black; stroke-width:2px'
        );
    }


    private static createRwyBeginThresholdSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const thresholdBegin = Length.ofM(tkofPerf.rwyLength.m - tkofPerf.ldgLenAvbl.m);
        const startXy = this.calcPerspectiveXy(thresholdBegin, Length.ofZero(), imgDim);
        const endXy = this.calcPerspectiveXy(thresholdBegin, tkofPerf.rwyWidth, imgDim);

        return SvgLineElement.create(
            startXy[0].toString(),
            endXy[0].toString(),
            startXy[1].toString(),
            endXy[1].toString(),
            'stroke:white; stroke-width:2px',
            '',
            '',
            ''
        );
    }


    private static createRwyEndThresholdSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const thresholdEnd = Length.ofM(tkofPerf.tkofLenAvbl.m);
        const startXy = this.calcPerspectiveXy(thresholdEnd, Length.ofZero(), imgDim);
        const endXy = this.calcPerspectiveXy(thresholdEnd, tkofPerf.rwyWidth, imgDim);

        return SvgLineElement.create(
            startXy[0].toString(),
            endXy[0].toString(),
            startXy[1].toString(),
            endXy[1].toString(),
            'stroke:white; stroke-width:2px',
            '',
            '',
            ''
        );
    }


    private static createCenterLineSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const halfWidth = Length.ofM(tkofPerf.rwyWidth.m / 2);
        const thresholdNumberLen = Length.ofM(6 + 30 + 12 + 9 + 12);
        const thresholdBegin = Length.ofM(tkofPerf.rwyLength.m - tkofPerf.ldgLenAvbl.m);
        const thresholdEnd = Length.ofM(tkofPerf.tkofLenAvbl.m);
        const startXy = this.calcPerspectiveXy(thresholdBegin.add(thresholdNumberLen), halfWidth, imgDim);
        const endXy = this.calcPerspectiveXy(thresholdEnd.subtract(thresholdNumberLen), halfWidth, imgDim);
        const dashLenOnPx = imgDim.calcXy(Length.ofM(30), Length.ofZero())[0];
        const dashLenOffPx = imgDim.calcXy(Length.ofM(20), Length.ofZero())[0];

        return SvgLineElement.create(
            startXy[0].toString(),
            endXy[0].toString(),
            startXy[1].toString(),
            endXy[1].toString(),
            'stroke:white; stroke-width:2px',
            '',
            '',
            dashLenOnPx.toString() + ',' + dashLenOffPx.toString()
        );
    }


    private static createGroundRollSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const quaterWidth = Length.ofM(tkofPerf.rwyWidth.m / 4);
        const startXy = this.calcPerspectiveXy(Length.ofZero(), quaterWidth, imgDim);
        const endXy = this.calcPerspectiveXy(tkofPerf.groundRoll, quaterWidth, imgDim);

        return SvgLineElement.create(
            startXy[0].toString(),
            endXy[0].toString(),
            startXy[1].toString(),
            endXy[1].toString(),
            'stroke:lawngreen; stroke-width:2px'
        );
    }


    private static createTkof50ftSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const quaterWidth = Length.ofM(tkofPerf.rwyWidth.m / 4);
        const height50ft = Length.ofM(tkofPerf.rwyWidth.m * 2);
        const startXy = this.calcPerspectiveXy(tkofPerf.groundRoll, quaterWidth, imgDim);
        const endXyGnd = this.calcPerspectiveXy(tkofPerf.tkofDist50ft, quaterWidth, imgDim);
        const endXyAir = imgDim.calcXy(tkofPerf.tkofDist50ft, height50ft);

        return SvgLineElement.create(
            startXy[0].toString(),
            endXyGnd[0].toString(),
            startXy[1].toString(),
            endXyAir[1].toString(),
            'stroke:deepskyblue; stroke-width:2px'
        );
    }


    private static createAbortLineSvg(tkofPerf: PlanPerfTakeoffCalculationState, imgDim: ImageDimensionsSvg): SVGGElement {
        const quaterWidth = Length.ofM(tkofPerf.rwyWidth.m / 4);
        const abortPoint = Length.ofM(Math.min(tkofPerf.tkofLenAvbl.m, tkofPerf.rwyLength.m - tkofPerf.tkofAbortDist.m));
        const startXy = this.calcPerspectiveXy(abortPoint, quaterWidth, imgDim);
        const endXy = this.calcPerspectiveXy(abortPoint.add(tkofPerf.tkofAbortDist), quaterWidth, imgDim);

        return SvgLineElement.create(
            startXy[0].toString(),
            endXy[0].toString(),
            startXy[1].toString(),
            endXy[1].toString(),
            'stroke:red; stroke-width:2px',
            '',
            '',
            '10,10'
        );
    }


    private static calcPerspectiveXy(width: Length, height: Length, imgDim: ImageDimensionsSvg): [number, number] {
        const xy = imgDim.calcXy(width, height);
        const y = xy[1];
        const x = (xy[0] - imgDim.imageWidthPx / 2) * (1 - (imgDim.imageHeightPx - y) / imgDim.imageWidthPx * 2) + imgDim.imageWidthPx / 2;

        return [x, y];
    }
}
