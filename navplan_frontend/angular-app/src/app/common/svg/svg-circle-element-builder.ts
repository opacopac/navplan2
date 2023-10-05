import {SvgElement} from './svg-element';


export class SvgCircleElementBuilder {
    private cx: string;
    private cy: string;
    private r: string;
    private style: string;
    private shapeRendering: string;


    public static builder(): SvgCircleElementBuilder {
        return new SvgCircleElementBuilder();
    }


    public setCx(cx: string): SvgCircleElementBuilder {
        this.cx = cx;
        return this;
    }


    public setCy(cy: string): SvgCircleElementBuilder {
        this.cy = cy;
        return this;
    }


    public setR(r: string): SvgCircleElementBuilder {
        this.r = r;
        return this;
    }


    public setStyle(style: string): SvgCircleElementBuilder {
        this.style = style;
        return this;
    }


    public setShapeRendering(shapeRendering: string): SvgCircleElementBuilder {
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
