import {SvgElement} from './svg-element';


export class SvgFeCompositeElement {
    public static create(inAttr: string): SVGFECompositeElement {
        const feComp = document.createElementNS(SvgElement.SVG_NS, 'feComposite');
        feComp.setAttribute('in', inAttr);
        // feComp.setAttribute("operator", "xor");
        return feComp;
    }
}
