import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {ImageDimensionsSvg} from '../../../../common/svg/image-dimensions-svg';
import {SvgGroupElement} from '../../../../common/svg/svg-group-element';
import {PerspectiveCalculator} from './perspective-calculator';
import {AirportRunway} from '../../../../aerodrome/domain/model/airport-runway';
import {SvgLineBuilder} from '../../../../common/svg/svg-line-builder';
import {SvgPolygonBuilder} from '../../../../common/svg/svg-polygon-builder';
import {PlanPerfRwyTextSvg} from './plan-perf-rwy-text-svg';


export class PlanPerfRunwaySvg {
    private static THR_STRIPE_OFFSET = Length.ofM(6);
    private static THR_STRIPE_LENGTH = Length.ofM(30);
    private static THR_STRIPE_WIDTH = Length.ofM(1.8);
    private static DTHR_CARET_OFFSET = Length.ofM(6);
    private static DTHR_CARET_HEIGHT = Length.ofM(9);
    private static DTHR_CARET_WIDTH = Length.ofM(3);
    private static RWY_DESIGNATOR_WIDTH_FACTOR = 1.5;
    private static RWY_DESIGNATOR_HEIGHT_FACTOR = 2;
    private static RWY_DESIGNATOR_OFFSET = Length.ofM(
        PlanPerfRunwaySvg.THR_STRIPE_OFFSET.m + PlanPerfRunwaySvg.THR_STRIPE_LENGTH.m + 12);
    private static RWY_DESIGNATOR_OFFSET_LINE2 = Length.ofM(15 * PlanPerfRunwaySvg.RWY_DESIGNATOR_WIDTH_FACTOR);
    private static RWY_DESIGNATOR_WIDTH = Length.ofM(3 * PlanPerfRunwaySvg.RWY_DESIGNATOR_WIDTH_FACTOR);
    private static RWY_DESIGNATOR_HEIGHT = Length.ofM(9 * PlanPerfRunwaySvg.RWY_DESIGNATOR_HEIGHT_FACTOR);
    private static RWY_DESIGNATOR_CENTER_PADDING = Length.ofM(1 * PlanPerfRunwaySvg.RWY_DESIGNATOR_WIDTH_FACTOR);
    private static RWY_CENTERLINE_OFFSET = Length.ofM(
        PlanPerfRunwaySvg.RWY_DESIGNATOR_OFFSET.m + PlanPerfRunwaySvg.RWY_DESIGNATOR_HEIGHT.m + 12);

    public static create(
        rwy: AirportRunway,
        oppRwy: AirportRunway,
        threshold: Length,
        oppThreshold: Length,
        imgDim: ImageDimensionsSvg
    ): SVGGElement {
        const rwyGroup = SvgGroupElement.create();
        rwyGroup.appendChild(this.createRwySvg(rwy, imgDim));
        rwyGroup.appendChild(this.createRwyDesignator(rwy, oppRwy, threshold, oppThreshold, imgDim));
        rwyGroup.appendChild(this.createDisplacedThreshold(rwy, threshold, oppThreshold, imgDim));

        if (!rwy.isGrass()) {
            rwyGroup.appendChild(this.createCenterLineSvg(rwy, threshold, oppThreshold, imgDim));
            rwyGroup.appendChild(this.createThresholdStripes(rwy, threshold, oppThreshold, imgDim));
        }

        return rwyGroup;
    }


    private static createRwySvg(rwy: AirportRunway, imgDim: ImageDimensionsSvg): SVGGElement {
        const fillColor = rwy.isGrass() ? 'olivedrab' : 'gray';
        const borderColor = rwy.isGrass() ? 'darkolivegreen' : 'dimgray';
        return SvgPolygonBuilder.builder()
            .addPoint(PerspectiveCalculator.calcXy(Length.ofZero(), Length.ofZero(), imgDim))
            .addPoint(PerspectiveCalculator.calcXy(Length.ofZero(), rwy.width, imgDim))
            .addPoint(PerspectiveCalculator.calcXy(rwy.length, rwy.width, imgDim))
            .addPoint(PerspectiveCalculator.calcXy(rwy.length, Length.ofZero(), imgDim))
            .setFillStrokeColorWidth(fillColor, borderColor, 2)
            .build();
    }


