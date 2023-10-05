import {SvgElement} from './svg-element';


export class SvgTitleElement {
    public static create(text: string): SVGTitleElement {
        const title = document.createElementNS(SvgElement.SVG_NS, 'title');
        title.textContent = text;

        return title;
    }
}
