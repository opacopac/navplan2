import {SvgBuilder} from './svg-builder';


export class SvgPolygonBuilder {
    private points: [number, number][] = [];
    private style: string;
    private shapeRendering: string;


    private constructor() {
    }


    public static builder(): SvgPolygonBuilder {
        return new SvgPolygonBuilder();
    }


    public build(): SVGPolygonElement {
        const polygon = document.createElementNS(SvgBuilder.SVG_NS, 'polygon');
        const pointString = this.points.map(point => point[0] + ',' + point[1]).join(' ');
        polygon.setAttribute('points', pointString);

        if (this.style !== undefined) {
            polygon.setAttribute('style', this.style);
        }

        return polygon;
    }


    public setPoints(points: [number, number][]): SvgPolygonBuilder {
        this.points = points;
        return this;
    }


    public addPoint(point: [number, number]): SvgPolygonBuilder {
        this.points.push(point);
        return this;
    }


    public setStyle(style: string): SvgPolygonBuilder {
        this.style = style;
        return this;
    }


    public setFillStrokeColorWidth(fillColor: string, strokeColor: string, strokeWidthPx: number): SvgPolygonBuilder {
        return this.setStyle('fill:' + fillColor + '; stroke:' + strokeColor + '; stroke-width:' + strokeWidthPx + 'px');
    }


    public setShapeRendering(shapeRendering: string): SvgPolygonBuilder {
        this.shapeRendering = shapeRendering;
        return this;
    }


    public setShapeRenderingCrispEdges(): SvgPolygonBuilder {
        return this.setShapeRendering('crispEdges');
    }
}
