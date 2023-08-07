import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextElement} from '../../../common/svg/svg-text-element';
import {ForecastRun} from '../../../meteo-dwd/domain/model/forecast-run';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';


export class WidthGridFcStepsSvg {
    private static readonly GRID_MAJOR_STEP_H = [0];
    private static readonly GRID_MINOR_STEP_H = [6, 12, 18];


    public static create(fcRun: ForecastRun, steps: CloudMeteogramStep[], showLabels: boolean): SVGGElement {
        const svg = SvgGroupElement.create();
        const stepWidthPercent = 100 / steps.length;
        const now = new Date();

        for (let i = 0; i < steps.length; i++) {
            const widthPercent = 100 * i / steps.length;
            const stepTime = fcRun.getStepDateTime(steps[i].forecastStep);

            if (this.GRID_MAJOR_STEP_H.includes(stepTime.getHours())) {
                const gridLine = this.createGridLine(widthPercent, false);
                svg.appendChild(gridLine);

                if (showLabels) {
                    const dateTxt = stepTime.toLocaleDateString();
                    const label = this.createGridLabel(widthPercent, dateTxt);
                    svg.appendChild(label);
                }
            } else if (this.GRID_MINOR_STEP_H.includes(stepTime.getHours())) {
                const gridLine = this.createGridLine(widthPercent, true);
                svg.appendChild(gridLine);

                if (showLabels) {
                    const hourText = stepTime.getHours().toString() + ':00';
                    const label = this.createGridLabel(widthPercent, hourText);
                    svg.appendChild(label);
                }
            }

            if (stepTime.getDate() === now.getDate() && stepTime.getHours() === now.getHours()) {
                const minuteOffsetPercent = stepWidthPercent * (now.getMinutes() / 60);
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
            undefined,
            'Calibri,sans-serif',
            '10px',
            'normal',
            'translate(3, -3)'
        );
    }
}
