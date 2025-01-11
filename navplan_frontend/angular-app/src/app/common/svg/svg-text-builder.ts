import {SvgElement} from './svg-element';


export class SvgTextBuilder {
    private text: string;
    private x: string;
    private y: string;
    private style: string;
    private textAnchor: string;
    private dominantBaseline: string;
    private fontFamily: string;
    private fontSize: string;
    private fontWeight: string;
    private transform: string;


    public static builder(): SvgTextBuilder {
        return new SvgTextBuilder();
    }


    public build(): SVGTextElement {
        const element = document.createElementNS(SvgElement.SVG_NS, 'text');
        element.textContent = this.text;
        element.setAttribute('x', this.x);
        element.setAttribute('y', this.y);

        if (this.style !== undefined) {
            element.setAttribute('style', this.style);
        }
        if (this.textAnchor !== undefined) {
            element.setAttribute('text-anchor', this.textAnchor);
        }
        if (this.dominantBaseline !== undefined) {
            element.setAttribute('dominant-baseline', this.dominantBaseline);
        }
        if (this.fontFamily !== undefined) {
            element.setAttribute('font-family', this.fontFamily);
        }
        if (this.fontSize !== undefined) {
            element.setAttribute('font-size', this.fontSize);
        }
        if (this.fontWeight !== undefined) {
            element.setAttribute('font-weight', this.fontWeight);
        }
        if (this.transform !== undefined) {
            element.setAttribute('transform', this.transform);
        }

        return element;
    }


    public setText(text: string): SvgTextBuilder {
        this.text = text;
        return this;
    }


    public setX(x: string): SvgTextBuilder {
        this.x = x;
        return this;
    }


    public setY(y: string): SvgTextBuilder {
        this.y = y;
        return this;
    }


    public setStyle(style: string): SvgTextBuilder {
        this.style = style;
        return this;
    }


    public setTextAnchor(textAnchor: string): SvgTextBuilder {
        this.textAnchor = textAnchor;
        return this;
    }


    public setDominantBaseline(dominantBaseline: string): SvgTextBuilder {
        this.dominantBaseline = dominantBaseline;
        return this;
    }


    public setFontFamily(fontFamily: string): SvgTextBuilder {
        this.fontFamily = fontFamily;
        return this;
    }


    public setFontSize(fontSize: string): SvgTextBuilder {
        this.fontSize = fontSize;
        return this;
    }


    public setFontWeight(fontWeight: string): SvgTextBuilder {
        this.fontWeight = fontWeight;
        return this;
    }


    public setTransform(transform: string): SvgTextBuilder {
        this.transform = transform;
        return this;
    }
}
