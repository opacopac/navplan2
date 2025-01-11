import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';
import {TemperatureUnit} from '../../../geo-physics/domain/model/quantities/temperature-unit';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';


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
        return SvgLineBuilder.builder()
            .setX1Percent(0)
            .setX2Percent(100)
            .setY1Percent(elevationPercent)
            .setY2Percent(elevationPercent)
            .setStrokeStyle('gray', 1)
            .setVectorEffectNonScalingStroke()
            .setShapeRenderingCrispEdges()
            .setStrokeDashArray(isDashed ? '1, 2' : undefined)
            .build();
    }


    private static createTempLabel(heightProc, text): SVGTextElement {
        return SvgTextBuilder.builder()
            .setText(text)
            .setX('5')
            .setY(heightProc.toString() + '%')
            .setStyle('fill:red; stroke:white; stroke-width: 2px; paint-order: stroke;')
            .setTextAnchor('start')
            .setTransform('translate(0, -2)')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('10px')
            .setFontWeight('normal')
            .build();
    }


    private static createPrecipLabel(heightProc, text): SVGTextElement {
        return SvgTextBuilder.builder()
            .setText(text)
            .setX('100%')
            .setY(heightProc.toString() + '%')
            .setStyle('fill:blue; stroke:white; stroke-width: 2px; paint-order: stroke;')
            .setTextAnchor('end')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('10px')
            .setFontWeight('normal')
            .setTransform('translate(-5, -2)')
            .build();
    }
}
