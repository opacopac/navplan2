import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';
import {SvgRectangleElement} from '../../../common/svg/svg-rectangle-element';


export class PrecipBarsSvg {
    public static create(steps: CloudMeteogramStep[]): SVGElement {
        const svg = SvgGroupElement.create();
        const stepWidthProc = 100 / steps.length;
        const barWidthProc = stepWidthProc / 1.5;
        const barStepOffsetX = (stepWidthProc - barWidthProc) / 2;

        for (let i = 0; i < steps.length; i++) {
            const precipMmPerHour = steps[i].precipMmPerHour;
            if (precipMmPerHour === 0) {
                continue;
            }

            const barHeightProc = this.getPrecipBarHeight(precipMmPerHour);
            const precipBar = SvgRectangleElement.create(
                i * 100 / steps.length + barStepOffsetX + '%',
                (100 - barHeightProc) + '%',
                barWidthProc + '%',
                barHeightProc + '%',
                'fill:' + this.getPrecipColor(precipMmPerHour) + ';stroke-width:0'
            );
            svg.appendChild(precipBar);
        }

        return svg;
    }


    public static getPrecipBarHeight(precipMmPerHour: number): number {
        if (precipMmPerHour > 0) {
            return Math.max(5, precipMmPerHour / 40 * 100);
        } else {
            return 0;
        }
    }


    public static getPrecipColor(precipMmPerHour: number): string {
        if (precipMmPerHour < 0.1) {
            return 'rgba(0, 0, 0, 0.0)'; // transparent
        } else if (precipMmPerHour <= 1) {
            return 'rgba(0, 192, 255, 1.0)'; // light blue
        } else if (precipMmPerHour <= 40) {
            return 'rgba(0, 0, 255, 1.0)'; // blue
        } else {
            return 'rgba(172, 0, 219, 1.0)'; // purple
        }

        /*if (precipMmPerHour < 0.1) {
            return 'rgba(0, 0, 0, 0.0)'; // transparent
        } else if (precipMmPerHour <= 1) {
            return 'rgba(0, 192, 255, 1.0)'; // light blue
        } else if (precipMmPerHour <= 2) {
            return 'rgba(0, 0, 255, 1.0)'; // blue
        } else if (precipMmPerHour <= 4) {
            return 'rgba(0, 127, 0, 1.0)'; // dark green
        } else if (precipMmPerHour <= 6) {
            return 'rgba(0, 255, 0, 1.0)'; // light green
        } else if (precipMmPerHour <= 10) {
            return 'rgba(255, 255, 0, 1.0)'; // yellow
        } else if (precipMmPerHour <= 20) {
            return 'rgba(255, 191, 0, 1.0)'; // light orange
        } else if (precipMmPerHour <= 40) {
            return 'rgba(255, 128, 0, 1.0)'; // dark orange
        } else if (precipMmPerHour <= 60) {
            return 'rgba(255, 0, 0, 1.0)'; // red
        } else {
            return 'rgba(128, 128, 128, 0.9)';
        }*/
    }
}
