import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';
import {TemperatureUnit} from '../../../geo-physics/domain/model/quantities/temperature-unit';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';


export class TempLineSvg {
    public static create(steps: CloudMeteogramStep[], minMaxTemp: [number, number], tempUnit: TemperatureUnit): SVGElement {
        const svg = SvgGroupElement.create();
        const stepWidthProc = 100 / steps.length;
        let lastTemp: Temperature;

        for (let i = 0; i < steps.length; i++) {
            const currentTemp = steps[i].temp;
            if (lastTemp !== undefined) {
                svg.appendChild(SvgLineBuilder.builder()
                    .setX1Percent((i - 1) * stepWidthProc + stepWidthProc / 2)
                    .setX2Percent(i * stepWidthProc + stepWidthProc / 2)
                    .setY1Percent(this.calcY(lastTemp.getValue(tempUnit), minMaxTemp))
                    .setY2Percent(this.calcY(currentTemp.getValue(tempUnit), minMaxTemp))
                    .setStrokeStyle('red', 2)
                    .setVectorEffectNonScalingStroke()
                    .build()
                );
            }

            lastTemp = currentTemp;
        }

        return svg;
    }


    private static calcY(tempValue: number, minMaxTemp: [number, number]): number {
        const minMaxTempDiff = minMaxTemp[1] - minMaxTemp[0];

        return 100 - ((tempValue - minMaxTemp[0]) / minMaxTempDiff * 100);
    }
}
