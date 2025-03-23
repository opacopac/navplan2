import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';
import {WnbImageDimensionsSvg} from './wnb-image-dimensions-svg';
import {AxisHelperSvg} from '../../../common/svg/axis-helper-svg';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {WeightUnit} from '../../../geo-physics/domain/model/quantities/weight-unit';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';


export class WnbWeightGridSvg {
    public static create(imgDim: WnbImageDimensionsSvg, weightUnit: WeightUnit): SVGGElement {
        const svg = SvgGroupElement.create();
        const weightMarks = AxisHelperSvg.calculateNiceDecimalScaleMarks(
            imgDim.minHeight.getValue(weightUnit),
            imgDim.maxHeight.getValue(weightUnit),
            10
        );

        weightMarks.forEach(markKg => {
            const weight = new Weight(markKg, weightUnit);
            const point = imgDim.calcXy(Length.ofZero(), weight);
            svg.appendChild(this.createGridLine(point[1], true));

            const label = weight.getValueAndUnit(weightUnit, 0);
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
