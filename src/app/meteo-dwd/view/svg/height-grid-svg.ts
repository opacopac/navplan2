import {SvgLineElement} from '../../../common/svg/svg-line-element';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextElementBuilder} from '../../../common/svg/svg-text-element-builder';


export class HeightGridSvg {
    private static readonly GRID_ELEVATION_MAIN_STEP_FT = 5000;
    private static readonly GRID_ELEVATION_MINOR_STEP_FT = 1000;


    public static create(maxelevation: Length): SVGGElement {
        const svg = SvgGroupElement.create();
        const maxelevation_ft = maxelevation.ft;
        const showMinorLabels = maxelevation_ft / this.GRID_ELEVATION_MAIN_STEP_FT < 2.5;

        // major lines
        for (let i = 0; i <= maxelevation_ft; i += this.GRID_ELEVATION_MAIN_STEP_FT) {
            const elevationPercent = 100 * (1 - i / maxelevation_ft);
            // const labelText = (i === 0) ? i + ' ft (AMSL)' : i + ' ft';
            const labelText = i + ' ft';
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
        return SvgTextElementBuilder.builder()
            .setText(text)
            .setX('5')
            .setY(elevationPercent.toString() + '%')
            .setStyle('fill:green; stroke:white; stroke-width: 2px; paint-order: stroke;')
            .setTextAnchor('start')
            .setFontFamily('Calibri,sans-serif')
            .setFontSize('10px')
            .setFontWeight('normal')
            .setTransform('translate(0, -3)')
            .build();
    }
}
