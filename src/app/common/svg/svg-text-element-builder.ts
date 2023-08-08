import {SvgElement} from './svg-element';


export class SvgTextElementBuilder {
    private text: string;
    private x: string;
    private y: string;
    private style: string;
    private textAnchor: string;
    private fontFamily: string;
    private fontSize: string;
    private fontWeight: string;
    private transform: string;


    public static builder(): SvgTextElementBuilder {
        return new SvgTextElementBuilder();
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


    public setText(text: string): SvgTextElementBuilder {
        this.text = text;
        return this;
    }


    public setX(x: string): SvgTextElementBuilder {
        this.x = x;
        return this;
    }


    public setY(y: string): SvgTextElementBuilder {
        this.y = y;
        return this;
    }


    public setStyle(style: string): SvgTextElementBuilder {
        this.style = style;
        return this;
    }


    public setTextAnchor(textAnchor: string): SvgTextElementBuilder {
        this.textAnchor = textAnchor;
        return this;
    }


    public setFontFamily(fontFamily: string): SvgTextElementBuilder {
        this.fontFamily = fontFamily;
        return this;
    }


    public setFontSize(fontSize: string): SvgTextElementBuilder {
        this.fontSize = fontSize;
        return this;
    }


    public setFontWeight(fontWeight: string): SvgTextElementBuilder {
        this.fontWeight = fontWeight;
        return this;
    }


    public setTransform(transform: string): SvgTextElementBuilder {
        this.transform = transform;
        return this;
    }
}
