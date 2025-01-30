import {SvgBuilder} from '../../../common/svg/svg-builder';
import {ForecastRun} from '../../domain/model/forecast-run';
import {ImageTimePxDimensionsSvg} from '../../../common/svg/image-time-px-dimensions-svg';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';


export class MeteoDwdTimelineMarkingsSvg {
    public static create(
        fcRun: ForecastRun,
        imageWidthPx: number,
        imageHeightPx: number
    ): SVGSVGElement {
        const fcStepCount = fcRun.model.maxStep - fcRun.model.minStep + 1;
        const imgDim = new ImageTimePxDimensionsSvg(
            fcRun.startTime,
            fcRun.getStepDateTime(fcRun.model.maxStep),
            imageWidthPx,
            imageHeightPx
        );

        const svg = SvgBuilder.builder()
            .setWidth(imageWidthPx.toString())
            .setHeight(imageHeightPx.toString())
            // .setCssClass('map-terrain-svg')
            .build();

        svg.appendChild(this.createMarkings(fcRun, imgDim));

        return svg;
    }


    private static createMarkings(fcRun: ForecastRun, imgDim: ImageTimePxDimensionsSvg): SVGGElement {
        const g = SvgGroupElement.create();

        for (let i = fcRun.model.minStep; i < fcRun.model.maxStep; i++) {
            const stepDateTime = fcRun.getStepDateTime(i);

            if (stepDateTime.getHours() === 0) {
                // day marks
                g.appendChild(SvgLineBuilder.builder()
                    .setStartXy(imgDim.calcXy(stepDateTime, 0))
                    .setEndXy(imgDim.calcXy(stepDateTime, 50))
                    .setStrokeStyle('gray', 1)
                    .build()
                );
                // date label in format 'MM-DD'
                const labelText = stepDateTime.toLocaleDateString();
                g.appendChild(SvgTextBuilder.builder()
                    .setXy(imgDim.calcXy(stepDateTime, 40))
                    .setText(labelText)
                    .setTransform('offset(15, 15)')
                    .build()
                );
            } else if (stepDateTime.getHours() % 3 === 0) {
                // 3-hour marks
                g.appendChild(SvgLineBuilder.builder()
                    .setStartXy(imgDim.calcXy(stepDateTime, 25))
                    .setEndXy(imgDim.calcXy(stepDateTime, 25))
                    .setStrokeStyle('gray', 1)
                    .build()
                );
                // hour label
                g.appendChild(SvgTextBuilder.builder()
                    .setXy(imgDim.calcXy(stepDateTime, 15))
                    .setText(stepDateTime.getHours().toString() + 'h')
                    .setTransform('offset(15, 15)')
                    .build()
                );
            }

            // const labelText = i + ' ft';
            // svg.appendChild(this.createGridLine(elevationPercent, false));
            // const label = this.createGridLabel(elevationPercent, labelText);
            // svg.appendChild(label);
        }

        return g;
    }
}
