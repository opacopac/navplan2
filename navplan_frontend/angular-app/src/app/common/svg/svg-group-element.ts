import {SvgBuilder} from './svg-builder';


export class SvgGroupElement {
    public static create(): SVGGElement {
        return document.createElementNS(SvgBuilder.SVG_NS, 'g');
    }
}
