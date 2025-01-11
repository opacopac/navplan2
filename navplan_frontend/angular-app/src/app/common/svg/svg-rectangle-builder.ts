import {SvgElement} from './svg-element';


export class SvgRectangleBuilder {
    private x: string;
    private y: string;
    private width: string;
    private height: string;
    private style: string;

    private constructor() {
    }


    public static builder(): SvgRectangleBuilder {
        return new SvgRectangleBuilder();
    }


    public setX(x: string): SvgRectangleBuilder {
        this.x = x;
        return this;
    }


    public setXPercent(x: number): SvgRectangleBuilder {
        return this.setX(x + '%');
    }


    public setY(y: string): SvgRectangleBuilder {
        this.y = y;
        return this;
    }


    public setYPercent(y: number): SvgRectangleBuilder {
        return this.setY(y + '%');
    }


    public setXy(xy: [number, number]): SvgRectangleBuilder {
        return this.setX(xy[0].toString()).setY(xy[1].toString());
    }


    public setWidth(width: string): SvgRectangleBuilder {
        this.width = width;
        return this;
    }


    public setWidthPercent(width: number): SvgRectangleBuilder {
        return this.setWidth(width + '%');
    }


    public setHeight(height: string): SvgRectangleBuilder {
        this.height = height;
        return this;
    }


    public setHeightPercent(height: number): SvgRectangleBuilder {
        return this.setHeight(height + '%');
    }


    public setStyle(style: string): SvgRectangleBuilder {
        this.style = style;
        return this;
    }


    public build(): SVGRectElement {
        const rect = document.createElementNS(SvgElement.SVG_NS, 'rect');
        rect.setAttribute('x', this.x);
        rect.setAttribute('y', this.y);
        rect.setAttribute('width', this.width);
        rect.setAttribute('height', this.height);

        if (this.style !== undefined) {
            rect.setAttribute('style', this.style);
        }

        return rect;
    }
}
