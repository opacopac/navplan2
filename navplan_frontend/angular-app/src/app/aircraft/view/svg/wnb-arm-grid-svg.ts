import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextElementBuilder} from '../../../common/svg/svg-text-element-builder';
import {WnbImageDimensionsSvg} from './wnb-image-dimensions-svg';
import {AxisHelperSvg} from '../../../common/svg/axis-helper-svg';
import {Weight} from '../../../geo-physics/domain/model/quantities/weight';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';


export class WnbArmGridSvg {
    public static create(imgDim: WnbImageDimensionsSvg): SVGGElement {
        const svg = SvgGroupElement.create();
        const lengthMarksM = AxisHelperSvg.calculateScaleMarks(imgDim.minWidth.m, imgDim.maxWidth.m, 10);

        lengthMarksM.forEach(markM => {
            const length = new Length(markM, LengthUnit.M);
            const point = imgDim.calcXy(length, Weight.createZero());
            svg.appendChild(this.createGridLine(point[0], true));

            const label = length.m.toString() + ' m'; // TODO
            svg.appendChild(this.createGridLabel(point[0], label));
        });

        return svg;
    }


    private static createGridLine(x: number, isDashed: boolean): SVGLineElement {
        return SvgLineElement.create(
            x.toString(),
            x.toString(),
            '0%',
            '100%',
            'stroke:#455a64; stroke-width:1px;',
            'non-scaling-stroke',
            'crispEdges',
            isDashed ? '1, 2' : undefined
        );
    }


    private static createGridLabel(x: number, text: string): SVGTextElement {
        return SvgTextElementBuilder.builder()
            .setText(text)
            .setX(x.toString())
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
