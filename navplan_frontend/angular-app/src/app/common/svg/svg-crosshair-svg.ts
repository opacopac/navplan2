import {SvgCircleBuilder} from './svg-circle-builder';
import {SvgLineBuilder} from './svg-line-builder';
import {SvgBuilder} from './svg-builder';


export class SvgCrosshairSvg {
    public static create(color: string): SVGElement {
        const svg = SvgBuilder.builder()
            .setHeight('35px')
            .setWidth('35px')
            .setViewBox(0, 0, 350, 350)
            .build();

        svg.appendChild(SvgCircleBuilder.builder()
            .setCx('175px')
            .setCy('175px')
            .setR('120px')
            .setStyle('fill: none; stroke: ' + color + '; stroke-width: 30;')
            .build()
        );
        svg.appendChild(SvgLineBuilder.builder()
            .setX1(175)
            .setY1(0)
            .setX2(175)
            .setY2(350)
            .setStrokeStyle(color, 11)
            .setShapeRenderingCrispEdges()
            .build()
        );
        svg.appendChild(SvgLineBuilder.builder()
            .setX1(0)
            .setY1(175)
            .setX2(350)
            .setY2(175)
            .setStrokeStyle(color, 11)
            .setShapeRenderingCrispEdges()
            .build()
        );

        return svg;
    }
}
