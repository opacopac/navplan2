import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {CloudMeteogramStep} from '../../domain/model/cloud-meteogram-step';
import {SvgLineElement} from '../../../common/svg/svg-line-element';


export class TemmpGraphSvg {
    public static create(steps: CloudMeteogramStep[]): SVGElement {
        const svg = SvgGroupElement.create();
        const stepWidthProc = 100 / steps.length;
        let lastTemp;

        for (let i = 0; i < steps.length; i++) {
            const currentTemp = steps[i].temperature;
            if (lastTemp !== undefined) {
                const line = SvgLineElement.create(
                    (i - 1) * stepWidthProc + '%',
                    i * stepWidthProc + '%',
                    100 - (lastTemp.c / 40 * 100) + '%',
                    100 - (currentTemp.c / 40 * 100) + '%',
                    'stroke:red; stroke-width:2px;',
                    'non-scaling-stroke',
                    'crispEdges',
                    undefined
                );
                svg.appendChild(line);
            }

            lastTemp = currentTemp;
        }

        return svg;
    }
}
