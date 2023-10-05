import {SvgElement} from './svg-element';


export class SvgFeFloodElement {
    public static create(
        floodColor: string,
    ): SVGFEFloodElement {
        const feFlood = document.createElementNS(SvgElement.SVG_NS, 'feFlood');
        feFlood.setAttribute('flood-color', floodColor);

        return feFlood;
    }
}
