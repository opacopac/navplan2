import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextElementBuilder} from '../../../common/svg/svg-text-element-builder';
import {WnbImageDimensionsSvg} from './wnb-image-dimensions-svg';
import {AxisHelperSvg} from '../../../common/svg/axis-helper-svg';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {WeightUnit} from '../../../geo-physics/domain/model/quantities/weight-unit';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class WnbWeightGridSvg {
    public static create(imgDim: WnbImageDimensionsSvg, weightUnit: WeightUnit): SVGGElement {
        const svg = SvgGroupElement.create();
        const weightMarks = AxisHelperSvg.calculateScaleMarks(
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
        return SvgLineElement.create(
            '0%',
            '100%',
            y.toString(),
            y.toString(),
            'stroke:#455a64; stroke-width:1px;',
            'non-scaling-stroke',
            'crispEdges',
            isDashed ? '1, 2' : undefined
        );
    }


    private static createGridLabel(y: number, text: string): SVGTextElement {
        return SvgTextElementBuilder.builder()
            .setText(text)
            .setX('5')
            .setY(y.toString())
            .setStyle('fill:#455a64; stroke:white; stroke-width: 2px; paint-order: stroke;')
            .setTextAnchor('start')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('12px')
            .setFontWeight('normal')
            .setTransform('translate(0, -5)')
            .build();
    }
}
