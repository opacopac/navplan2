import {SvgBuilder} from './svg-builder';


export class SvgFeFloodElement {
    public static create(
        floodColor: string,
    ): SVGFEFloodElement {
        const feFlood = document.createElementNS(SvgBuilder.SVG_NS, 'feFlood');
        feFlood.setAttribute('flood-color', floodColor);

        return feFlood;
    }
}
