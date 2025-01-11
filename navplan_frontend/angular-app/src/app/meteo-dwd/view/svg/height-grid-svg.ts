import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {SvgGroupElement} from '../../../common/svg/svg-group-element';
import {SvgTextBuilder} from '../../../common/svg/svg-text-builder';
import {SvgLineBuilder} from '../../../common/svg/svg-line-builder';


export class HeightGridSvg {
    private static readonly GRID_ELEVATION_MAIN_STEP_FT = 5000;
    private static readonly GRID_ELEVATION_MINOR_STEP_FT = 1000;


    public static create(maxelevation: Length): SVGGElement {
        const svg = SvgGroupElement.create();
        const maxelevation_ft = maxelevation.ft;
        const showMinorLabels = maxelevation_ft / this.GRID_ELEVATION_MAIN_STEP_FT < 2.5;

        // major lines
        for (let i = 0; i < maxelevation_ft; i += this.GRID_ELEVATION_MAIN_STEP_FT) {
            const elevationPercent = 100 * (1 - i / maxelevation_ft);
            // const labelText = (i === 0) ? i + ' ft (AMSL)' : i + ' ft';
            const labelText = i + ' ft';
            svg.appendChild(this.createGridLine(elevationPercent, false));
            const label = this.createGridLabel(elevationPercent, labelText);
            svg.appendChild(label);
        }

        // minor lines
        for (let i = this.GRID_ELEVATION_MINOR_STEP_FT; i < maxelevation_ft; i += this.GRID_ELEVATION_MINOR_STEP_FT) {
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
        return SvgLineBuilder.builder()
            .setX1Percent(0)
            .setX2Percent(100)
            .setY1Percent(elevationPercent)
            .setY2Percent(elevationPercent)
            .setStrokeStyle('green', 1)
            .setVectorEffectNonScalingStroke()
            .setShapeRenderingCrispEdges()
            .setStrokeDashArray(isDashed ? '1, 2' : undefined)
            .build();
    }


    private static createGridLabel(elevationPercent, text): SVGTextElement {
        return SvgTextBuilder.builder()
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