    private static createCenterLineSvg(
        rwy: AirportRunway,
        threshold: Length,
        oppThreshold: Length,
        imgDim: ImageDimensionsSvg
    ): SVGGElement {
        const rwyHalfWidth = Length.ofM(rwy.width.m / 2);
        const startX = rwy.isParallel()
            ? threshold.add(this.RWY_CENTERLINE_OFFSET).add(this.RWY_DESIGNATOR_OFFSET_LINE2)
            : threshold.add(this.RWY_CENTERLINE_OFFSET);
        const endX = rwy.isParallel()
            ? oppThreshold.subtract(this.RWY_CENTERLINE_OFFSET).subtract(this.RWY_DESIGNATOR_OFFSET_LINE2)
            : oppThreshold.subtract(this.RWY_CENTERLINE_OFFSET);
        const startXy = PerspectiveCalculator.calcXy(startX, rwyHalfWidth, imgDim);
        const endXy = PerspectiveCalculator.calcXy(endX, rwyHalfWidth, imgDim);
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
        const upperNrY = rwyHalfWidth.add(this.RWY_DESIGNATOR_CENTER_PADDING);
        const lowerNrY = rwyHalfWidth.subtract(this.RWY_DESIGNATOR_CENTER_PADDING)
            .subtract(this.RWY_DESIGNATOR_WIDTH);

        // threshold designator
        const upperLetter = rwy.name.substring(0, 1);
        const lowerLetter = rwy.name.substring(1, 2);
        const designatorX = rwy.isParallel()
            ? threshold.add(this.RWY_DESIGNATOR_OFFSET).add(this.RWY_DESIGNATOR_OFFSET_LINE2)
            : threshold.add(this.RWY_DESIGNATOR_OFFSET);
        g.appendChild(PlanPerfRwyTextSvg.createLetter(upperLetter, ([x, y]) => PerspectiveCalculator.calcXy(
            designatorX.add(this.RWY_DESIGNATOR_HEIGHT.subtract(Length.ofM(this.RWY_DESIGNATOR_HEIGHT_FACTOR * y))),
            upperNrY.add(this.RWY_DESIGNATOR_WIDTH.subtract(Length.ofM(this.RWY_DESIGNATOR_WIDTH_FACTOR * x))),
            imgDim)));
        g.appendChild(PlanPerfRwyTextSvg.createLetter(lowerLetter, ([x, y]) => PerspectiveCalculator.calcXy(
            designatorX.add(this.RWY_DESIGNATOR_HEIGHT.subtract(Length.ofM(this.RWY_DESIGNATOR_HEIGHT_FACTOR * y))),
            lowerNrY.add(this.RWY_DESIGNATOR_WIDTH.subtract(Length.ofM(this.RWY_DESIGNATOR_WIDTH_FACTOR * x))),
            imgDim)));

        // line 2
        if (rwy.isParallel()) {
            const parX = threshold.add(this.RWY_DESIGNATOR_OFFSET);
            const parY = rwyHalfWidth.subtract(this.RWY_DESIGNATOR_WIDTH.divideBy(2));
            const parLetter = rwy.name.substring(2, 3);
            g.appendChild(PlanPerfRwyTextSvg.createLetter(parLetter, ([x, y]) => PerspectiveCalculator.calcXy(
                parX.add(this.RWY_DESIGNATOR_HEIGHT.subtract(Length.ofM(this.RWY_DESIGNATOR_HEIGHT_FACTOR * y))),
                parY.add(this.RWY_DESIGNATOR_WIDTH.subtract(Length.ofM(this.RWY_DESIGNATOR_WIDTH_FACTOR * x))),
                imgDim)));
        }


        // opposite threshold designator
        if (oppRwy) {
            const oppLowerLetter = oppRwy.name.substring(0, 1);
            const oppUpperLetter = oppRwy.name.substring(1, 2);
            const oppDesignatorX = oppRwy.isParallel()
                ? oppThreshold.subtract(this.RWY_DESIGNATOR_OFFSET).subtract(this.RWY_DESIGNATOR_OFFSET_LINE2).subtract(this.RWY_DESIGNATOR_HEIGHT)
                : oppThreshold.subtract(this.RWY_DESIGNATOR_OFFSET).subtract(this.RWY_DESIGNATOR_HEIGHT);
            g.appendChild(PlanPerfRwyTextSvg.createLetter(oppLowerLetter, ([x, y]) => PerspectiveCalculator.calcXy(
                oppDesignatorX.add(Length.ofM(this.RWY_DESIGNATOR_HEIGHT_FACTOR * y)),
                lowerNrY.add(Length.ofM(this.RWY_DESIGNATOR_WIDTH_FACTOR * x)),
                imgDim)));
            g.appendChild(PlanPerfRwyTextSvg.createLetter(oppUpperLetter, ([x, y]) => PerspectiveCalculator.calcXy(
                oppDesignatorX.add(Length.ofM(this.RWY_DESIGNATOR_HEIGHT_FACTOR * y)),
                upperNrY.add(Length.ofM(this.RWY_DESIGNATOR_WIDTH_FACTOR * x)),
                imgDim)));
        }

        // opposite line 2
        if (oppRwy.isParallel()) {
            const oppParX = oppThreshold.subtract(this.RWY_DESIGNATOR_OFFSET).subtract(this.RWY_DESIGNATOR_HEIGHT);
            const oppParY = rwyHalfWidth.subtract(this.RWY_DESIGNATOR_WIDTH.divideBy(2));
            const oppParLetter = oppRwy.name.substring(2, 3);
            g.appendChild(PlanPerfRwyTextSvg.createLetter(oppParLetter, ([x, y]) => PerspectiveCalculator.calcXy(
                oppParX.add(Length.ofM(this.RWY_DESIGNATOR_HEIGHT_FACTOR * y)),
                oppParY.add(Length.ofM(this.RWY_DESIGNATOR_WIDTH_FACTOR * x)),
                imgDim)));
        }

        return g;
    }


