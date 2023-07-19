import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextElement} from '../../../common/svg/svg-text-element';
import {ForecastRun} from '../../domain/model/forecast-run';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';


export class WidthGridFcStepsSvg {
    private static readonly GRID_MAJOR_STEP_H = [0];
    private static readonly GRID_MINOR_STEP_H = [3, 6, 9, 12, 15, 18, 21];


    public static create(fcRun: ForecastRun, steps: CloudMeteogramStep[]): SVGGElement {
        const svg = SvgGroupElement.create();
        const offsetPercent = 100 / steps.length / 2;

        for (let i = 0; i < steps.length; i++) {
            const widthPercent = 100 * i / steps.length;
            const stepHour = fcRun.getStepDateTime(steps[i].forecastStep).getHours();
            if (this.GRID_MAJOR_STEP_H.includes(stepHour)) {
                const gridLine = this.createGridLine(widthPercent + offsetPercent, false);
                svg.appendChild(gridLine);
            } else if (this.GRID_MINOR_STEP_H.includes(stepHour)) {
                const gridLine = this.createGridLine(widthPercent + offsetPercent, true);
                svg.appendChild(gridLine);
            }
            /*const label = this.createGridLabel(stepPercent, labelText);
            svg.appendChild(label);*/
        }



        return svg;
    }


    private static createGridLine(widthPercent: number, isDashed: boolean): SVGLineElement {
        return SvgLineElement.create(
            widthPercent.toString() + '%',
            widthPercent.toString() + '%',
            '0%',
            '100%',
            'stroke:green; stroke-width:1px;',
            'non-scaling-stroke',
            'crispEdges',
            isDashed ? '1, 2' : undefined
        );
    }


    private static createGridLabel(elevationPercent, text): SVGTextElement {
        return SvgTextElement.create(
            text,
            '5',
            elevationPercent.toString() + '%',
            'stroke:none; fill:green;',
            'start',
            'Calibri,sans-serif',
            '10px',
            'normal',
            'translate(3, -3)'
        );
    }
}
