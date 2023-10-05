import {SvgElement} from './svg-element';


export class SvgImageElement {
    public static create(
        x: string,
        y: string,
        width: string,
        height: string,
        href: string,
        transform: string
    ): SVGImageElement {
        const img = document.createElementNS(SvgElement.SVG_NS, 'image');
        img.setAttribute('x', x);
        img.setAttribute('y', y);
        img.setAttribute('href', href);
        if (width !== undefined) {
            img.setAttribute('width', width);
        }
        if (height !== undefined) {
            img.setAttribute('height', height);
        }
        if (transform !== undefined) {
            img.setAttribute('transform', transform);
        }

        return img;
    }
}
