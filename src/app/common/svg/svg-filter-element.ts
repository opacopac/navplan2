import {SvgElement} from './svg-element';


export class SvgFilterElement {
    public static create(
        id: string,
        x: string,
        y: string,
        width: string,
        height: string
    ): SVGFilterElement {
        const filter = document.createElementNS(SvgElement.SVG_NS, 'filter');
        filter.setAttribute('id', id);
        filter.setAttribute('x', x);
        filter.setAttribute('y', y);
        filter.setAttribute('width', width);
        filter.setAttribute('height', height);

        return filter;
    }
}
