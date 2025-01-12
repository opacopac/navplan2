import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {PerspectiveCalculator} from './perspective-calculator';
import {AirportRunway} from '../../../aerodrome/domain/model/airport-runway';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {SvgPolygonBuilder} from '../../../common/svg/svg-polygon-builder';
import {PlanPerfRwyTextSvg} from './plan-perf-rwy-text-svg';


export class PlanPerfRunwaySvg {
    private static THRESHOLD_STRIPE_OFFSET = Length.ofM(6);
    private static THRESHOLD_STRIPE_LENGTH = Length.ofM(30);
    private static THRESHOLD_STRIPE_WIDTH = Length.ofM(1.8);
    private static THRESHOLD_DESIGNATOR_OFFSET = Length.ofM(6 + 30 + 12);
    private static THRESHOLD_DESIGNATOR_WIDTH = Length.ofM(3);
    private static THRESHOLD_DESIGNATOR_HEIGHT = Length.ofM(9);
    private static THRESHOLD_DESIGNATOR_CENTER_PADDING = Length.ofM(1);
    private static THRESHOLD_CENTERLINE_OFFSET = Length.ofM(6 + 30 + 12 + 9 + 12);

    public static create(rwy: AirportRunway, oppRwy: AirportRunway, threshold: Length, oppThreshold: Length, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(this.createRwySvg(rwy, imgDim));
        rwyGroup.appendChild(this.createCenterLineSvg(rwy, threshold, oppThreshold, imgDim));
        rwyGroup.appendChild(this.createThreshold(rwy, threshold, oppThreshold, imgDim));
        rwyGroup.appendChild(this.createRwyDesignator(rwy, oppRwy, threshold, oppThreshold, imgDim));

        return rwyGroup;
    }


    private static createRwySvg(rwy: AirportRunway, imgDim: ImageDimensionsSvg): SVGGElement {
        return SvgPolygonBuilder.builder()
            .addPoint(PerspectiveCalculator.calcXy(Length.ofZero(), Length.ofZero(), imgDim))
            .addPoint(PerspectiveCalculator.calcXy(Length.ofZero(), rwy.width, imgDim))
            .addPoint(PerspectiveCalculator.calcXy(rwy.length, rwy.width, imgDim))
            .addPoint(PerspectiveCalculator.calcXy(rwy.length, Length.ofZero(), imgDim))
            .setFillStrokeColorWidth('gray', 'black', 2)
            .build();
    }


    private static createCenterLineSvg(rwy: AirportRunway, threshold: Length, oppThreshold: Length, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyHalfWidth = Length.ofM(rwy.width.m / 2);
        const startXy = PerspectiveCalculator.calcXy(
            threshold.add(PlanPerfRunwaySvg.THRESHOLD_CENTERLINE_OFFSET), rwyHalfWidth, imgDim);
        const endXy = PerspectiveCalculator.calcXy(
            oppThreshold.subtract(PlanPerfRunwaySvg.THRESHOLD_CENTERLINE_OFFSET), rwyHalfWidth, imgDim);
        const dashLenOnPx = imgDim.calcXy(Length.ofM(30), Length.ofZero())[0];
        const dashLenOffPx = imgDim.calcXy(Length.ofM(20), Length.ofZero())[0];

        return SvgLineBuilder.builder()
            .setStartXy(startXy)
            .setEndXy(endXy)
            .setStrokeStyle('white', 2)
            .setStrokeDashArrayOnOff(dashLenOnPx, dashLenOffPx)
            .build();
    }


