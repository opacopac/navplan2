import {SvgElement} from './svg-element';


export class SvgCircleElement {
    public static create(
        cx: string,
        cy: string,
        r: string,
        style?: string,
        shapeRendering?: string,
    ): SVGCircleElement {
        const circle = document.createElementNS(SvgElement.SVG_NS, 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);

        if (style !== undefined) {
            circle.setAttribute('style', style);
        }
        if (shapeRendering !== undefined) {
            circle.setAttribute('shape-rendering', shapeRendering);
        }

        return circle;
    }
}
