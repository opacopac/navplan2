import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';
import {PrecipitationUnit} from '../../../geo-physics/domain/model/quantities/precipitation-unit';
import {SvgTitleElement} from '../../../common/svg/svg-title-element';
import {SvgRectangleBuilder} from '../../../common/svg/svg-rectangle-builder';


export class PrecipBarsSvg {
    public static create(steps: CloudMeteogramStep[], maxPrecip: number, precipUnit: PrecipitationUnit): SVGElement {
        const svg = SvgGroupElement.create();
        const stepWidthProc = 100 / steps.length;
        const barWidthProc = stepWidthProc / 1.5;
        const barStepOffsetX = (stepWidthProc - barWidthProc) / 2;

        for (let i = 0; i < steps.length; i++) {
            const precip = steps[i].precip.getValue(precipUnit);
            if (precip === 0) {
                continue;
            }

            const barHeightProc = this.getPrecipBarHeight(precip, maxPrecip);
            const precipBar = SvgRectangleBuilder.builder()
                .setXPercent(i * 100 / steps.length + barStepOffsetX)
                .setYPercent(100 - barHeightProc)
                .setWidthPercent(barWidthProc)
                .setHeightPercent(barHeightProc)
                .setStyle('fill:' + this.getPrecipColor(precip) + ';stroke-width:0')
                .build();
            svg.appendChild(precipBar);

            const unitText = precipUnit === PrecipitationUnit.MM ? 'mm/h' : 'in/h';
            const title = SvgTitleElement.create(precip.toFixed(1) + unitText);
            precipBar.appendChild(title);
        }

        return svg;
    }


    public static getPrecipBarHeight(precipMmPerHour: number, maxPrecipMm: number): number {
        if (precipMmPerHour > 0) {
            return Math.max(5, precipMmPerHour / maxPrecipMm * 100);
        } else {
            return 0;
        }
    }


    public static getPrecipColor(precipMmPerHour: number): string {
        if (precipMmPerHour < 0.1) {
            return 'rgba(0, 0, 0, 0.0)'; // transparent
        } else if (precipMmPerHour < 1.0) {
            return 'rgba(0, 192, 255, 1.0)'; // light blue
        } else if (precipMmPerHour < 40.0) {
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
