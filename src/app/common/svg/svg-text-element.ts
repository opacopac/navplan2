import {SvgElement} from './svg-element';


export class SvgTextElement {
    public static create(
        text: string,
        x: string,
        y: string,
        style?: string,
        textAnchor?: string,
        fontFamily?: string,
        fontSize?: string,
        fontWeight?: string,
        transform?: string,
    ): SVGTextElement {
        const element = document.createElementNS(SvgElement.SVG_NS, 'text');
        element.textContent = text;
        element.setAttribute('x', x);
        element.setAttribute('y', y);

        if (style !== undefined) {
            element.setAttribute('style', style);
        }
        if (textAnchor !== undefined) {
            element.setAttribute('text-anchor', textAnchor);
        }
        if (fontFamily !== undefined) {
            element.setAttribute('font-family', fontFamily);
        }
        if (fontSize !== undefined) {
            element.setAttribute('font-size', fontSize);
        }
        if (fontWeight !== undefined) {
            element.setAttribute('font-weight', fontWeight);
        }
        if (transform !== undefined) {
            element.setAttribute('transform', transform);
        }

        return element;
    }
}
