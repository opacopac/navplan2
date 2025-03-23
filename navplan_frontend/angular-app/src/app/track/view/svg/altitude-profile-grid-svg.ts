import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';
import {AxisHelperSvg} from '../../../common/svg/axis-helper-svg';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {ImageTimeLengthDimensionsSvg} from '../../../common/svg/image-time-length-dimensions-svg';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';


export class AltitudeProfileGridSvg {
    public static create(imgDim: ImageTimeLengthDimensionsSvg, lengthUnit: LengthUnit): SVGGElement {
        const svg = SvgGroupElement.create();
        const altMarks = AxisHelperSvg.calculateNiceDecimalScaleMarks(
            imgDim.minLength.getValue(lengthUnit),
            imgDim.maxLength.getValue(lengthUnit),
            10
        );

        altMarks.forEach(markAlt => {
            const alt = new Length(markAlt, lengthUnit);
            const point = imgDim.calcXy(imgDim.minDate, alt);
            svg.appendChild(this.createGridLine(point[1], true));

            const label = alt.getValueAndUnit(lengthUnit, 0);
            svg.appendChild(this.createGridLabel(point[1], label));
        });

        return svg;
    }


    private static createGridLine(y: number, isDashed: boolean): SVGLineElement {
        return SvgLineBuilder.builder()
            .setX1Percent(0)
            .setX2Percent(100)
            .setY1(y)
            .setY2(y)
            .setStrokeStyle('#455a64', 1)
            .setVectorEffectNonScalingStroke()
            .setShapeRenderingCrispEdges()
            .setStrokeDashArray(isDashed ? '1, 2' : undefined)
            .build();
    }


    private static createGridLabel(y: number, text: string): SVGTextElement {
        return SvgTextBuilder.builder()
            .setText(text)
            .setX('5')
            .setY(y)
            .setStyle('fill:#455a64; stroke:white; stroke-width: 2px; paint-order: stroke;')
            .setTextAnchor('start')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('12px')
            .setFontWeight('normal')
            .setTransform('translate(0, -5)')
            .build();
    }
}
