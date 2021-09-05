import {SvgElement} from './svg-element';


export class SvgRectangleElement {
    public static create(
        x: string,
        y: string,
        width: string,
        height: string,
        style: string,
    ): SVGRectElement {
        const rect = document.createElementNS(SvgElement.SVG_NS, 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('style', style);

        return rect;
    }
}