    private static createDisplacedThreshold(
        rwy: AirportRunway,
        threshold: Length,
        oppThreshold: Length,
        imgDim: ImageDimensionsSvg
    ): SVGGElement {
        const thresholdGroup = SvgGroupElement.create();
        const rwyQuaterWidth = Length.ofM(rwy.width.m / 4);
        const caretHalfWidth = this.DTHR_CARET_WIDTH.divideBy(2);

        if (threshold.m > 0) {
            // line
            const startXy = PerspectiveCalculator.calcXy(threshold, Length.ofZero(), imgDim);
            const endXy = PerspectiveCalculator.calcXy(threshold, rwy.width, imgDim);
            thresholdGroup.appendChild(SvgLineBuilder.builder()
                .setStartXy(startXy)
                .setEndXy(endXy)
                .setStrokeStyle('white', 2)
                .build());

            // upper caret
            const caretStartX = threshold.subtract(this.DTHR_CARET_OFFSET).subtract(this.DTHR_CARET_HEIGHT);
            const caretEndX = caretStartX.add(this.DTHR_CARET_HEIGHT);
            const caretMidY = rwyQuaterWidth.multiplyBy(3);
            const caretStartXy1 = PerspectiveCalculator.calcXy(caretStartX, caretMidY.add(caretHalfWidth), imgDim);
            const caretStartXy2 = PerspectiveCalculator.calcXy(caretStartX, caretMidY.subtract(caretHalfWidth), imgDim);
            const caretEndXy12 = PerspectiveCalculator.calcXy(caretEndX, caretMidY, imgDim);
            thresholdGroup.appendChild(SvgLineBuilder.builder()
                .setStartXy(caretStartXy1)
                .setEndXy(caretEndXy12)
                .setStrokeStyle('white', 2)
                .build());
            thresholdGroup.appendChild(SvgLineBuilder.builder()
                .setStartXy(caretStartXy2)
                .setEndXy(caretEndXy12)
                .setStrokeStyle('white', 2)
                .build());

            // lower caret
            const caretStartXy3 = PerspectiveCalculator.calcXy(caretStartX, rwyQuaterWidth.subtract(caretHalfWidth), imgDim);
            const caretStartXy4 = PerspectiveCalculator.calcXy(caretStartX, rwyQuaterWidth.add(caretHalfWidth), imgDim);
            const caretEndXy34 = PerspectiveCalculator.calcXy(caretEndX, rwyQuaterWidth, imgDim);
            thresholdGroup.appendChild(SvgLineBuilder.builder()
                .setStartXy(caretStartXy3)
                .setEndXy(caretEndXy34)
                .setStrokeStyle('white', 2)
                .build());
            thresholdGroup.appendChild(SvgLineBuilder.builder()
                .setStartXy(caretStartXy4)
                .setEndXy(caretEndXy34)
                .setStrokeStyle('white', 2)
                .build());
        }

        if (oppThreshold.m < rwy.length.m) {
            // line
            const startXy = PerspectiveCalculator.calcXy(oppThreshold, Length.ofZero(), imgDim);
            const endXy = PerspectiveCalculator.calcXy(oppThreshold, rwy.width, imgDim);
            thresholdGroup.appendChild(SvgLineBuilder.builder()
                .setStartXy(startXy)
                .setEndXy(endXy)
                .setStrokeStyle('white', 2)
                .build());

            // upper caret
            const caretStartX = oppThreshold.add(this.DTHR_CARET_OFFSET);
            const caretEndX = caretStartX.add(this.DTHR_CARET_HEIGHT);
            const caretMidY = rwyQuaterWidth.multiplyBy(3);
            const caretStartXy12 = PerspectiveCalculator.calcXy(caretStartX, caretMidY, imgDim);
            const caretEndXy1 = PerspectiveCalculator.calcXy(caretEndX, caretMidY.add(caretHalfWidth), imgDim);
            const caretEndXy2 = PerspectiveCalculator.calcXy(caretEndX, caretMidY.subtract(caretHalfWidth), imgDim);
            thresholdGroup.appendChild(SvgLineBuilder.builder()
                .setStartXy(caretStartXy12)
                .setEndXy(caretEndXy1)
                .setStrokeStyle('white', 2)
                .build());
            thresholdGroup.appendChild(SvgLineBuilder.builder()
                .setStartXy(caretStartXy12)
                .setEndXy(caretEndXy2)
                .setStrokeStyle('white', 2)
                .build());

            // lower caret
            const caretStartXy34 = PerspectiveCalculator.calcXy(caretStartX, rwyQuaterWidth, imgDim);
            const caretEndXy3 = PerspectiveCalculator.calcXy(caretEndX, rwyQuaterWidth.subtract(caretHalfWidth), imgDim);
            const caretEndXy4 = PerspectiveCalculator.calcXy(caretEndX, rwyQuaterWidth.add(caretHalfWidth), imgDim);
            thresholdGroup.appendChild(SvgLineBuilder.builder()
                .setStartXy(caretStartXy34)
                .setEndXy(caretEndXy3)
                .setStrokeStyle('white', 2)
                .build());
            thresholdGroup.appendChild(SvgLineBuilder.builder()
                .setStartXy(caretStartXy34)
                .setEndXy(caretEndXy4)
                .setStrokeStyle('white', 2)
                .build());
        }

        return thresholdGroup;
    }


