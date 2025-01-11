import {SvgBuilder} from './svg-builder';


export class SvgPolygonElement {
    public static create(
        points: [number, number][],
        style?: string,
    ): SVGPolygonElement {
        const polygon = document.createElementNS(SvgBuilder.SVG_NS, 'polygon');
        const pointString = points.map(point => point[0] + ',' + point[1]).join(' ');
        polygon.setAttribute('points', pointString);

        if (style !== undefined) {
            polygon.setAttribute('style', style);
        }

        return polygon;
    }
}
