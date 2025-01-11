import {SvgBuilder} from './svg-builder';


export class SvgFeCompositeElement {
    public static create(inAttr: string): SVGFECompositeElement {
        const feComp = document.createElementNS(SvgBuilder.SVG_NS, 'feComposite');
        feComp.setAttribute('in', inAttr);
        // feComp.setAttribute("operator", "xor");
        return feComp;
    }
}
