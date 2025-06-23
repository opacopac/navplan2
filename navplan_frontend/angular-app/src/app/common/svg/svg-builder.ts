export class SvgBuilder {
    public static readonly SVG_NS = 'http://www.w3.org/2000/svg';

    private width: string;
    private height: string;
    private viewBox: string;
    private preserveAspectRatio = 'none';
    private cssClass: string;


    private constructor() {
    }


    public static builder(): SvgBuilder {
        return new SvgBuilder();
    }


    public setWidth(width: string): SvgBuilder {
        this.width = width;
        return this;
    }


    public setHeight(height: string): SvgBuilder {
        this.height = height;
        return this;
    }


    public setViewBox(minX: number, minY: number, width: number, height: number) {
        this.viewBox = minX + ' ' + minY + ' ' + width + ' ' + height;
        return this;
    }


    public setPreserveAspectRatio(preserveAspectRatio: string): SvgBuilder {
        this.preserveAspectRatio = preserveAspectRatio;
        return this;
    }


    public setCssClass(cssClass: string): SvgBuilder {
        this.cssClass = cssClass;
        return this;
    }


    public build(): SVGSVGElement {
        const svg = document.createElementNS(SvgBuilder.SVG_NS, 'svg');
        svg.setAttribute('xmlns', SvgBuilder.SVG_NS);
        svg.setAttribute('width', this.width);
        svg.setAttribute('height', this.height);
        svg.setAttribute('preserveAspectRatio', this.preserveAspectRatio);

        if (this.viewBox !== undefined) {
            svg.setAttribute('viewBox', this.viewBox);
        }

        if (this.cssClass !== undefined) {
            svg.setAttribute('class', this.cssClass);
        }

        return svg;
    }
}
