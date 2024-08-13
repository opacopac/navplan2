import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextElementBuilder} from '../../../common/svg/svg-text-element-builder';
import {WnbImageDimensionsSvg} from './wnb-image-dimensions-svg';
import {AxisHelperSvg} from '../../../common/svg/axis-helper-svg';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {WeightUnit} from '../../../geo-physics/domain/model/quantities/weight-unit';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class WnbWeightGridSvg {
    public static create(imgDim: WnbImageDimensionsSvg): SVGGElement {
        const svg = SvgGroupElement.create();
        const weightMarksKg = AxisHelperSvg.calculateScaleMarks(imgDim.minHeight.kg, imgDim.maxHeight.kg, 10);

        weightMarksKg.forEach(markKg => {
            const weight = new Weight(markKg, WeightUnit.KG);
            const point = imgDim.calcXy(Length.createZero(), weight);
            svg.appendChild(this.createGridLine(point[1], true));

            const label = weight.kg.toString() + ' kg'; // TODO
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
