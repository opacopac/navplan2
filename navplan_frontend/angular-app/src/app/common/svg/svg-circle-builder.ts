import {SvgElement} from './svg-element';


export class SvgCircleBuilder {
    private cx: string;
    private cy: string;
    private r: string;
    private style: string;
    private shapeRendering: string;


    public static builder(): SvgCircleBuilder {
        return new SvgCircleBuilder();
    }


    public setCx(cx: string): SvgCircleBuilder {
        this.cx = cx;
        return this;
    }


    public setCy(cy: string): SvgCircleBuilder {
        this.cy = cy;
        return this;
    }


    public setR(r: string): SvgCircleBuilder {
        this.r = r;
        return this;
    }


    public setStyle(style: string): SvgCircleBuilder {
        this.style = style;
        return this;
    }


    public setShapeRendering(shapeRendering: string): SvgCircleBuilder {
        this.shapeRendering = shapeRendering;
        return this;
    }


    public build(): SVGCircleElement {
        const circle = document.createElementNS(SvgElement.SVG_NS, 'circle');
        circle.setAttribute('cx', this.cx);
        circle.setAttribute('cy', this.cy);
        circle.setAttribute('r', this.r);

        if (this.style !== undefined) {
            circle.setAttribute('style', this.style);
        }
        if (this.shapeRendering !== undefined) {
            circle.setAttribute('shape-rendering', this.shapeRendering);
        }

        return circle;
    }
}
