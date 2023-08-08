import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextElementBuilder} from '../../../common/svg/svg-text-element-builder';
import {TemperatureUnit} from '../../../geo-physics/domain/model/quantities/temperature-unit';


export class PrecipTempGridSvg {
    private static readonly GRID_STEP_WIDTH_PROC = 25;


    public static create(minMaxTemp: [number, number], maxPrecipMm: number, tempUnit: TemperatureUnit): SVGGElement {
        const svg = SvgGroupElement.create();

        for (let i = 0; i < 100; i += this.GRID_STEP_WIDTH_PROC) {
            const y = 100 - i;
            svg.appendChild(this.createGridLine(y, true));

            const tempC = i / 100 * (minMaxTemp[1] - minMaxTemp[0]) + minMaxTemp[0];
            const tempLabelText = tempC + ' °C';
            const tempLabel = this.createTempLabel(y, tempLabelText);
            svg.appendChild(tempLabel);

            const precipMm = i / 100 * maxPrecipMm;
            const precipLabelText = precipMm + ' mm/h';
            const precipLabel = this.createPrecipLabel(y, precipLabelText);
            svg.appendChild(precipLabel);
        }

        return svg;
    }


    private static createGridLine(elevationPercent: number, isDashed: boolean): SVGLineElement {
        return SvgLineElement.create(
            '0%',
            '100%',
            elevationPercent.toString() + '%',
            elevationPercent.toString() + '%',
            'stroke:green; stroke-width:1px;',
            'non-scaling-stroke',
            'crispEdges',
            isDashed ? '1, 2' : undefined
        );
    }


    private static createTempLabel(heightProc, text): SVGTextElement {
        return SvgTextElementBuilder.builder()
            .setText(text)
            .setX('5')
            .setY(heightProc.toString() + '%')
            .setStyle('fill:red; stroke:white; stroke-width: 2px; paint-order: stroke;')
            .setTextAnchor('start')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('10px')
            .setFontWeight('normal')
            .setTransform('translate(0, -3)')
            .build();
    }


    private static createPrecipLabel(heightProc, text): SVGTextElement {
        return SvgTextElementBuilder.builder()
            .setText(text)
            .setX('100%')
            .setY(heightProc.toString() + '%')
            .setStyle('fill:blue; stroke:white; stroke-width: 2px; paint-order: stroke;')
            .setTextAnchor('end')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('10px')
            .setFontWeight('normal')
            .setTransform('translate(-5, -3)')
            .build();
    }
}
