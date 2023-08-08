import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';
import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {TemperatureUnit} from '../../../geo-physics/domain/model/quantities/temperature-unit';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';


export class TempLineSvg {
    public static create(steps: CloudMeteogramStep[], minMaxTemp: [number, number], tempUnit: TemperatureUnit): SVGElement {
        const svg = SvgGroupElement.create();
        const stepWidthProc = 100 / steps.length;
        let lastTemp: Temperature;

        for (let i = 0; i < steps.length; i++) {
            const currentTemp = steps[i].temp;
            if (lastTemp !== undefined) {
                const line = SvgLineElement.create(
                    (i - 1) * stepWidthProc + stepWidthProc / 2 + '%',
                    i * stepWidthProc + stepWidthProc / 2 + '%',
                    this.calcY(lastTemp.getValue(tempUnit), minMaxTemp) + '%',
                    this.calcY(currentTemp.getValue(tempUnit), minMaxTemp) + '%',
                    'stroke:red; stroke-width:2px;',
                    'non-scaling-stroke',
                    undefined,
                    undefined
                );
                svg.appendChild(line);
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