    private static createThresholdStripes(
        rwy: AirportRunway,
        threshold: Length,
        oppThreshold: Length,
        imgDim: ImageDimensionsSvg
    ): SVGGElement {
        const rwyHalfWidth = Length.ofM(rwy.width.m / 2);
        const thresholdGroup = SvgGroupElement.create();

        // threshold stripes
        const numStripes = rwy.getThresholdStripeCount();
        if (numStripes > 0) {
            const gapWidth = Length.ofM((rwyHalfWidth.m - this.THR_STRIPE_WIDTH.m * numStripes / 2) / (numStripes / 2 + 1));
            const gapPlusStripeWidth = gapWidth.add(this.THR_STRIPE_WIDTH);

            for (let i = 0; i < numStripes / 2; i++) {
                const startX = threshold.add(this.THR_STRIPE_OFFSET);
                const startY1 = gapPlusStripeWidth.multiplyBy(i).add(gapWidth);
                const startY2 = rwyHalfWidth.add(startY1);
                thresholdGroup.appendChild(this.createThresholdStripe(startX, startY1, imgDim));
                thresholdGroup.appendChild(this.createThresholdStripe(startX, startY2, imgDim));

                // opposite threshold
                const oppStartX = oppThreshold.subtract(this.THR_STRIPE_OFFSET).subtract(this.THR_STRIPE_LENGTH);
                thresholdGroup.appendChild(this.createThresholdStripe(oppStartX, startY1, imgDim));
                thresholdGroup.appendChild(this.createThresholdStripe(oppStartX, startY2, imgDim));
            }
        }

        return thresholdGroup;
    }


    private static createThresholdStripe(startX: Length, startY: Length, imgDim: ImageDimensionsSvg): SVGPolygonElement {
        return SvgPolygonBuilder.builder()
            .addPoint(PerspectiveCalculator.calcXy(startX, startY, imgDim))
            .addPoint(PerspectiveCalculator.calcXy(startX.add(this.THR_STRIPE_LENGTH), startY, imgDim))
            .addPoint(PerspectiveCalculator.calcXy(startX.add(this.THR_STRIPE_LENGTH), startY.add(this.THR_STRIPE_WIDTH), imgDim))
            .addPoint(PerspectiveCalculator.calcXy(startX, startY.add(this.THR_STRIPE_WIDTH), imgDim))
            .setFillStrokeColorWidth('white', 'none', 0)
            .setShapeRenderingCrispEdges()
            .build();
    }
}
