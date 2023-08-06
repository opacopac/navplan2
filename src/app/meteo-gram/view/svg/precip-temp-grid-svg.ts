import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextElement} from '../../../common/svg/svg-text-element';


export class PrecipTempGridSvg {
    private static readonly GRID_STEP_WIDTH_PROC = 25;
    private static readonly GRID_MIN_PRECIP_MM = 0;
    private static readonly GRID_MAX_PRECIP_MM = 40;
    private static readonly GRID_MIN_TEMP_C = 0;
    private static readonly GRID_MAX_TEMP_C = 40;


    public static create(): SVGGElement {
        const svg = SvgGroupElement.create();

        for (let i = 0; i < 100; i += this.GRID_STEP_WIDTH_PROC) {
            const y = 100 - i;
            svg.appendChild(this.createGridLine(y, true));

            const tempC = i / 100 * this.GRID_MAX_TEMP_C + this.GRID_MIN_TEMP_C;
            const tempLabelText = tempC + ' °C';
            const tempLabel = this.createTempLabel(y, tempLabelText);
            svg.appendChild(tempLabel);

            const precipMm = i / 100 * this.GRID_MAX_PRECIP_MM + this.GRID_MIN_PRECIP_MM;
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
        return SvgTextElement.create(
            text,
            '5',
            heightProc.toString() + '%',
            'stroke:none; fill:red;',
            'start',
            'Calibri,sans-serif',
            '10px',
            'normal',
            'translate(3, -3)'
        );
    }


    private static createPrecipLabel(heightProc, text): SVGTextElement {
        return SvgTextElement.create(
            text,
            '100%',
            heightProc.toString() + '%',
            'stroke:none; fill:blue;',
            'end',
            'Calibri,sans-serif',
            '10px',
            'normal',
            'translate(-8, -3)'
        );
    }
}
