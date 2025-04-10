import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {DatetimeHelper} from '../../../system/domain/service/datetime/datetime-helper';
import {ImageTimeLengthDimensionsSvg} from '../../../common/svg/image-time-length-dimensions-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {AxisHelperSvg} from '../../../common/svg/axis-helper-svg';


export class TrackProfileDateGridSvg {
    public static create(imgDim: ImageTimeLengthDimensionsSvg): SVGGElement {
        const svg = SvgGroupElement.create();
        const dateMarks = AxisHelperSvg.calculateNiceMinuteHourScaleMarks(imgDim.minDate, imgDim.maxDate);

        dateMarks.forEach(mark => {
            const point = imgDim.calcXy(mark, Length.ofZero());
            svg.appendChild(this.createGridLine(point[0], true));

            const label = DatetimeHelper.getHourMinStringFromDate(mark);
            svg.appendChild(this.createGridLabel(point[0], label));
        });

        return svg;
    }


    private static createGridLine(x: number, isDashed: boolean): SVGLineElement {
        return SvgLineBuilder.builder()
            .setX1(x)
            .setX2(x)
            .setY1Percent(0)
            .setY2Percent(100)
            .setStrokeStyle('#455a64', 1)
            .setVectorEffectNonScalingStroke()
            .setShapeRenderingCrispEdges()
            .setStrokeDashArray(isDashed ? '1, 2' : undefined)
            .build();
    }


    private static createGridLabel(x: number, text: string): SVGTextElement {
        return SvgTextBuilder.builder()
            .setText(text)
            .setX(x)
            .setY('100%')
            .setStyle('fill:#455a64; stroke:white; stroke-width: 2px; paint-order: stroke;')
            .setTextAnchor('start')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('12px')
            .setFontWeight('normal')
            .setTransform('translate(5, -5)')
            .build();
    }
}
