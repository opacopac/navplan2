import {SvgElement} from './svg-element';


export class SvgGroupElement {
    public static create(): SVGGElement {
        return document.createElementNS(SvgElement.SVG_NS, 'g');
    }
}
