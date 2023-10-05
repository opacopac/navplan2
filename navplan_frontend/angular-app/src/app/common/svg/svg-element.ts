export class SvgElement {
    public static readonly SVG_NS = 'http://www.w3.org/2000/svg';


    public static create(
        width: string,
        height: string,
        preserveAspectRatio: string = 'none',
        cssClass?: string
    ): SVGSVGElement {
        const svg = document.createElementNS(this.SVG_NS, 'svg');
        svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('preserveAspectRatio', preserveAspectRatio);
        svg.setAttribute('class', cssClass);

        return svg;
    }
}
