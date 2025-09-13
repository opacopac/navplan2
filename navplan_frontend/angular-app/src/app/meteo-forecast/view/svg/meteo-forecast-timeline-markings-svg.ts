import {SvgBuilder} from '../../../common/svg/svg-builder';
import {ForecastRun} from '../../domain/model/forecast-run';
import {ImageTimePxDimensionsSvg} from '../../../common/svg/image-time-px-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';


export class MeteoForecastTimelineMarkingsSvg {
    public static create(
        fcRun: ForecastRun,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const imgDim = new ImageTimePxDimensionsSvg(
            fcRun.getStepDateTime(fcRun.model.minStep),
            fcRun.getStepDateTime(fcRun.model.maxStep),
            imageWidthPx,
            imageHeightPx
        );

        const svg = SvgBuilder.builder()
            .setWidth(imageWidthPx.toString())
            .setHeight(imageHeightPx.toString())
            .build();

        svg.appendChild(this.createMarkings(fcRun, imgDim));

        return svg;
    }


    private static createMarkings(fcRun: ForecastRun, imgDim: ImageTimePxDimensionsSvg): SVGGElement {
        const g = SvgGroupElement.create();

        for (let step = fcRun.model.minStep; step < fcRun.model.maxStep; step++) {
            const stepDateTime = fcRun.getStepDateTime(step);

            if (stepDateTime.getHours() === 0) {
                // day marks
                g.appendChild(SvgLineBuilder.builder()
                    .setStartXy(imgDim.calcXy(stepDateTime, 0))
                    .setEndXy(imgDim.calcXy(stepDateTime, 50))
                    .setStrokeStyle('gray', 1)
                    .build()
                );
                // date label
                const labelText = stepDateTime.toLocaleDateString();
                g.appendChild(SvgTextBuilder.builder()
                    .setXy(imgDim.calcXy(stepDateTime, 40))
                    .setText(labelText)
                    .setStyle('fill:gray')
                    .setFontSize('10')
                    .setTransform('translate(5, 0)')
                    .build()
                );
            } else if (stepDateTime.getHours() % 3 === 0) {
                // 3-hour marks
                g.appendChild(SvgLineBuilder.builder()
                    .setStartXy(imgDim.calcXy(stepDateTime, 0))
                    .setEndXy(imgDim.calcXy(stepDateTime, 25))
                    .setStrokeStyle('gray', 1)
                    .build()
                );
                // hour label
                const labelText = stepDateTime.getHours().toString() + 'h';
                g.appendChild(SvgTextBuilder.builder()
                    .setXy(imgDim.calcXy(stepDateTime, 15))
                    .setText(labelText)
                    .setStyle('fill:gray')
                    .setFontSize('10')
                    .setTransform('translate(5, 0)')
                    .build()
                );
            }
        }

        return g;
    }
}
