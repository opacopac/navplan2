import {SvgBuilder} from './svg-builder';


export class SvgLineBuilder {
    private x1 = '0';
    private x2 = '0';
    private y1 = '0';
    private y2 = '0';
    private style: string;
    private vectorEffect: string;
    private shapeRendering: string;
    private strokeDashArray: string;


    private constructor() {
    }

    public static builder(): SvgLineBuilder {
        return new SvgLineBuilder();
    }


    public build(): SVGLineElement {
        const line = document.createElementNS(SvgBuilder.SVG_NS, 'line');
        line.setAttribute('x1', this.x1);
        line.setAttribute('x2', this.x2);
        line.setAttribute('y1', this.y1);
        line.setAttribute('y2', this.y2);

        if (this.style !== undefined) {
            line.setAttribute('style', this.style);
        }
        if (this.vectorEffect !== undefined) {
            line.setAttribute('vector-effect', this.vectorEffect);
        }
        if (this.shapeRendering !== undefined) {
            line.setAttribute('shape-rendering', this.shapeRendering);
        }
        if (this.strokeDashArray !== undefined) {
            line.setAttribute('stroke-dasharray', this.strokeDashArray);
        }

        return line;
    }


    public setX1(x1: string): SvgLineBuilder {
        this.x1 = x1;
        return this;
    }


    public setX1Percent(x1: number): SvgLineBuilder {
        return this.setX1(x1 + '%');
    }


    public setX2(x2: string): SvgLineBuilder {
        this.x2 = x2;
        return this;
    }


    public setX2Percent(x2: number): SvgLineBuilder {
        return this.setX2(x2 + '%');
    }


    public setY1(y1: string): SvgLineBuilder {
        this.y1 = y1;
        return this;
    }


    public setY1Percent(y1: number): SvgLineBuilder {
        return this.setY1(y1 + '%');
    }


    public setY2(y2: string): SvgLineBuilder {
        this.y2 = y2;
        return this;
    }


    public setY2Percent(y2: number): SvgLineBuilder {
        return this.setY2(y2 + '%');
    }


    public setStartXy(xy: [number, number]): SvgLineBuilder {
        return this.setX1(xy[0].toString()).setY1(xy[1].toString());
    }


    public setEndXy(xy: [number, number]): SvgLineBuilder {
        return this.setX2(xy[0].toString()).setY2(xy[1].toString());
    }


    public setStyle(style: string): SvgLineBuilder {
        this.style = style;
        return this;
    }


    public setStrokeStyle(color: string, widthPx: number): SvgLineBuilder {
        return this.setStyle('stroke:' + color + '; stroke-width:' + widthPx + 'px');
    }


    public setVectorEffect(vectorEffect: string): SvgLineBuilder {
        this.vectorEffect = vectorEffect;
        return this;
    }


    public setVectorEffectNonScalingStroke(): SvgLineBuilder {
        return this.setVectorEffect('non-scaling-stroke');
    }


    public setShapeRendering(shapeRendering: string): SvgLineBuilder {
        this.shapeRendering = shapeRendering;
        return this;
    }


    public setShapeRenderingCrispEdges(): SvgLineBuilder {
        return this.setShapeRendering('crispEdges');
    }


    public setStrokeDashArray(strokeDashArray: string): SvgLineBuilder {
        this.strokeDashArray = strokeDashArray;
        return this;
    }


    public setStrokeDashArrayOnOff(dashLength: number, gapLength: number): SvgLineBuilder {
        this.strokeDashArray = dashLength + ',' + gapLength;
        return this;
    }
}
