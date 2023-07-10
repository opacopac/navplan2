import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextElement} from '../../../common/svg/svg-text-element';


export class GridSvg {
    private static readonly GRID_ELEVATION_MAIN_STEP_FT = 5000;
    private static readonly GRID_ELEVATION_MINOR_STEP_FT = 1000;


    public static create(maxelevation: Length): SVGGElement {
        const svg = SvgGroupElement.create();
        const maxelevation_ft = maxelevation.ft;
        const showMinorLabels = maxelevation_ft / this.GRID_ELEVATION_MAIN_STEP_FT < 2.5;

        // major lines
        for (let i = 0; i <= maxelevation_ft; i += this.GRID_ELEVATION_MAIN_STEP_FT) {
            const elevationPercent = 100 * (1 - i / maxelevation_ft);
            const labelText = (i === 0) ? i + ' ft (AMSL)' : i + ' ft';
            svg.appendChild(this.createGridLine(elevationPercent, false));
            const label = this.createGridLabel(elevationPercent, labelText);
            svg.appendChild(label);
        }

        // minor lines
        for (let i = 0; i <= maxelevation_ft; i += this.GRID_ELEVATION_MINOR_STEP_FT) {
            if (i % this.GRID_ELEVATION_MAIN_STEP_FT === 0) {
                continue;
            }

            const elevationPercent = 100 * (1 - i / maxelevation_ft);
            svg.appendChild(this.createGridLine(elevationPercent, true));

            if (showMinorLabels) {
                svg.appendChild(this.createGridLabel(elevationPercent, i + ' ft'));
            }
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
