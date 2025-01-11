import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';
import {ForecastRun} from '../../../meteo-dwd/domain/model/forecast-run';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';


export class WidthGridFcStepsSvg {
    private static readonly GRID_MAJOR_STEP_H = [0];
    private static readonly GRID_MINOR_STEP_H = [6, 12, 18];


    public static create(fcRun: ForecastRun, steps: CloudMeteogramStep[], showLabels: boolean): SVGGElement {
        const svg = SvgGroupElement.create();
        const stepWidthPercent = 100 / steps.length;
        const now = new Date();

        for (let i = 0; i < steps.length; i++) {
            const xPercent = 100 * i / steps.length + stepWidthPercent / 2;
            const stepTime = fcRun.getStepDateTime(steps[i].forecastStep);

            if (this.GRID_MAJOR_STEP_H.includes(stepTime.getHours())) {
                const gridLine = this.createGridLine(xPercent, false);
                svg.appendChild(gridLine);

                if (showLabels) {
                    const dateTxt = stepTime.toLocaleDateString();
                    const label = this.createGridLabel(xPercent, dateTxt);
                    svg.appendChild(label);
                }
            } else if (this.GRID_MINOR_STEP_H.includes(stepTime.getHours())) {
                const gridLine = this.createGridLine(xPercent, true);
                svg.appendChild(gridLine);

                if (showLabels) {
                    const hourText = stepTime.getHours().toString() + ':00';
                    const label = this.createGridLabel(xPercent, hourText);
                    svg.appendChild(label);
                }
            }

            if (stepTime.getDate() === now.getDate() && stepTime.getHours() === now.getHours()) {
                const minuteOffsetPercent = stepWidthPercent * (now.getMinutes() / 60);
                const currentTimeLine = this.createCurrentTimeLine(xPercent + minuteOffsetPercent);
                svg.appendChild(currentTimeLine);
            }
        }

        return svg;
    }


    private static createCurrentTimeLine(widthPercent: number): SVGLineElement {
        return SvgLineBuilder.builder()
            .setX1Percent(widthPercent)
            .setX2Percent(widthPercent)
            .setY1Percent(0)
            .setY2Percent(100)
            .setStrokeStyle('blue', 1)
            .setVectorEffectNonScalingStroke()
            .setShapeRenderingCrispEdges()
            .build();
    }


    private static createGridLine(widthPercent: number, isDashed: boolean): SVGLineElement {
        return SvgLineBuilder.builder()
            .setX1Percent(widthPercent)
            .setX2Percent(widthPercent)
            .setY1Percent(0)
            .setY2Percent(100)
            .setStrokeStyle('green', 1)
            .setVectorEffectNonScalingStroke()
            .setShapeRenderingCrispEdges()
            .setStrokeDashArray(isDashed ? '1, 2' : undefined)
            .build();
    }


    private static createGridLabel(widthPercent: number, text): SVGTextElement {
        return SvgTextBuilder.builder()
            .setText(text)
            .setX(widthPercent.toString() + '%')
            .setY('100%')
            .setStyle('fill:green; stroke:white; stroke-width: 2px; paint-order: stroke;')
            .setTextAnchor('start')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('10px')
            .setFontWeight('normal')
            .setTransform('translate(3, -3)')
            .build();
    }
}
