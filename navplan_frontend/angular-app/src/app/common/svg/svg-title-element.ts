import {SvgBuilder} from './svg-builder';


export class SvgTitleElement {
    public static create(text: string): SVGTitleElement {
        const title = document.createElementNS(SvgBuilder.SVG_NS, 'title');
        title.textContent = text;

        return title;
    }
}
