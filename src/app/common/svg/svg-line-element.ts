import {SvgElement} from './svg-element';


export class SvgLineElement {
    public static create(
        x1: string,
        x2: string,
        y1: string,
        y2: string,
        style?: string,
        vectorEffect?: string,
        shapeRenderin?: string,
        strokeDashArray?: string
    ): SVGLineElement {
        const line = document.createElementNS(SvgElement.SVG_NS, 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('x2', x2);
        line.setAttribute('y1', y1);
        line.setAttribute('y2', y2);

        if (style !== undefined) {
            line.setAttribute('style', style);
        }
        if (vectorEffect !== undefined) {
            line.setAttribute('vector-effect', vectorEffect);
        }
        if (shapeRenderin !== undefined) {
            line.setAttribute('shape-rendering', shapeRenderin);
        }
        if (strokeDashArray !== undefined) {
            line.setAttribute('stroke-dasharray', strokeDashArray);
        }

        return line;
    }
}