    private static createRwyDesignator(
        rwy: AirportRunway,
        oppRwy: AirportRunway,
        threshold: Length,
        oppThreshold: Length,
        imgDim: ImageDimensionsSvg
    ): SVGElement {
        const g = SvgGroupElement.create();
        const rwyHalfWidth = Length.ofM(rwy.width.m / 2);
        const upperNrY = rwyHalfWidth.add(PlanPerfRunwaySvg.THRESHOLD_DESIGNATOR_CENTER_PADDING);
        const lowerNrY = rwyHalfWidth.subtract(PlanPerfRunwaySvg.THRESHOLD_DESIGNATOR_CENTER_PADDING)
            .subtract(PlanPerfRunwaySvg.THRESHOLD_DESIGNATOR_WIDTH);

        // threshold designator
        const upperLetter = rwy.name.substring(0, 1);
        const lowerLetter = rwy.name.substring(1, 2);
        const designatorX = threshold.add(PlanPerfRunwaySvg.THRESHOLD_DESIGNATOR_OFFSET);
        g.appendChild(PlanPerfRwyTextSvg.createLetter(upperLetter, ([x, y]) => PerspectiveCalculator.calcXy(
            designatorX.add(Length.ofM(9 - y)),
            upperNrY.add(Length.ofM(3 - x)),
            imgDim)));
        g.appendChild(PlanPerfRwyTextSvg.createLetter(lowerLetter, ([x, y]) => PerspectiveCalculator.calcXy(
            designatorX.add(Length.ofM(9 - y)),
            lowerNrY.add(Length.ofM(3 - x)),
            imgDim)));

        // opposite threshold designator
        if (oppRwy) {
            const oppLowerLetter = oppRwy.name.substring(0, 1);
            const oppUpperLetter = oppRwy.name.substring(1, 2);
            const oppDesignatorX = oppThreshold
                .subtract(PlanPerfRunwaySvg.THRESHOLD_DESIGNATOR_OFFSET)
                .subtract(PlanPerfRunwaySvg.THRESHOLD_DESIGNATOR_HEIGHT);
            g.appendChild(PlanPerfRwyTextSvg.createLetter(oppLowerLetter, ([x, y]) => PerspectiveCalculator.calcXy(
                oppDesignatorX.add(Length.ofM(y)),
                lowerNrY.add(Length.ofM(x)),
                imgDim)));
            g.appendChild(PlanPerfRwyTextSvg.createLetter(oppUpperLetter, ([x, y]) => PerspectiveCalculator.calcXy(
                oppDesignatorX.add(Length.ofM(y)),
                upperNrY.add(Length.ofM(x)),
                imgDim)));
        }

        return g;
    }


    private static createThreshold(rwy: AirportRunway, threshold: Length, oppThreshold: Length, imgDim: ImageDimensionsSvg): SVGGElement {
        const rwyHalfWidth = Length.ofM(rwy.width.m / 2);
        const thresholdGroup = SvgGroupElement.create();

        // threshold baseline
        if (threshold.m > 0) {
            const startXy = PerspectiveCalculator.calcXy(threshold, Length.ofZero(), imgDim);
            const endXy = PerspectiveCalculator.calcXy(threshold, rwy.width, imgDim);
            thresholdGroup.appendChild(SvgLineBuilder.builder()
                .setStartXy(startXy)
                .setEndXy(endXy)
                .setStrokeStyle('white', 2)
                .build());
        }

        // opposite threshold baseline
        if (oppThreshold.m < rwy.length.m) {
            const startXy = PerspectiveCalculator.calcXy(oppThreshold, Length.ofZero(), imgDim);
            const endXy = PerspectiveCalculator.calcXy(oppThreshold, rwy.width, imgDim);
            thresholdGroup.appendChild(SvgLineBuilder.builder()
                .setStartXy(startXy)
                .setEndXy(endXy)
                .setStrokeStyle('white', 2)
                .build());
        }

        // threshold stripes
        const numStripes = rwy.getThresholdStripeCount();
        if (numStripes > 0) {
            const gapWidth = Length.ofM((rwyHalfWidth.m - this.THRESHOLD_STRIPE_WIDTH.m * numStripes / 2) / (numStripes / 2 + 1));
            const gapPlusStripeWidth = gapWidth.add(this.THRESHOLD_STRIPE_WIDTH);

            for (let i = 0; i < numStripes / 2; i++) {
                const startX = threshold.add(this.THRESHOLD_STRIPE_OFFSET);
                const startY1 = gapPlusStripeWidth.multiplyBy(i).add(gapWidth);
                const startY2 = rwyHalfWidth.add(startY1);
                thresholdGroup.appendChild(this.createThresholdStripe(startX, startY1, imgDim));
                thresholdGroup.appendChild(this.createThresholdStripe(startX, startY2, imgDim));

                // opposite threshold
                const oppStartX = oppThreshold.subtract(this.THRESHOLD_STRIPE_OFFSET).subtract(this.THRESHOLD_STRIPE_LENGTH);
                thresholdGroup.appendChild(this.createThresholdStripe(oppStartX, startY1, imgDim));
                thresholdGroup.appendChild(this.createThresholdStripe(oppStartX, startY2, imgDim));
            }
        }

        return thresholdGroup;
    }


    private static createThresholdStripe(startX: Length, startY: Length, imgDim: ImageDimensionsSvg): SVGPolygonElement {
        return SvgPolygonBuilder.builder()
            .addPoint(PerspectiveCalculator.calcXy(startX, startY, imgDim))
            .addPoint(PerspectiveCalculator.calcXy(startX.add(this.THRESHOLD_STRIPE_LENGTH), startY, imgDim))
            .addPoint(PerspectiveCalculator.calcXy(startX.add(this.THRESHOLD_STRIPE_LENGTH), startY.add(this.THRESHOLD_STRIPE_WIDTH), imgDim))
            .addPoint(PerspectiveCalculator.calcXy(startX, startY.add(this.THRESHOLD_STRIPE_WIDTH), imgDim))
            .setFillStrokeColorWidth('white', 'none', 0)
            .setShapeRenderingCrispEdges()
            .build();
    }
}
