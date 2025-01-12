import {SvgBuilder} from './svg-builder';


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


    public setX(x: string | number): SvgRectangleBuilder {
        this.x = x.toString();
        return this;
    }


    public setXPercent(x: number): SvgRectangleBuilder {
        return this.setX(x + '%');
    }


    public setY(y: string | number): SvgRectangleBuilder {
        this.y = y.toString();
        return this;
    }


    public setYPercent(y: number): SvgRectangleBuilder {
        return this.setY(y + '%');
    }


    public setXy(xy: [number, number]): SvgRectangleBuilder {
        return this.setX(xy[0]).setY(xy[1]);
    }


    public setWidth(width: string | number): SvgRectangleBuilder {
        this.width = width.toString();
        return this;
    }


    public setWidthPercent(width: number): SvgRectangleBuilder {
        return this.setWidth(width + '%');
    }


    public setHeight(height: string | number): SvgRectangleBuilder {
        this.height = height.toString();
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
        const rect = document.createElementNS(SvgBuilder.SVG_NS, 'rect');
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
