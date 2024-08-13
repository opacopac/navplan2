import {WnbEnvelopeCoordinate} from '../../domain/model/wnb-envelope-coordinate';
import {WnbImageDimensionsSvg} from './wnb-image-dimensions-svg';
import {SvgCircleElementBuilder} from '../../../common/svg/svg-circle-element-builder';
import {SvgTextElementBuilder} from '../../../common/svg/svg-text-element-builder';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';


export class WnbEnvelopeDotSvg {
    public static create(
        dotCoordinate: WnbEnvelopeCoordinate,
        imgDim: WnbImageDimensionsSvg,
        label: string,
        isFilled: boolean
    ): SVGGElement {
        const svg = SvgGroupElement.create();
        const dotPoint = imgDim.calcXy(dotCoordinate.armCg, dotCoordinate.weight);
        const circleStyle = isFilled
            ? 'fill:#78909c; stroke:#455a64; stroke-width:2px'
            : 'fill:none; stroke:#455a64; stroke-width:2px';

        svg.appendChild(this.createCircle(dotPoint, circleStyle));
        svg.appendChild(this.createLabel(dotPoint, label));

        return svg;
    }


    private static createCircle(dotPoint: [number, number], style: string): SVGCircleElement {
        return SvgCircleElementBuilder.builder()
            .setCx(dotPoint[0].toString())
            .setCy(dotPoint[1].toString())
            .setR('5')
            .setStyle(style)
            .build();
    }


    private static createLabel(dotPoint: [number, number], text: string): SVGTextElement {
        return SvgTextElementBuilder.builder()
            .setText(text)
            .setX(dotPoint[0].toString())
            .setY(dotPoint[1].toString())
            .setStyle('fill:#455a64; stroke:white; stroke-width: 2px; paint-order: stroke;')
            .setTextAnchor('middle')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('14px')
            .setFontWeight('normal')
            .setTransform('translate(0, -12)')
            .build();
    }
}
