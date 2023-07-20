import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextElement} from '../../../common/svg/svg-text-element';
import {ForecastRun} from '../../domain/model/forecast-run';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';


export class WidthGridFcStepsSvg {
    private static readonly GRID_MAJOR_STEP_H = [0];
    private static readonly GRID_MINOR_STEP_H = [6, 12, 18];


    public static create(fcRun: ForecastRun, steps: CloudMeteogramStep[]): SVGGElement {
        const svg = SvgGroupElement.create();
        const offsetPercent = 100 / steps.length / 2;
        const now = new Date();

        for (let i = 0; i < steps.length; i++) {
            const widthPercent = 100 * i / steps.length;
            const stepTime = fcRun.getStepDateTime(steps[i].forecastStep);

            if (this.GRID_MAJOR_STEP_H.includes(stepTime.getHours())) {
                const gridLine = this.createGridLine(widthPercent + offsetPercent, false);
                svg.appendChild(gridLine);

                const dateTxt = stepTime.toLocaleDateString();
                const label = this.createGridLabel(widthPercent + offsetPercent, dateTxt);
                svg.appendChild(label);
            } else if (this.GRID_MINOR_STEP_H.includes(stepTime.getHours())) {
                const gridLine = this.createGridLine(widthPercent + offsetPercent, true);
                svg.appendChild(gridLine);

                const hourText = stepTime.getHours().toString() + ':00';
                const label = this.createGridLabel(widthPercent + offsetPercent, hourText);
                svg.appendChild(label);
            }

            if (stepTime.getDate() === now.getDate() && stepTime.getHours() === now.getHours()) {
                const minuteOffsetPercent = offsetPercent * 2 * (now.getMinutes() / 60);
                const currentTimeLine = this.createCurrentTimeLine(widthPercent + minuteOffsetPercent);
                svg.appendChild(currentTimeLine);
            }
        }

        return svg;
    }


    private static createCurrentTimeLine(widthPercent: number): SVGLineElement {
        return SvgLineElement.create(
            widthPercent.toString() + '%',
            widthPercent.toString() + '%',
            '0%',
            '100%',
            'stroke:red; stroke-width:1px;',
            'non-scaling-stroke',
            'crispEdges',
            undefined
        );
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


    private static createGridLabel(widthPercent: number, text): SVGTextElement {
        return SvgTextElement.create(
            text,
            widthPercent.toString() + '%',
            '100%',
            'stroke:none; fill:green;',
            'start',
            'Calibri,sans-serif',
            '10px',
            'normal',
            'translate(3, -3)'
        );
    }
}
