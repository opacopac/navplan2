import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';


export class PlanPerfRwyLegendRowSvg {
    public static readonly LEGEND_ROW_HEIGHT_PX = 30;
    private static readonly BG_LINE_COLOR = 'lightgray';
    private static readonly BG_LINE_WIDTH_PX = 2;
    private static readonly TEXT_SIZE = '16px';


    public static createLegendEntry(
        text: string,
        startX: number,
        endX: number,
        startY: number,
        textColor: string
    ): SVGGElement {
        const g = SvgGroupElement.create();
        const midX = (startX + endX) / 2;
        const endY = startY + this.LEGEND_ROW_HEIGHT_PX;
        const midY = (startY + endY) / 2;

        // bg line
        g.appendChild(SvgLineBuilder.builder()
            .setX1(startX)
            .setY1(midY)
            .setX2(endX)
            .setY2(midY)
            .setStrokeStyle(this.BG_LINE_COLOR, this.BG_LINE_WIDTH_PX)
            .setStrokeDashArrayOnOff(5, 5)
            .build()
        );

        // start marker
        g.appendChild(SvgLineBuilder.builder()
            .setX1(startX)
            .setY1(startY + 2)
            .setX2(startX)
            .setY2(endY - 2)
            .setStrokeStyle(this.BG_LINE_COLOR, this.BG_LINE_WIDTH_PX)
            .build()
        );

        // end marker
        g.appendChild(SvgLineBuilder.builder()
            .setX1(endX)
            .setY1(startY + 2)
            .setX2(endX)
            .setY2(endY - 2)
            .setStrokeStyle(this.BG_LINE_COLOR, this.BG_LINE_WIDTH_PX)
            .build()
        );

        // text
        g.appendChild(SvgTextBuilder.builder()
            .setText(text)
            .setFontSize(this.TEXT_SIZE)
            .setStyle('fill: ' + textColor + '; stroke:white; stroke-width: 3px; paint-order: stroke;')
            .setTextAnchor('middle')
            .setDominantBaseline('middle')
            .setX(midX)
            .setY(midY)
            .build()
        );

        return g;
    }
}
